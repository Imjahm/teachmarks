import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const SUPABASE_URL = "https://utljzpogrljojlodblon.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bGp6cG9ncmxqb2psb2RibG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzOTU5MDYsImV4cCI6MjA1MTk3MTkwNn0.oosXd3a_zvRusk4QyNws8YoA-6oD-b_TXxpDtrYNLaM"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)