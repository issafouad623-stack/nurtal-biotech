import { NextRequest, NextResponse } from 'next/server';
import { logoutUser } from '@/lib/supabase-auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (sessionCookie) {
      await logoutUser(sessionCookie.value);
      cookieStore.delete('admin_session');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

