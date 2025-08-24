-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table with proper structure
CREATE TABLE IF NOT EXISTS profiles_ovi2025 (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  website TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT false,
  security_level TEXT DEFAULT 'standard' CHECK (security_level IN ('standard', 'biometric', 'neural', 'quantum')),
  tracks_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT,
  cover_url TEXT,
  audio_url TEXT,
  duration INTEGER DEFAULT 0,
  bpm INTEGER,
  key_signature TEXT,
  is_public BOOLEAN DEFAULT true,
  is_trending BOOLEAN DEFAULT false,
  plays_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  price DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks_ovi2025(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id UUID REFERENCES tracks_ovi2025(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('play', 'like', 'share', 'download', 'skip')),
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create earnings table
CREATE TABLE IF NOT EXISTS earnings_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL CHECK (source_type IN ('streaming', 'nft', 'fan_investment', 'live_stream', 'ad_revenue')),
  source_id UUID,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  description TEXT,
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed'))
);

-- Create live streams table
CREATE TABLE IF NOT EXISTS live_streams_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_key TEXT UNIQUE,
  is_live BOOLEAN DEFAULT false,
  viewers_count INTEGER DEFAULT 0,
  max_viewers INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create NFTs table
CREATE TABLE IF NOT EXISTS nfts_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles_ovi2025(id) ON DELETE SET NULL,
  track_id UUID REFERENCES tracks_ovi2025(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2),
  is_auction BOOLEAN DEFAULT false,
  auction_end_time TIMESTAMPTZ,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'auction')),
  sold_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fan investments table
CREATE TABLE IF NOT EXISTS fan_investments_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  campaign_title TEXT NOT NULL,
  investment_amount DECIMAL(10,2) NOT NULL CHECK (investment_amount > 0),
  revenue_share_percentage DECIMAL(5,2) NOT NULL CHECK (revenue_share_percentage BETWEEN 0 AND 100),
  duration_months INTEGER NOT NULL CHECK (duration_months > 0),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streams_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfts_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_investments_ovi2025 ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles_ovi2025
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for tracks
CREATE POLICY "Public tracks are viewable by everyone" ON tracks_ovi2025
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own tracks" ON tracks_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracks" ON tracks_ovi2025
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracks" ON tracks_ovi2025
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for likes
CREATE POLICY "Anyone can view likes" ON likes_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON likes_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON likes_ovi2025
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for follows
CREATE POLICY "Anyone can view follows" ON follows_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own follows" ON follows_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows" ON follows_ovi2025
  FOR DELETE USING (auth.uid() = follower_id);

-- Create RLS policies for analytics
CREATE POLICY "Users can insert analytics" ON analytics_ovi2025
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view analytics for their tracks" ON analytics_ovi2025
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tracks_ovi2025 
      WHERE tracks_ovi2025.id = analytics_ovi2025.track_id 
      AND tracks_ovi2025.user_id = auth.uid()
    )
  );

-- Create RLS policies for earnings
CREATE POLICY "Users can view their own earnings" ON earnings_ovi2025
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own earnings" ON earnings_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for live streams
CREATE POLICY "Anyone can view live streams" ON live_streams_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own streams" ON live_streams_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streams" ON live_streams_ovi2025
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for NFTs
CREATE POLICY "Anyone can view available NFTs" ON nfts_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own NFTs" ON nfts_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own NFTs" ON nfts_ovi2025
  FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = owner_id);

-- Create RLS policies for fan investments
CREATE POLICY "Users can view investments they're involved in" ON fan_investments_ovi2025
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = investor_id);

CREATE POLICY "Users can insert investments as investors" ON fan_investments_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = investor_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON tracks_ovi2025(user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_created_at ON tracks_ovi2025(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracks_plays_count ON tracks_ovi2025(plays_count DESC);
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks_ovi2025(genre);
CREATE INDEX IF NOT EXISTS idx_tracks_public ON tracks_ovi2025(is_public);

CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes_ovi2025(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_track_id ON likes_ovi2025(track_id);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows_ovi2025(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows_ovi2025(following_id);

CREATE INDEX IF NOT EXISTS idx_analytics_track_id ON analytics_ovi2025(track_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_ovi2025(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_ovi2025(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_ovi2025(created_at DESC);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION increment_track_stat(track_id UUID, stat_type TEXT)
RETURNS VOID AS $$
BEGIN
  CASE stat_type
    WHEN 'plays_count' THEN
      UPDATE tracks_ovi2025 SET plays_count = plays_count + 1 WHERE id = track_id;
    WHEN 'likes_count' THEN
      UPDATE tracks_ovi2025 SET likes_count = likes_count + 1 WHERE id = track_id;
    WHEN 'shares_count' THEN
      UPDATE tracks_ovi2025 SET shares_count = shares_count + 1 WHERE id = track_id;
    WHEN 'downloads_count' THEN
      UPDATE tracks_ovi2025 SET downloads_count = downloads_count + 1 WHERE id = track_id;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update profile counts
CREATE OR REPLACE FUNCTION update_profile_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update tracks count
  IF TG_TABLE_NAME = 'tracks_ovi2025' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE profiles_ovi2025 SET tracks_count = tracks_count + 1 WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE profiles_ovi2025 SET tracks_count = tracks_count - 1 WHERE id = OLD.user_id;
    END IF;
  END IF;
  
  -- Update followers count
  IF TG_TABLE_NAME = 'follows_ovi2025' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE profiles_ovi2025 SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
      UPDATE profiles_ovi2025 SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE profiles_ovi2025 SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
      UPDATE profiles_ovi2025 SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER update_tracks_count
  AFTER INSERT OR DELETE ON tracks_ovi2025
  FOR EACH ROW EXECUTE FUNCTION update_profile_counts();

CREATE TRIGGER update_follows_count
  AFTER INSERT OR DELETE ON follows_ovi2025
  FOR EACH ROW EXECUTE FUNCTION update_profile_counts();

-- Function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1)),
    'New creator on Ovi Network',
    'standard',
    false,
    0,
    0,
    0,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample data for testing
INSERT INTO profiles_ovi2025 (id, username, display_name, bio, verified, tracks_count, followers_count)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'neurowave', 'NeuroWave', 'Electronic music producer creating quantum beats', true, 5, 25000),
  ('00000000-0000-0000-0000-000000000002', 'cybersonic', 'CyberSonic', 'Synthwave artist from the digital realm', true, 8, 18000),
  ('00000000-0000-0000-0000-000000000003', 'electrovibe', 'ElectroVibe', 'Techno producer with a passion for innovation', true, 12, 32000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tracks
INSERT INTO tracks_ovi2025 (id, user_id, title, description, genre, duration, plays_count, likes_count, is_trending)
VALUES 
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Quantum Synthesis', 'A journey through digital soundscapes', 'Electronic', 272, 320000, 24500, true),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Digital Dreams', 'Ambient synthwave for late night coding', 'Synthwave', 378, 210000, 15600, false),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Neon Nights', 'Pulsing beats for the cyber city', 'Techno', 312, 180000, 12800, true),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Neural Networks', 'AI-inspired electronic composition', 'Electronic', 245, 89200, 6700, false),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'Cyber Romance', 'Emotional synthwave journey', 'Synthwave', 298, 156000, 11200, true),
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000003', 'Quantum Leap', 'High-energy techno for the dance floor', 'Techno', 334, 234000, 18900, true)
ON CONFLICT (id) DO NOTHING;