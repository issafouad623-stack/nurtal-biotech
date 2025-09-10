'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, BookOpen, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'AI News', href: '/category/ai', icon: Zap },
    { name: 'Biotechnology', href: '/category/biotechnology', icon: TrendingUp },
    { name: 'Research', href: '/category/research', icon: BookOpen },
    { name: 'Innovation', href: '/category/innovation', icon: Zap },
    { name: 'Startups', href: '/category/startup', icon: TrendingUp },
  ];

  return (
    <nav style={{ backgroundColor: '#000000', borderBottom: '1px solid #333333' }} className="backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-black p-1.5 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-2 border-gray-600">
                    <Image
                      src="/logo.svg?v=8"
                      alt="Nurtal Logo"
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
            </div>
            <div className="hidden sm:block">
              <h1 style={{ color: '#ffffff' }} className="font-display text-2xl font-bold group-hover:text-blue-400 transition-colors">
                Nurtal
              </h1>
              <p style={{ color: '#94a3b8' }} className="text-xs font-mono">AI & Biotechnology News</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ color: '#cbd5e1' }}
                className="hover:text-blue-400 font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <button style={{ color: '#94a3b8' }} className="p-2 hover:text-blue-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button style={{ color: '#94a3b8' }} className="p-2 hover:text-blue-400 transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: '#94a3b8' }} className="md:hidden p-2 hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ backgroundColor: '#111111', borderTop: '1px solid #333333' }} className="md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ color: '#cbd5e1' }} className="flex items-center space-x-3 hover:text-blue-400 font-medium transition-colors duration-200 py-2"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
