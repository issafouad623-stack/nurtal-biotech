import { cookies } from 'next/headers';

// Default admin password (should be changed via environment variable)
const DEFAULT_ADMIN_PASSWORD = 'admin123';

// Get the admin password from environment or use default
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

// Simple hash function (for demo purposes - use bcrypt in production)
export function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Check if the user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  
  if (!authCookie) {
    return false;
  }

  try {
    // Simple token validation - in production, use JWT or similar
    const authData = JSON.parse(Buffer.from(authCookie.value, 'base64').toString());
    const now = Date.now();
    
    // Check if token is expired (24 hours)
    if (now > authData.expires) {
      return false;
    }
    
    return authData.authenticated === true;
  } catch {
    return false;
  }
}

// Create authentication token
export function createAuthToken(): string {
  const authData = {
    authenticated: true,
    expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    timestamp: Date.now()
  };
  
  return Buffer.from(JSON.stringify(authData)).toString('base64');
}

// Authenticate with password
export async function authenticateAdmin(password: string): Promise<boolean> {
  const adminPassword = getAdminPassword();
  
  // For simplicity, we'll do direct comparison
  // In production, you'd want to hash the stored password
  return password === adminPassword;
}
