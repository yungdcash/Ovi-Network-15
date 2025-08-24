import { createClient } from '@supabase/supabase-js'

// Project credentials - auto-injected during deployment
const SUPABASE_URL = 'https://brevbtnyxwlygyhglpbc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZXZidG55eHdseWd5aGdscGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMTY0NzksImV4cCI6MjA3MDc5MjQ3OX0.AdlmWC-EChsTq_SN9oRIOndNIUUOObJC2YyC8V82__w'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ) {
  throw new Error('Missing Supabase variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
})

export default supabase