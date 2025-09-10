'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@nurtal.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }} className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)' }}>
            <span style={{ color: '#ffffff' }} className="font-display text-2xl font-bold">N</span>
          </div>
          <h1 style={{ color: '#ffffff' }} className="font-display text-2xl font-bold">Admin Login</h1>
          <p style={{ color: '#94a3b8' }} className="mt-2">Access the Nurtal CMS</p>
        </div>

        {/* Login Form */}
        <div
          className="rounded-xl border p-8"
          style={{
            backgroundColor: '#111111',
            borderColor: '#333333'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444', color: '#ef4444' }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#94a3b8' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#333333',
                    color: '#ffffff'
                  }}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ color: '#ffffff' }} className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#94a3b8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#333333',
                    color: '#ffffff'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#94a3b8' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(to right, #0ea5e9, #d946ef)',
                color: '#ffffff'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#1a1a1a', borderColor: '#333333' }}>
            <p style={{ color: '#94a3b8' }} className="text-sm">
              <strong>Default credentials:</strong><br />
              Email: admin@nurtal.com<br />
              Password: admin123
            </p>
            <p style={{ color: '#fbbf24' }} className="text-xs mt-2">
              ⚠️ Change the password after first login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

