import { supabase } from '../lib/supabase'

export class MusicService {
  // Track operations
  static async getTrendingTracks(limit = 10) {
    try {
      const { data, error } = await supabase
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
        .eq('is_trending', true)
        .order('plays_count', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching trending tracks:', error)
      return []
    }
  }

  static async searchTracks(query, genre = null, limit = 20) {
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
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)

      if (genre) {
        queryBuilder = queryBuilder.eq('genre', genre)
      }

      const { data, error } = await queryBuilder
        .order('plays_count', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching tracks:', error)
      return []
    }
  }

  static async playTrack(trackId, userId = null) {
    try {
      // Increment play count
      const { error: updateError } = await supabase
        .from('tracks_ovi2025')
        .update({ 
          plays_count: supabase.raw('plays_count + 1') 
        })
        .eq('id', trackId)

      if (updateError) throw updateError

      // Record analytics if user is logged in
      if (userId) {
        await this.recordAnalytics(trackId, userId, 'play')
      }

      return true
    } catch (error) {
      console.error('Error playing track:', error)
      return false
    }
  }

  static async likeTrack(trackId, userId) {
    try {
      const { data: existing } = await supabase
        .from('likes_ovi2025')
        .select('id')
        .eq('track_id', trackId)
        .eq('user_id', userId)
        .single()

      if (existing) {
        // Unlike
        const { error: deleteError } = await supabase
          .from('likes_ovi2025')
          .delete()
          .eq('track_id', trackId)
          .eq('user_id', userId)

        if (deleteError) throw deleteError

        // Decrement like count
        await supabase
          .from('tracks_ovi2025')
          .update({ likes_count: supabase.raw('likes_count - 1') })
          .eq('id', trackId)

        return false
      } else {
        // Like
        const { error: insertError } = await supabase
          .from('likes_ovi2025')
          .insert([{ track_id: trackId, user_id: userId }])

        if (insertError) throw insertError

        // Increment like count
        await supabase
          .from('tracks_ovi2025')
          .update({ likes_count: supabase.raw('likes_count + 1') })
          .eq('id', trackId)

        await this.recordAnalytics(trackId, userId, 'like')
        return true
      }
    } catch (error) {
      console.error('Error liking track:', error)
      return false
    }
  }

  static async recordAnalytics(trackId, userId, eventType, metadata = {}) {
    try {
      const { error } = await supabase
        .from('analytics_ovi2025')
        .insert([{
          track_id: trackId,
          user_id: userId,
          event_type: eventType,
          metadata: metadata
        }])

      if (error) throw error
    } catch (error) {
      console.error('Error recording analytics:', error)
    }
  }

  // User operations
  static async followUser(followerId, followingId) {
    try {
      const { data: existing } = await supabase
        .from('follows_ovi2025')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .single()

      if (existing) {
        // Unfollow
        const { error } = await supabase
          .from('follows_ovi2025')
          .delete()
          .eq('follower_id', followerId)
          .eq('following_id', followingId)

        if (error) throw error
        return false
      } else {
        // Follow
        const { error } = await supabase
          .from('follows_ovi2025')
          .insert([{ 
            follower_id: followerId, 
            following_id: followingId 
          }])

        if (error) throw error
        return true
      }
    } catch (error) {
      console.error('Error following user:', error)
      return false
    }
  }

  static async getUserStats(userId) {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles_ovi2025')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      // Get total earnings
      const { data: earnings } = await supabase
        .from('earnings_ovi2025')
        .select('amount')
        .eq('user_id', userId)

      const totalEarnings = earnings?.reduce((sum, earning) => sum + parseFloat(earning.amount), 0) || 0

      return {
        ...profile,
        total_earnings: totalEarnings
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
      return null
    }
  }

  // Live streaming
  static async startLiveStream(userId, title, description) {
    try {
      const { data, error } = await supabase
        .from('live_streams_ovi2025')
        .insert([{
          user_id: userId,
          title,
          description,
          is_live: true,
          started_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error starting live stream:', error)
      return null
    }
  }

  static async endLiveStream(streamId) {
    try {
      const { error } = await supabase
        .from('live_streams_ovi2025')
        .update({
          is_live: false,
          ended_at: new Date().toISOString()
        })
        .eq('id', streamId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error ending live stream:', error)
      return false
    }
  }

  // Monetization
  static async recordEarning(userId, sourceType, amount, sourceId = null, description = '') {
    try {
      const { data, error } = await supabase
        .from('earnings_ovi2025')
        .insert([{
          user_id: userId,
          source_type: sourceType,
          source_id: sourceId,
          amount: amount,
          description: description
        }])
        .select()
        .single()

      if (error) throw error

      // Update user's total earnings
      await supabase.rpc('increment_user_earnings', {
        user_id: userId,
        amount: amount
      })

      return data
    } catch (error) {
      console.error('Error recording earning:', error)
      return null
    }
  }

  static async getUserEarnings(userId, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('earnings_ovi2025')
        .select('*')
        .eq('user_id', userId)
        .order('transaction_date', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching user earnings:', error)
      return []
    }
  }
}