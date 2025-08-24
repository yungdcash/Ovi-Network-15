import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: supabaseUser, session, loading: supabaseLoading, signUp, signIn, signOut, supabase } = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (supabaseUser) {
      fetchUserProfile(supabaseUser.id);
    } else {
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  }, [supabaseUser]);

  const fetchUserProfile = async (userId) => {
    try {
      setLoading(true);
      setAuthError(null);
      console.log('Fetching profile for user:', userId);

      const { data, error } = await supabase
        .from('profiles_ovi2025')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...');
          await createProfile(userId);
          return;
        }
        // For other errors, still set basic user info
        setUser({
          ...supabaseUser,
          name: supabaseUser?.email?.split('@')[0] || 'User',
          avatar: null
        });
        setProfile(null);
      } else if (data) {
        console.log('Profile fetched successfully:', data);
        setProfile(data);
        setUser({
          ...supabaseUser,
          profile: data,
          name: data.display_name || data.username || supabaseUser.email?.split('@')[0] || 'User',
          avatar: data.avatar_url
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setAuthError('Failed to load user profile');
      // Set basic user info even on error
      setUser({
        ...supabaseUser,
        name: supabaseUser?.email?.split('@')[0] || 'User',
        avatar: null
      });
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (userId) => {
    try {
      const username = supabaseUser?.email?.split('@')[0] || `user_${Date.now()}`;
      const displayName = supabaseUser?.user_metadata?.full_name || 
                          supabaseUser?.user_metadata?.display_name || 
                          username;

      const profileData = {
        id: userId,
        username: username,
        display_name: displayName,
        bio: 'New creator on Ovi Network',
        security_level: 'standard',
        verified: false,
        tracks_count: 0,
        followers_count: 0,
        following_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Creating profile with data:', profileData);

      // First, check if profile already exists to avoid conflicts
      const { data: existingProfile } = await supabase
        .from('profiles_ovi2025')
        .select('id')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        console.log('Profile already exists, fetching it...');
        await fetchUserProfile(userId);
        return;
      }

      const { data, error } = await supabase
        .from('profiles_ovi2025')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('Profile creation error:', error);
        // Handle specific errors
        if (error.code === '23505') {
          // Unique constraint violation - profile already exists
          console.log('Profile already exists due to unique constraint, fetching...');
          await fetchUserProfile(userId);
          return;
        }
        throw error;
      }

      console.log('Profile created successfully:', data);
      setProfile(data);
      setUser({
        ...supabaseUser,
        profile: data,
        name: data.display_name || data.username,
        avatar: data.avatar_url
      });
      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      // Even if profile creation fails, set basic user info
      setUser({
        ...supabaseUser,
        name: supabaseUser?.email?.split('@')[0] || 'User',
        avatar: null
      });
      throw error;
    }
  };

  const login = async (credentials, authMethod = 'standard') => {
    try {
      setLoading(true);
      setAuthError(null);
      console.log('Attempting login with:', { email: credentials.email, authMethod });

      const { data, error } = await signIn(credentials.email, credentials.password);

      if (error) {
        console.error('Login error:', error);
        setAuthError(error.message);
        
        // Provide more specific error messages
        let userFriendlyError = error.message;
        if (error.message.includes('Invalid login credentials')) {
          userFriendlyError = 'Invalid email or password. Please check your credentials.';
        } else if (error.message.includes('Email not confirmed')) {
          userFriendlyError = 'Please check your email and click the confirmation link before signing in.';
        } else if (error.message.includes('Too many requests')) {
          userFriendlyError = 'Too many login attempts. Please wait a few minutes before trying again.';
        }
        
        return { success: false, error: userFriendlyError };
      }

      if (data?.user) {
        console.log('Login successful:', data.user.email);
        return { success: true, user: data.user };
      }

      return { success: false, error: 'Login failed - no user data returned' };
    } catch (error) {
      console.error('Login exception:', error);
      setAuthError(error.message);
      
      let userFriendlyError = 'Login failed. Please try again.';
      if (error.message.includes('fetch')) {
        userFriendlyError = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('timeout')) {
        userFriendlyError = 'Request timed out. Please try again.';
      }
      
      return { success: false, error: userFriendlyError };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData, authMethod = 'standard') => {
    try {
      setLoading(true);
      setAuthError(null);
      console.log('Attempting registration with:', { email: userData.email, name: userData.name, authMethod });

      const { data, error } = await signUp(userData.email, userData.password, {
        full_name: userData.name,
        display_name: userData.name
      });

      if (error) {
        console.error('Registration error:', error);
        setAuthError(error.message);
        
        // Provide more specific error messages
        let userFriendlyError = error.message;
        if (error.message.includes('User already registered')) {
          userFriendlyError = 'An account with this email already exists. Please try signing in instead.';
        } else if (error.message.includes('Password should be at least 6 characters')) {
          userFriendlyError = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('signup_disabled')) {
          userFriendlyError = 'Account registration is currently disabled. Please try again later.';
        } else if (error.message.includes('email_address_invalid')) {
          userFriendlyError = 'Please enter a valid email address.';
        }
        
        return { success: false, error: userFriendlyError };
      }

      if (data?.user) {
        console.log('Registration successful:', data.user.email);
        
        // Check if user was created but needs email confirmation
        if (!data.session) {
          return { 
            success: true, 
            user: data.user, 
            message: 'Please check your email and click the confirmation link to activate your account.'
          };
        }

        return { success: true, user: data.user };
      }

      return { success: false, error: 'Registration failed - no user data returned' };
    } catch (error) {
      console.error('Registration exception:', error);
      setAuthError(error.message);
      
      let userFriendlyError = 'Registration failed. Please try again.';
      if (error.message.includes('fetch')) {
        userFriendlyError = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('timeout')) {
        userFriendlyError = 'Request timed out. Please try again.';
      }
      
      return { success: false, error: userFriendlyError };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { error } = await signOut();
      
      if (error) {
        console.error('Logout error:', error);
        setAuthError(error.message);
        throw error;
      }

      // Clear local state
      setUser(null);
      setProfile(null);
      console.log('Logout successful');
      return { success: true };
    } catch (error) {
      console.error('Logout exception:', error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    profile,
    session,
    loading: loading || supabaseLoading,
    authError,
    login,
    register,
    logout,
    clearError,
    supabase,
    securityLevel: profile?.security_level || 'standard'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};