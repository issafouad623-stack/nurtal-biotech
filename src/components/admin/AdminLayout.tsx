'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Settings, 
  Users, 
  BarChart3,
  Home,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All Articles', href: '/admin/articles', icon: FileText },
    { name: 'New Article', href: '/admin/articles/new', icon: Plus },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }} className="flex">
      {/* Sidebar */}
      <div style={{ backgroundColor: '#111111', borderRight: '1px solid #333333' }} className="w-64 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: '#333333' }}>
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)' }}>
              <span style={{ color: '#ffffff' }} className="font-display text-lg font-bold">N</span>
            </div>
            <div>
              <h1 style={{ color: '#ffffff' }} className="font-display text-xl font-bold">Admin Panel</h1>
              <p style={{ color: '#94a3b8' }} className="text-xs">Nurtal Biotechnologies</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-400' 
                    : 'hover:text-blue-400'
                }`}
                style={{ 
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  backgroundColor: isActive ? 'rgba(14, 165, 233, 0.1)' : 'transparent'
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t" style={{ borderColor: '#333333' }}>
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:text-blue-400"
            style={{ color: '#cbd5e1' }}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Site</span>
          </Link>
          <button
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:text-red-400 w-full"
            style={{ color: '#cbd5e1' }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header style={{ backgroundColor: '#111111', borderBottom: '1px solid #333333' }} className="px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 style={{ color: '#ffffff' }} className="text-2xl font-bold">
              {navigation.find(item => item.href === pathname)?.name || 'Admin Panel'}
            </h2>
            <div className="flex items-center space-x-4">
              <span style={{ color: '#94a3b8' }} className="text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8" style={{ backgroundColor: '#000000' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
