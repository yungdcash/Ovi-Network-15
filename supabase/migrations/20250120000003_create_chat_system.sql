-- Create revolutionary chat system tables

-- Chat messages table with revolutionary features
CREATE TABLE IF NOT EXISTS chat_messages_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  chat_type TEXT NOT NULL CHECK (chat_type IN ('global', 'creators', 'private', 'ai')),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'track_share', 'ai_suggestion', 'system')),
  
  -- Revolutionary Features
  shared_track_id UUID REFERENCES tracks_ovi2025(id) ON DELETE SET NULL,
  emotional_tone TEXT CHECK (emotional_tone IN ('excited', 'happy', 'creative', 'enthusiastic', 'calm', 'energetic', 'neutral')),
  revenue_sharing BOOLEAN DEFAULT false,
  quantum_encrypted BOOLEAN DEFAULT false,
  holographic_enabled BOOLEAN DEFAULT false,
  
  -- AI Analysis Data
  ai_analysis JSONB DEFAULT '{}',
  emotional_impact_score DECIMAL(5,2) DEFAULT 0,
  revenue_potential DECIMAL(10,2) DEFAULT 0,
  
  -- Message Metadata
  metadata JSONB DEFAULT '{}',
  reply_to_message_id UUID REFERENCES chat_messages_ovi2025(id) ON DELETE SET NULL,
  
  -- Engagement Metrics
  reactions_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  revenue_earned DECIMAL(10,2) DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ NULL
);

-- Private chat rooms for one-on-one conversations
CREATE TABLE IF NOT EXISTS chat_rooms_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_type TEXT DEFAULT 'private' CHECK (room_type IN ('private', 'group', 'collaboration')),
  room_name TEXT,
  created_by UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  
  -- Revolutionary Features
  quantum_encrypted BOOLEAN DEFAULT false,
  ai_moderated BOOLEAN DEFAULT false,
  revenue_sharing_enabled BOOLEAN DEFAULT false,
  
  -- Room Settings
  max_participants INTEGER DEFAULT 2,
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat room participants
CREATE TABLE IF NOT EXISTS chat_room_participants_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES chat_rooms_ovi2025(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Message reactions with emotional AI
CREATE TABLE IF NOT EXISTS message_reactions_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES chat_messages_ovi2025(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('heart', 'fire', 'star', 'mind_blown', 'genius', 'collab')),
  emotional_intensity INTEGER DEFAULT 1 CHECK (emotional_intensity BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id, reaction_type)
);

-- Chat analytics for revolutionary insights
CREATE TABLE IF NOT EXISTS chat_analytics_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  message_id UUID REFERENCES chat_messages_ovi2025(id) ON DELETE SET NULL,
  room_id UUID REFERENCES chat_rooms_ovi2025(id) ON DELETE SET NULL,
  
  event_type TEXT NOT NULL CHECK (event_type IN (
    'message_sent', 'message_received', 'reaction_added', 'track_shared', 
    'ai_interaction', 'revenue_earned', 'collaboration_started'
  )),
  
  -- Revolutionary Analytics
  emotional_context JSONB DEFAULT '{}',
  revenue_impact DECIMAL(10,2) DEFAULT 0,
  collaboration_potential INTEGER DEFAULT 0,
  
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenue sharing from chat interactions
CREATE TABLE IF NOT EXISTS chat_revenue_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES chat_messages_ovi2025(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks_ovi2025(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles_ovi2025(id) ON DELETE CASCADE,
  
  -- Revenue Distribution
  total_revenue DECIMAL(10,2) NOT NULL,
  sender_share DECIMAL(10,2) NOT NULL,
  platform_share DECIMAL(10,2) NOT NULL,
  
  -- Revolutionary Features
  emotional_multiplier DECIMAL(3,2) DEFAULT 1.00,
  ai_optimization_bonus DECIMAL(10,2) DEFAULT 0,
  viral_potential_score INTEGER DEFAULT 0,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'paid')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ NULL
);

-- AI chat assistants with personality
CREATE TABLE IF NOT EXISTS ai_chat_assistants_ovi2025 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  personality_type TEXT NOT NULL CHECK (personality_type IN (
    'creative_mentor', 'business_advisor', 'technical_expert', 'emotional_support', 'collaboration_facilitator'
  )),
  
  -- AI Capabilities
  specialization TEXT[] DEFAULT '{}',
  knowledge_areas JSONB DEFAULT '{}',
  personality_traits JSONB DEFAULT '{}',
  
  -- Performance Metrics
  accuracy_score DECIMAL(5,2) DEFAULT 0,
  user_satisfaction DECIMAL(5,2) DEFAULT 0,
  revenue_generated DECIMAL(15,2) DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all chat tables
ALTER TABLE chat_messages_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_room_participants_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_analytics_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_revenue_ovi2025 ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_assistants_ovi2025 ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Chat Messages
CREATE POLICY "Users can view public chat messages" ON chat_messages_ovi2025
  FOR SELECT USING (
    chat_type IN ('global', 'creators', 'ai') OR
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM chat_room_participants_ovi2025 crp
      JOIN chat_rooms_ovi2025 cr ON crp.room_id = cr.id
      WHERE crp.user_id = auth.uid() AND cr.id::text = chat_messages_ovi2025.metadata->>'room_id'
    )
  );

CREATE POLICY "Users can insert their own messages" ON chat_messages_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" ON chat_messages_ovi2025
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Chat Rooms
CREATE POLICY "Users can view their chat rooms" ON chat_rooms_ovi2025
  FOR SELECT USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM chat_room_participants_ovi2025
      WHERE room_id = chat_rooms_ovi2025.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create chat rooms" ON chat_rooms_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for Participants
CREATE POLICY "Users can view room participants" ON chat_room_participants_ovi2025
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM chat_room_participants_ovi2025 crp2
      WHERE crp2.room_id = chat_room_participants_ovi2025.room_id AND crp2.user_id = auth.uid()
    )
  );

-- RLS Policies for Reactions
CREATE POLICY "Anyone can view reactions" ON message_reactions_ovi2025
  FOR SELECT USING (true);

CREATE POLICY "Users can add their own reactions" ON message_reactions_ovi2025
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Analytics
CREATE POLICY "Users can view their own analytics" ON chat_analytics_ovi2025
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON chat_analytics_ovi2025
  FOR INSERT WITH CHECK (true);

-- RLS Policies for Revenue
CREATE POLICY "Users can view their revenue" ON chat_revenue_ovi2025
  FOR SELECT USING (auth.uid() = sender_id);

-- RLS Policies for AI Assistants
CREATE POLICY "Anyone can view active AI assistants" ON ai_chat_assistants_ovi2025
  FOR SELECT USING (is_active = true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_type ON chat_messages_ovi2025(chat_type);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages_ovi2025(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages_ovi2025(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_emotional_tone ON chat_messages_ovi2025(emotional_tone);
CREATE INDEX IF NOT EXISTS idx_chat_messages_revenue_sharing ON chat_messages_ovi2025(revenue_sharing);

CREATE INDEX IF NOT EXISTS idx_chat_rooms_created_by ON chat_rooms_ovi2025(created_by);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_room_type ON chat_rooms_ovi2025(room_type);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_is_active ON chat_rooms_ovi2025(is_active);

CREATE INDEX IF NOT EXISTS idx_chat_participants_room_id ON chat_room_participants_ovi2025(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_user_id ON chat_room_participants_ovi2025(user_id);

CREATE INDEX IF NOT EXISTS idx_message_reactions_message_id ON message_reactions_ovi2025(message_id);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id ON message_reactions_ovi2025(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_analytics_user_id ON chat_analytics_ovi2025(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_event_type ON chat_analytics_ovi2025(event_type);
CREATE INDEX IF NOT EXISTS idx_chat_analytics_created_at ON chat_analytics_ovi2025(created_at DESC);

-- Revolutionary Functions for Chat System

-- Function to calculate message revenue
CREATE OR REPLACE FUNCTION calculate_message_revenue(
  message_id UUID,
  base_amount DECIMAL DEFAULT 1.00
) RETURNS DECIMAL AS $$
DECLARE
  msg_record RECORD;
  revenue DECIMAL := base_amount;
  multiplier DECIMAL := 1.0;
BEGIN
  -- Get message details
  SELECT * INTO msg_record FROM chat_messages_ovi2025 WHERE id = message_id;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  -- Emotional tone multiplier
  CASE msg_record.emotional_tone
    WHEN 'excited' THEN multiplier := multiplier * 1.5;
    WHEN 'enthusiastic' THEN multiplier := multiplier * 1.4;
    WHEN 'creative' THEN multiplier := multiplier * 1.3;
    WHEN 'happy' THEN multiplier := multiplier * 1.2;
    WHEN 'energetic' THEN multiplier := multiplier * 1.4;
    ELSE multiplier := multiplier * 1.0;
  END CASE;
  
  -- Track sharing multiplier
  IF msg_record.shared_track_id IS NOT NULL THEN
    multiplier := multiplier * 2.0;
  END IF;
  
  -- AI interaction multiplier
  IF msg_record.message_type = 'ai_suggestion' THEN
    multiplier := multiplier * 1.8;
  END IF;
  
  -- Revenue sharing enabled multiplier
  IF msg_record.revenue_sharing = true THEN
    multiplier := multiplier * 1.2;
  END IF;
  
  revenue := revenue * multiplier;
  
  -- Update message with calculated revenue
  UPDATE chat_messages_ovi2025 
  SET revenue_earned = revenue 
  WHERE id = message_id;
  
  RETURN ROUND(revenue, 2);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process chat revenue
CREATE OR REPLACE FUNCTION process_chat_revenue(message_id UUID) 
RETURNS VOID AS $$
DECLARE
  msg_record RECORD;
  revenue DECIMAL;
BEGIN
  -- Get message details
  SELECT cm.*, p.username INTO msg_record 
  FROM chat_messages_ovi2025 cm
  JOIN profiles_ovi2025 p ON cm.user_id = p.id
  WHERE cm.id = message_id;
  
  IF NOT FOUND OR NOT msg_record.revenue_sharing THEN
    RETURN;
  END IF;
  
  -- Calculate revenue
  revenue := calculate_message_revenue(message_id);
  
  IF revenue > 0 THEN
    -- Record earnings
    INSERT INTO earnings_ovi2025 (
      user_id,
      source_type,
      source_id,
      amount,
      description,
      metadata
    ) VALUES (
      msg_record.user_id,
      'chat_revenue',
      message_id,
      revenue,
      'Revenue from chat message sharing',
      jsonb_build_object(
        'message_type', msg_record.message_type,
        'emotional_tone', msg_record.emotional_tone,
        'shared_track_id', msg_record.shared_track_id
      )
    );
    
    -- Record chat revenue details
    INSERT INTO chat_revenue_ovi2025 (
      message_id,
      track_id,
      sender_id,
      total_revenue,
      sender_share,
      platform_share,
      emotional_multiplier,
      status
    ) VALUES (
      message_id,
      msg_record.shared_track_id,
      msg_record.user_id,
      revenue,
      revenue * 0.8, -- 80% to sender
      revenue * 0.2, -- 20% platform fee
      CASE msg_record.emotional_tone
        WHEN 'excited' THEN 1.5
        WHEN 'enthusiastic' THEN 1.4
        WHEN 'creative' THEN 1.3
        ELSE 1.0
      END,
      'processed'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to process revenue on message insert
CREATE OR REPLACE FUNCTION handle_new_chat_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Process revenue if revenue sharing is enabled
  IF NEW.revenue_sharing = true THEN
    PERFORM process_chat_revenue(NEW.id);
  END IF;
  
  -- Record analytics
  INSERT INTO chat_analytics_ovi2025 (
    user_id,
    message_id,
    event_type,
    emotional_context,
    revenue_impact,
    metadata
  ) VALUES (
    NEW.user_id,
    NEW.id,
    'message_sent',
    jsonb_build_object(
      'emotional_tone', NEW.emotional_tone,
      'emotional_impact_score', NEW.emotional_impact_score
    ),
    NEW.revenue_earned,
    jsonb_build_object(
      'chat_type', NEW.chat_type,
      'message_type', NEW.message_type,
      'quantum_encrypted', NEW.quantum_encrypted
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new messages
DROP TRIGGER IF EXISTS on_chat_message_created ON chat_messages_ovi2025;
CREATE TRIGGER on_chat_message_created
  AFTER INSERT ON chat_messages_ovi2025
  FOR EACH ROW EXECUTE FUNCTION handle_new_chat_message();

-- Insert AI assistants
INSERT INTO ai_chat_assistants_ovi2025 (
  id,
  name,
  personality_type,
  specialization,
  knowledge_areas,
  personality_traits,
  accuracy_score,
  user_satisfaction
) VALUES 
(
  '00000000-0000-0000-0000-000000000101',
  'Harmony AI',
  'creative_mentor',
  ARRAY['music_production', 'collaboration', 'creative_inspiration'],
  '{"music_theory": 95, "production_techniques": 90, "emotional_analysis": 88}',
  '{"encouraging": true, "creative": true, "insightful": true}',
  94.5,
  92.3
),
(
  '00000000-0000-0000-0000-000000000102',
  'Revenue Sage',
  'business_advisor',
  ARRAY['monetization', 'market_analysis', 'revenue_optimization'],
  '{"business_strategy": 96, "market_trends": 93, "financial_planning": 91}',
  '{"analytical": true, "strategic": true, "results_oriented": true}',
  96.2,
  89.7
),
(
  '00000000-0000-0000-0000-000000000103',
  'Collab Connect',
  'collaboration_facilitator',
  ARRAY['networking', 'collaboration_matching', 'project_management'],
  '{"social_dynamics": 92, "project_coordination": 89, "talent_matching": 94}',
  '{"friendly": true, "organized": true, "connector": true}',
  91.8,
  94.1
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample chat messages for demonstration
INSERT INTO chat_messages_ovi2025 (
  id,
  user_id,
  chat_type,
  content,
  message_type,
  emotional_tone,
  revenue_sharing,
  emotional_impact_score,
  revenue_potential,
  ai_analysis
) VALUES 
(
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'global',
  'Just dropped my new quantum beat! Anyone want to collaborate? 🎵',
  'text',
  'excited',
  true,
  94.5,
  156.30,
  '{"collaboration_potential": 89, "viral_probability": 76, "revenue_forecast": 234.50}'
),
(
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'global',
  'Love the energy! Let''s create something revolutionary together 🚀',
  'text',
  'enthusiastic',
  false,
  87.2,
  98.40,
  '{"emotional_resonance": 92, "collaboration_match": 97, "creative_synergy": 85}'
)
ON CONFLICT (id) DO NOTHING;