import { supabaseAdmin } from './supabase';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: string;
}

// Password hashing using bcrypt
function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

// Generate session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Authenticate admin user
export async function authenticateAdmin(email: string, password: string): Promise<{ user: AdminUser; token: string } | null> {
  const { data: user, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    console.error('Authentication failed:', error);
    return null;
  }

  // Verify password using bcrypt
  if (!verifyPassword(password, user.password_hash)) {
    console.error('Invalid password');
    return null;
  }

  // Create session
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const { error: sessionError } = await supabaseAdmin
    .from('admin_sessions')
    .insert([{
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    }]);

  if (sessionError) {
    console.error('Error creating session:', sessionError);
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
    token: sessionToken
  };
}

// Validate session
export async function validateSession(token: string): Promise<AdminUser | null> {
  const { data: session, error } = await supabaseAdmin
    .from('admin_sessions')
    .select(`
      *,
      admin_users (
        id,
        email,
        created_at
      )
    `)
    .eq('session_token', token)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !session) {
    return null;
  }

  return session.admin_users as AdminUser;
}

// Check if user is authenticated (server-side)
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (!sessionCookie) {
      return false;
    }

    const user = await validateSession(sessionCookie.value);
    return !!user;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

// Get current user (server-side)
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (!sessionCookie) {
      return null;
    }

    return await validateSession(sessionCookie.value);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Logout user
export async function logoutUser(token: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('admin_sessions')
    .delete()
    .eq('session_token', token);

  return !error;
}

// Change admin password
export async function changeAdminPassword(userId: string, newPassword: string): Promise<boolean> {
  const passwordHash = hashPassword(newPassword);
  
  const { error } = await supabaseAdmin
    .from('admin_users')
    .update({ password_hash: passwordHash })
    .eq('id', userId);

  if (error) {
    console.error('Error changing password:', error);
    return false;
  }

  // Invalidate all sessions for this user
  await supabaseAdmin
    .from('admin_sessions')
    .delete()
    .eq('user_id', userId);

  return true;
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
  await supabaseAdmin
    .from('admin_sessions')
    .delete()
    .lt('expires_at', new Date().toISOString());
}

