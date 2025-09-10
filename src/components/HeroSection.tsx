'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, TrendingUp, Brain, Dna, Microscope } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Dark Background */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000000' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(217, 70, 239, 0.1)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>

      {/* Floating Scientific Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)' }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain className="w-8 h-8" style={{ color: '#38bdf8' }} />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(217, 70, 239, 0.2)' }}
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -360]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Dna className="w-6 h-6" style={{ color: '#e879f9' }} />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
          animate={{ 
            x: [0, 10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Microscope className="w-7 h-7" style={{ color: '#4ade80' }} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-4xl lg:text-6xl font-bold leading-tight"
                style={{ color: '#ffffff' }}
              >
                Welcome to{' '}
                <div className="inline-flex items-center gap-3 lg:gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="w-14 h-14 lg:w-18 lg:h-18 rounded-lg bg-black p-1.5 shadow-2xl border-2 border-gray-500 hover:border-blue-400 transition-all duration-300"
                  >
                    <Image
                      src="/logo.svg?v=8"
                      alt="Nurtal Logo"
                      width={72}
                      height={72}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span style={{ background: 'linear-gradient(to right, #38bdf8, #e879f9, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Nurtal Biotechnologies
                  </span>
                </div>{' '}
                News
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl lg:text-2xl leading-relaxed font-light"
                style={{ color: '#e2e8f0' }}
              >
                Your premier destination for cutting-edge biotechnology and AI news. 
                Stay ahead with breakthrough discoveries, innovative research, and the latest 
                developments shaping the future of science and technology.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href="/articles"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(to right, #0ea5e9, #d946ef)',
                    color: '#ffffff'
                  }}
                >
                  <span>Explore Articles</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/articles"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-300 hover:bg-white/10"
                  style={{ 
                    borderColor: '#38bdf8', 
                    color: '#38bdf8' 
                  }}
                >
                  <Play className="mr-2 w-5 h-5" />
                  <span>Latest Research</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex items-center space-x-8 pt-8"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" style={{ color: '#4ade80' }} />
                  <span className="text-gray-300 font-medium">50k+ Readers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" style={{ color: '#38bdf8' }} />
                  <span className="text-gray-300 font-medium">AI-Powered Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dna className="w-5 h-5" style={{ color: '#e879f9' }} />
                  <span className="text-gray-300 font-medium">Daily Updates</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                    alt="Advanced biotechnology laboratory with AI-powered drug discovery equipment, featuring sophisticated molecular analysis screens and robotic systems working on pharmaceutical research"
                    width={800}
                    height={600}
                    className="object-cover"
                    style={{ border: '2px solid #333333' }}
                    priority
                  />
                  {/* Elegant overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-cyan-500/30"></div>
                  
                  {/* Floating info badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-white text-sm font-medium">AI Research Active</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-2 border-blue-400/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border-2 border-purple-400/50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
