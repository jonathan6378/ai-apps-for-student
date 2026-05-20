'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-pink/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-cyan/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8"
        >
          <span className="animate-pulse w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm font-medium text-brand-300">
            Trusted by 50,000+ students across India
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Study Smarter with</span>
          <br />
          <span className="gradient-text">AI Superpowers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto mb-10 text-balance"
        >
          Simplify notes, generate assignments, plan study schedules, and ace your exams. 
          The ultimate AI productivity platform for students who want to learn faster.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/dashboard" className="btn-primary text-lg !px-8 !py-4 !rounded-2xl group">
            Start Learning Free
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a href="#features" className="btn-secondary text-lg !px-8 !py-4 !rounded-2xl">
            See How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Active Students' },
            { value: '2M+', label: 'Notes Simplified' },
            { value: '500K+', label: 'Assignments Generated' },
            { value: '4.9★', label: 'App Rating' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass-card !p-4 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-dark-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="glass-card !p-1 !rounded-3xl overflow-hidden border-brand-500/20 shadow-2xl shadow-brand-500/10">
            <div className="bg-dark-900 rounded-[22px] p-6 sm:p-8">
              {/* Mock dashboard preview */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-dark-400 ml-4">studygenie.ai/dashboard</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card !p-4">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-semibold text-white">Notes Simplified</div>
                  <div className="text-2xl font-bold gradient-text mt-1">247</div>
                </div>
                <div className="glass-card !p-4">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-sm font-semibold text-white">Study Streak</div>
                  <div className="text-2xl font-bold gradient-text mt-1">12 Days</div>
                </div>
                <div className="glass-card !p-4">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-semibold text-white">XP Earned</div>
                  <div className="text-2xl font-bold gradient-text mt-1">2,450</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
