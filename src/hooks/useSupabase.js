import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useSupabase() {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
        }
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Session error:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)

          // Handle profile creation on signup
          if (event === 'SIGNED_UP' && session?.user) {
            console.log('User signed up, profile will be created via trigger...')
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, metadata = {}) => {
    try {
      setLoading(true)
      console.log('SignUp attempt:', { email, metadata })

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            ...metadata,
            email: email.trim()
          }
        }
      })

      if (error) {
        console.error('SignUp error:', error)
        throw error
      }

      console.log('SignUp success:', data)
      return { data, error: null }
    } catch (error) {
      console.error('SignUp exception:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      console.log('SignIn attempt:', { email })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      })

      if (error) {
        console.error('SignIn error:', error)
        throw error
      }

      console.log('SignIn success:', data)
      return { data, error: null }
    } catch (error) {
      console.error('SignIn exception:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      console.log('SignOut attempt')

      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('SignOut error:', error)
        throw error
      }

      console.log('SignOut success')
      return { error: null }
    } catch (error) {
      console.error('SignOut exception:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    supabase
  }
}

// Custom hooks for specific data
export function useTracks(limit = 10) {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTracks()
  }, [limit])

  const fetchTracks = async () => {
    try {
      setLoading(true)
      setError(null)

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
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching tracks:', error)
        setError(error.message)
        return
      }

      setTracks(data || [])
    } catch (error) {
      console.error('Error fetching tracks:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { tracks, loading, error, refetch: fetchTracks }
}

export function useProfile(userId) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userId) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [userId])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('profiles_ovi2025')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setError(error.message)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { profile, loading, error, refetch: fetchProfile }
}

export function useLiveStreams() {
  const [streams, setStreams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLiveStreams()
  }, [])

  const fetchLiveStreams = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('live_streams_ovi2025')
        .select(`
          *,
          profiles_ovi2025!live_streams_ovi2025_user_id_fkey (
            username,
            display_name,
            avatar_url,
            verified
          )
        `)
        .eq('is_live', true)
        .order('viewers_count', { ascending: false })

      if (error) {
        console.error('Error fetching live streams:', error)
        setError(error.message)
        return
      }

      setStreams(data || [])
    } catch (error) {
      console.error('Error fetching live streams:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { streams, loading, error, refetch: fetchLiveStreams }
}