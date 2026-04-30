import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

console.log('[Supabase] URL:', supabaseUrl ? '✓ Loaded' : '✗ Missing')
console.log(
  '[Supabase] Key:',
  supabaseAnonKey
    ? `✓ Loaded (${supabaseAnonKey.slice(0, 20)}...)`
    : '✗ Missing',
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
