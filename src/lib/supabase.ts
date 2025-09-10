import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://btxqnhkckvefmuyfghus.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eHFuaGtja3ZlZm11eWZnaHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMTcyMTAsImV4cCI6MjA3MjU5MzIxMH0.dugxPh1xUzi0lU0OBw0lN_PGaWpwJpHv10FhwhYcmcw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations with elevated privileges
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eHFuaGtja3ZlZm11eWZnaHVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzAxNzIxMCwiZXhwIjoyMDcyNTkzMjEwfQ.5pgcIKZwWjVGjfQFjsHXll4Z6tECTFxdLUr0ngqSZ_w';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  updated_at: string;
  image_url?: string;
  video_url?: string;
  category: 'AI' | 'Biotechnology' | 'Research' | 'Innovation' | 'Startup';
  tags: string[];
  read_time: number;
  featured: boolean;
  slug: string;
  status: 'draft' | 'published';
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

