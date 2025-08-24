-- Update auth settings for better user experience
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_email_confirmations = true,
  email_confirm_valid_for = 86400, -- 24 hours
  password_min_length = 6
WHERE true;

-- Create function to handle email confirmation
CREATE OR REPLACE FUNCTION handle_email_confirmation()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user profile when email is confirmed
  IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
    UPDATE profiles_ovi2025 
    SET 
      verified = true,
      updated_at = NOW()
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email confirmation
DROP TRIGGER IF EXISTS on_auth_user_email_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_email_confirmation();

-- Update the profile creation function to handle metadata better
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  username_val TEXT;
  display_name_val TEXT;
BEGIN
  -- Extract username and display name from metadata or email
  username_val := COALESCE(
    NEW.raw_user_meta_data->>'username',
    SPLIT_PART(NEW.email, '@', 1)
  );
  
  display_name_val := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'name',
    username_val
  );

  -- Insert new profile
  INSERT INTO profiles_ovi2025 (
    id,
    username,
    display_name,
    bio,
    security_level,
    verified,
    tracks_count,
    followers_count,
    following_count,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    username_val,
    display_name_val,
    'New creator on Ovi Network',
    'standard',
    false, -- Will be updated when email is confirmed
    0,
    0,
    0,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    display_name = COALESCE(EXCLUDED.display_name, profiles_ovi2025.display_name),
    updated_at = NOW();

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Add function to safely increment track stats
CREATE OR REPLACE FUNCTION increment_track_stat(track_id UUID, stat_type TEXT)
RETURNS VOID AS $$
BEGIN
  CASE stat_type
    WHEN 'plays_count' THEN
      UPDATE tracks_ovi2025 
      SET plays_count = plays_count + 1, updated_at = NOW()
      WHERE id = track_id;
    WHEN 'likes_count' THEN
      UPDATE tracks_ovi2025 
      SET likes_count = likes_count + 1, updated_at = NOW()
      WHERE id = track_id;
    WHEN 'shares_count' THEN
      UPDATE tracks_ovi2025 
      SET shares_count = shares_count + 1, updated_at = NOW()
      WHERE id = track_id;
    WHEN 'downloads_count' THEN
      UPDATE tracks_ovi2025 
      SET downloads_count = downloads_count + 1, updated_at = NOW()
      WHERE id = track_id;
  END CASE;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail
    RAISE WARNING 'Error updating track stat % for track %: %', stat_type, track_id, SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add function for batch operations
CREATE OR REPLACE FUNCTION batch_increment_plays(track_ids UUID[])
RETURNS VOID AS $$
DECLARE
  track_id UUID;
BEGIN
  FOREACH track_id IN ARRAY track_ids
  LOOP
    UPDATE tracks_ovi2025 
    SET plays_count = plays_count + 1, updated_at = NOW()
    WHERE id = track_id;
  END LOOP;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in batch increment plays: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to be more permissive for new users
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles_ovi2025;
CREATE POLICY "Users can insert their own profile" 
ON profiles_ovi2025 FOR INSERT 
WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles_ovi2025;
CREATE POLICY "Users can update their own profile" 
ON profiles_ovi2025 FOR UPDATE 
USING (auth.uid() = id OR auth.role() = 'service_role');

-- Ensure analytics can be inserted without issues
DROP POLICY IF EXISTS "Users can insert analytics" ON analytics_ovi2025;
CREATE POLICY "Users can insert analytics" 
ON analytics_ovi2025 FOR INSERT 
WITH CHECK (true);

-- Allow users to insert earnings
DROP POLICY IF EXISTS "Users can insert their own earnings" ON earnings_ovi2025;
CREATE POLICY "System can insert earnings" 
ON earnings_ovi2025 FOR INSERT 
WITH CHECK (true);

-- Add updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOR table_name IN 
    SELECT t.table_name 
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name
    WHERE t.table_schema = 'public' 
    AND t.table_name LIKE '%_ovi2025'
    AND c.column_name = 'updated_at'
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;
      CREATE TRIGGER update_%I_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', table_name, table_name, table_name, table_name);
  END LOOP;
END $$;