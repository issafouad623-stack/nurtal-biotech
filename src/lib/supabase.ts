import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isServer = typeof window === 'undefined';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL. Set it in your environment variables.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Set it in your environment variables.');
}

// Only required on the server where admin operations occur
if (isServer && !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your server environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations with elevated privileges
export const supabaseAdmin = createClient(supabaseUrl, (isServer ? supabaseServiceRoleKey! : supabaseAnonKey), {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

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

