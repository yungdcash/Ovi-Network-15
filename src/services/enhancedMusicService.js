import { supabase } from '../lib/supabase'

export class EnhancedMusicService {
  // Enhanced analytics and tracking
  static async recordDetailedAnalytics(trackId, userId, eventType, metadata = {}) {
    try {
      // Enhanced metadata collection
      const enhancedMetadata = {
        ...metadata,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        platform: navigator.platform,
        language: navigator.language,
        referrer: document.referrer,
        session_id: this.getSessionId()
      }

      const { error } = await supabase
        .from('analytics_ovi2025')
        .insert([{
          track_id: trackId,
          user_id: userId,
          event_type: eventType,
          metadata: enhancedMetadata
        }])

      if (error) throw error
      
      // Update real-time engagement metrics
      if (eventType === 'play') {
        await this.updateTrackEngagement(trackId, 'plays')
      } else if (eventType === 'like') {
        await this.updateTrackEngagement(trackId, 'likes')
      }
      
      return true
    } catch (error) {
      console.error('Error recording detailed analytics:', error)
      return false
    }
  }

  static getSessionId() {
    let sessionId = sessionStorage.getItem('ovi_session_id')
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('ovi_session_id', sessionId)
    }
    return sessionId
  }

  static async updateTrackEngagement(trackId, type) {
    const column = type === 'plays' ? 'plays_count' : 'likes_count'
    
    try {
      const { error } = await supabase
        .rpc('increment_track_stat', {
          track_id: trackId,
          stat_type: column
        })
      
      if (error) {
        // Fallback to direct update
        await supabase
          .from('tracks_ovi2025')
          .update({ [column]: supabase.raw(`${column} + 1`) })
          .eq('id', trackId)
      }
    } catch (error) {
      console.error('Error updating track engagement:', error)
    }
  }

  // Enhanced recommendation system
  static async getPersonalizedRecommendations(userId, limit = 10) {
    try {
      // Get user's listening history
      const { data: userHistory } = await supabase
        .from('analytics_ovi2025')
        .select('track_id, tracks_ovi2025(genre, user_id)')
        .eq('user_id', userId)
        .eq('event_type', 'play')
        .order('created_at', { ascending: false })
        .limit(50)

      // Extract preferred genres and artists
      const preferredGenres = this.extractPreferences(userHistory, 'genre')
      const preferredArtists = this.extractPreferences(userHistory, 'user_id')

      // Build recommendation query
      let query = supabase
        .from('tracks_ovi2025')
        .select(`
          *,
          profiles_ovi2025!tracks_ovi2025_user_id_fkey (
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .eq('is_public', true)
        .neq('user_id', userId)

      // Apply preference filters
      if (preferredGenres.length > 0) {
        query = query.in('genre', preferredGenres)
      }

      const { data, error } = await query
        .order('plays_count', { ascending: false })
        .limit(limit * 2) // Get more to allow for filtering

      if (error) throw error

      // Score and sort recommendations
      const scoredTracks = (data || []).map(track => ({
        ...track,
        recommendation_score: this.calculateRecommendationScore(track, preferredGenres, preferredArtists)
      }))

      return scoredTracks
        .sort((a, b) => b.recommendation_score - a.recommendation_score)
        .slice(0, limit)
    } catch (error) {
      console.error('Error getting personalized recommendations:', error)
      return []
    }
  }

  static extractPreferences(history, field) {
    if (!history) return []
    
    const counts = {}
    history.forEach(item => {
      if (item.tracks_ovi2025?.[field]) {
        const value = item.tracks_ovi2025[field]
        counts[value] = (counts[value] || 0) + 1
      }
    })

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([key]) => key)
  }

  static calculateRecommendationScore(track, preferredGenres, preferredArtists) {
    let score = 0
    
    // Genre preference bonus
    if (preferredGenres.includes(track.genre)) {
      score += 100
    }
    
    // Artist preference bonus
    if (preferredArtists.includes(track.user_id)) {
      score += 150
    }
    
    // Popularity factor
    score += Math.log(track.plays_count + 1) * 10
    score += Math.log(track.likes_count + 1) * 15
    
    // Recency bonus
    const daysSinceCreation = (Date.now() - new Date(track.created_at)) / (1000 * 60 * 60 * 24)
    if (daysSinceCreation < 7) {
      score += 50
    } else if (daysSinceCreation < 30) {
      score += 25
    }
    
    return score
  }

  // Enhanced user dashboard stats
  static async getUserDashboardStats(userId) {
    try {
      const [profileData, earningsData, analyticsData] = await Promise.all([
        // Get user profile and basic stats
        supabase
          .from('profiles_ovi2025')
          .select('*')
          .eq('id', userId)
          .single(),
        
        // Get earnings breakdown
        supabase
          .from('earnings_ovi2025')
          .select('source_type, amount, transaction_date')
          .eq('user_id', userId)
          .order('transaction_date', { ascending: false }),
        
        // Get recent analytics
        supabase
          .from('analytics_ovi2025')
          .select('event_type, created_at')
          .eq('user_id', userId)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      ])

      const profile = profileData.data
      const earnings = earningsData.data || []
      const analytics = analyticsData.data || []

      // Calculate various metrics
      const totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.amount), 0)
      const monthlyEarnings = earnings
        .filter(earning => new Date(earning.transaction_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .reduce((sum, earning) => sum + parseFloat(earning.amount), 0)

      const earningsBySource = earnings.reduce((acc, earning) => {
        acc[earning.source_type] = (acc[earning.source_type] || 0) + parseFloat(earning.amount)
        return acc
      }, {})

      const activityByType = analytics.reduce((acc, activity) => {
        acc[activity.event_type] = (acc[activity.event_type] || 0) + 1
        return acc
      }, {})

      return {
        profile,
        stats: {
          total_earnings: totalEarnings,
          monthly_earnings: monthlyEarnings,
          earnings_by_source: earningsBySource,
          activity_by_type: activityByType,
          total_activity: analytics.length
        }
      }
    } catch (error) {
      console.error('Error fetching user dashboard stats:', error)
      return null
    }
  }

  // Enhanced live streaming features
  static async createLiveStream(userId, streamData) {
    try {
      const { data, error } = await supabase
        .from('live_streams_ovi2025')
        .insert([{
          user_id: userId,
          title: streamData.title,
          description: streamData.description,
          thumbnail_url: streamData.thumbnail_url,
          is_live: false, // Will be set to true when stream actually starts
          stream_key: this.generateStreamKey(),
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating live stream:', error)
      return null
    }
  }

  static generateStreamKey() {
    return 'stream_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16)
  }

  static async updateStreamViewers(streamId, viewerCount) {
    try {
      const { error } = await supabase
        .from('live_streams_ovi2025')
        .update({
          viewers_count: viewerCount,
          max_viewers: supabase.raw(`GREATEST(max_viewers, ${viewerCount})`)
        })
        .eq('id', streamId)
        .eq('is_live', true)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating stream viewers:', error)
      return false
    }
  }

  // Enhanced NFT marketplace features
  static async createNFT(userId, nftData) {
    try {
      const { data, error } = await supabase
        .from('nfts_ovi2025')
        .insert([{
          creator_id: userId,
          track_id: nftData.track_id,
          title: nftData.title,
          description: nftData.description,
          image_url: nftData.image_url,
          price: nftData.price,
          is_auction: nftData.is_auction || false,
          auction_end_time: nftData.auction_end_time,
          status: 'available'
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating NFT:', error)
      return null
    }
  }

  static async purchaseNFT(nftId, buyerId) {
    try {
      const { data: nft, error: fetchError } = await supabase
        .from('nfts_ovi2025')
        .select('*')
        .eq('id', nftId)
        .eq('status', 'available')
        .single()

      if (fetchError || !nft) {
        throw new Error('NFT not available for purchase')
      }

      // Update NFT status and owner
      const { error: updateError } = await supabase
        .from('nfts_ovi2025')
        .update({
          owner_id: buyerId,
          status: 'sold',
          sold_at: new Date().toISOString()
        })
        .eq('id', nftId)

      if (updateError) throw updateError

      // Record the earning for the creator
      await supabase
        .from('earnings_ovi2025')
        .insert([{
          user_id: nft.creator_id,
          source_type: 'nft',
          source_id: nftId,
          amount: nft.price * 0.975, // 2.5% platform fee
          description: `NFT Sale: ${nft.title}`
        }])

      return true
    } catch (error) {
      console.error('Error purchasing NFT:', error)
      return false
    }
  }

  // Fan investment system
  static async createFanInvestment(creatorId, investorId, investmentData) {
    try {
      const { data, error } = await supabase
        .from('fan_investments_ovi2025')
        .insert([{
          creator_id: creatorId,
          investor_id: investorId,
          campaign_title: investmentData.campaign_title,
          investment_amount: investmentData.amount,
          revenue_share_percentage: investmentData.revenue_share,
          duration_months: investmentData.duration,
          status: 'active',
          expires_at: new Date(Date.now() + investmentData.duration * 30 * 24 * 60 * 60 * 1000).toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      // Record the investment as earnings for the creator
      await supabase
        .from('earnings_ovi2025')
        .insert([{
          user_id: creatorId,
          source_type: 'fan_investment',
          source_id: data.id,
          amount: investmentData.amount,
          description: `Fan Investment: ${investmentData.campaign_title}`
        }])

      return data
    } catch (error) {
      console.error('Error creating fan investment:', error)
      return null
    }
  }

  // Advanced search with filters
  static async advancedSearch(query, filters = {}) {
    try {
      let queryBuilder = supabase
        .from('tracks_ovi2025')
        .select(`
          *,
          profiles_ovi2025!tracks_ovi2025_user_id_fkey (
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .eq('is_public', true)

      // Text search
      if (query) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${query}%,description.ilike.%${query}%`
        )
      }

      // Genre filter
      if (filters.genre && filters.genre !== 'All') {
        queryBuilder = queryBuilder.eq('genre', filters.genre)
      }

      // Duration filter
      if (filters.minDuration) {
        queryBuilder = queryBuilder.gte('duration', filters.minDuration)
      }
      if (filters.maxDuration) {
        queryBuilder = queryBuilder.lte('duration', filters.maxDuration)
      }

      // Date range filter
      if (filters.dateFrom) {
        queryBuilder = queryBuilder.gte('created_at', filters.dateFrom)
      }
      if (filters.dateTo) {
        queryBuilder = queryBuilder.lte('created_at', filters.dateTo)
      }

      // Verified artists only
      if (filters.verifiedOnly) {
        queryBuilder = queryBuilder.eq('profiles_ovi2025.verified', true)
      }

      // Sorting
      const sortBy = filters.sortBy || 'created_at'
      const sortOrder = filters.sortOrder || 'desc'
      queryBuilder = queryBuilder.order(sortBy, { ascending: sortOrder === 'asc' })

      const { data, error } = await queryBuilder.limit(filters.limit || 20)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error in advanced search:', error)
      return []
    }
  }

  // Real-time notifications
  static subscribeToUserNotifications(userId, callback) {
    const channel = supabase
      .channel('user-notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'likes_ovi2025',
        filter: `track_id=in.(${userId})`
      }, (payload) => {
        callback({
          type: 'like',
          data: payload.new,
          message: 'Someone liked your track!'
        })
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'follows_ovi2025',
        filter: `following_id=eq.${userId}`
      }, (payload) => {
        callback({
          type: 'follow',
          data: payload.new,
          message: 'You have a new follower!'
        })
      })
      .subscribe()

    return channel
  }

  // Batch operations for better performance
  static async batchUpdatePlayCounts(trackIds) {
    try {
      const { error } = await supabase.rpc('batch_increment_plays', {
        track_ids: trackIds
      })
      
      if (error) {
        // Fallback to individual updates
        const promises = trackIds.map(id => 
          supabase
            .from('tracks_ovi2025')
            .update({ plays_count: supabase.raw('plays_count + 1') })
            .eq('id', id)
        )
        await Promise.all(promises)
      }
      
      return true
    } catch (error) {
      console.error('Error in batch update play counts:', error)
      return false
    }
  }
}