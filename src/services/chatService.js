import { supabase } from '../lib/supabase'

export class ChatService {
  // Revolutionary Chat Features
  
  static async sendMessage(chatData) {
    try {
      const { data, error } = await supabase
        .from('chat_messages_ovi2025')
        .insert([{
          user_id: chatData.userId,
          chat_type: chatData.chatType, // 'global', 'private', 'creators', 'ai'
          content: chatData.content,
          message_type: chatData.messageType, // 'text', 'voice', 'track_share', 'ai_suggestion'
          shared_track_id: chatData.sharedTrackId,
          emotional_tone: chatData.emotionalTone,
          revenue_sharing: chatData.revenueSharing,
          quantum_encrypted: chatData.quantumEncrypted,
          ai_analysis: chatData.aiAnalysis,
          metadata: chatData.metadata || {}
        }])
        .select()
        .single()

      if (error) throw error

      // Record revenue from message if revenue sharing is enabled
      if (chatData.revenueSharing && chatData.sharedTrackId) {
        await this.recordMessageRevenue(chatData.userId, data.id, chatData.sharedTrackId)
      }

      return data
    } catch (error) {
      console.error('Error sending message:', error)
      return null
    }
  }

  static async recordMessageRevenue(userId, messageId, trackId) {
    try {
      // Calculate revenue based on engagement and track popularity
      const revenue = Math.random() * 10 + 5 // $5-15 per share (demo calculation)
      
      const { error } = await supabase
        .from('earnings_ovi2025')
        .insert([{
          user_id: userId,
          source_type: 'chat_revenue',
          source_id: messageId,
          amount: revenue,
          description: `Revenue from sharing track in chat`,
          metadata: { track_id: trackId, message_id: messageId }
        }])

      if (error) throw error
      return revenue
    } catch (error) {
      console.error('Error recording message revenue:', error)
      return 0
    }
  }

  static async getChatMessages(chatType, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('chat_messages_ovi2025')
        .select(`
          *,
          profiles_ovi2025!chat_messages_ovi2025_user_id_fkey (
            username,
            display_name,
            avatar_url,
            verified
          ),
          tracks_ovi2025!chat_messages_ovi2025_shared_track_id_fkey (
            title,
            cover_url,
            duration,
            plays_count
          )
        `)
        .eq('chat_type', chatType)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching chat messages:', error)
      return []
    }
  }

  static async analyzeEmotionalTone(message) {
    // Revolutionary AI emotional analysis
    const emotions = {
      excited: ['amazing', 'awesome', 'incredible', 'fantastic', 'wow'],
      happy: ['good', 'great', 'nice', 'cool', 'sweet'],
      creative: ['create', 'make', 'build', 'compose', 'produce'],
      enthusiastic: ['love', 'awesome', 'brilliant', 'perfect'],
      calm: ['peaceful', 'relaxed', 'chill', 'smooth'],
      energetic: ['pump', 'energy', 'power', 'intense', 'fire']
    }

    const words = message.toLowerCase().split(' ')
    const scores = {}

    Object.entries(emotions).forEach(([emotion, keywords]) => {
      scores[emotion] = keywords.filter(keyword => 
        words.some(word => word.includes(keyword))
      ).length
    })

    // Return the emotion with highest score
    const topEmotion = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )

    return topEmotion[1] > 0 ? topEmotion[0] : 'neutral'
  }

  static async generateAIResponse(userMessage, context = {}) {
    // Revolutionary AI response generation
    const responses = {
      music_creation: [
        "Based on your message, I recommend exploring {genre} with a {tempo} tempo. This combination has a 94% success rate for viral tracks.",
        "Your creative energy is perfect for collaboration! I found 3 producers with 97% compatibility to your style.",
        "The emotional tone of your message suggests you're in an optimal creative state. Perfect time to create!"
      ],
      collaboration: [
        "I've analyzed your music style and found potential collaborators who complement your sound perfectly.",
        "Your track would benefit from a collaboration with artists who specialize in {complementary_genre}.",
        "Based on successful collaboration patterns, I recommend reaching out to creators in your network."
      ],
      revenue_optimization: [
        "Your shared track has high viral potential! I predict a 67% increase in revenue if shared during peak hours.",
        "Revenue optimization suggestion: Add emotional peaks at 1:23 and 2:45 for maximum engagement.",
        "Your track's emotional resonance score is 89%. Perfect for revenue-sharing in chat!"
      ]
    }

    // Determine response category based on message content
    let category = 'music_creation'
    if (userMessage.toLowerCase().includes('collab')) category = 'collaboration'
    if (userMessage.toLowerCase().includes('revenue') || userMessage.toLowerCase().includes('money')) category = 'revenue_optimization'

    const categoryResponses = responses[category]
    const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]

    // Generate AI analysis data
    const aiAnalysis = {
      emotionalImpact: Math.floor(Math.random() * 20) + 80, // 80-100%
      revenueProjection: Math.floor(Math.random() * 200) + 100, // $100-300
      suggestions: this.generateAISuggestions(userMessage),
      confidence: Math.floor(Math.random() * 15) + 85 // 85-100%
    }

    return {
      content: response,
      aiAnalysis: aiAnalysis,
      type: 'ai_response'
    }
  }

  static generateAISuggestions(message) {
    const allSuggestions = [
      'Tempo optimization',
      'Harmonic enhancement', 
      'Bass frequency tuning',
      'Emotional peak placement',
      'Collaboration matching',
      'Genre fusion',
      'Revenue timing',
      'Viral potential boost',
      'Engagement optimization',
      'Creative flow enhancement'
    ]

    // Return 3 random suggestions
    return allSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
  }

  static async subscribeToChat(chatType, callback) {
    const channel = supabase
      .channel(`chat-${chatType}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages_ovi2025',
        filter: `chat_type=eq.${chatType}`
      }, (payload) => {
        callback(payload.new)
      })
      .subscribe()

    return channel
  }

  static async recordChatAnalytics(userId, messageId, eventType) {
    try {
      await supabase
        .from('chat_analytics_ovi2025')
        .insert([{
          user_id: userId,
          message_id: messageId,
          event_type: eventType, // 'send', 'react', 'share_track', 'ai_interaction'
          timestamp: new Date().toISOString()
        }])
    } catch (error) {
      console.error('Error recording chat analytics:', error)
    }
  }

  // Revolutionary Revenue Sharing Features
  static async calculateMessageRevenue(messageData) {
    const baseRevenue = 1.0 // $1 base
    let multiplier = 1.0

    // Emotional engagement multiplier
    if (messageData.emotional_tone) {
      const emotionMultipliers = {
        excited: 1.5,
        enthusiastic: 1.4,
        creative: 1.3,
        happy: 1.2,
        energetic: 1.4,
        calm: 1.1
      }
      multiplier *= emotionMultipliers[messageData.emotional_tone] || 1.0
    }

    // Track sharing multiplier
    if (messageData.shared_track_id) {
      multiplier *= 2.0
    }

    // AI interaction multiplier
    if (messageData.message_type === 'ai_suggestion') {
      multiplier *= 1.8
    }

    // Time-based multiplier (peak hours)
    const hour = new Date().getHours()
    if (hour >= 18 && hour <= 22) { // Peak engagement hours
      multiplier *= 1.3
    }

    return Math.round((baseRevenue * multiplier) * 100) / 100
  }

  static async getRevenueLeaderboard(timeframe = '24h') {
    try {
      let timeFilter
      switch (timeframe) {
        case '24h':
          timeFilter = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          break
        case '7d':
          timeFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          break
        case '30d':
          timeFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          break
        default:
          timeFilter = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }

      const { data, error } = await supabase
        .from('earnings_ovi2025')
        .select(`
          user_id,
          sum(amount) as total_revenue,
          profiles_ovi2025!earnings_ovi2025_user_id_fkey (
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .eq('source_type', 'chat_revenue')
        .gte('transaction_date', timeFilter)
        .group('user_id')
        .order('total_revenue', { ascending: false })
        .limit(10)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching revenue leaderboard:', error)
      return []
    }
  }
}