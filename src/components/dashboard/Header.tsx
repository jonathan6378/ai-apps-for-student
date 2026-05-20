'use client';

import { motion } from 'framer-motion';
import { getGreeting } from '@/lib/utils';
import { useUserStore } from '@/lib/store';

export function Header() {
  const { user } = useUserStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {getGreeting()}, {user.name}! 👋
        </h1>
        <p className="text-dark-400 text-sm mt-1">
          Ready to crush your study goals today?
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold text-orange-400">{user.streak} day streak</span>
        </div>
        {/* XP badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-bold text-brand-400">{user.xp.toLocaleString()} XP</span>
        </div>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center text-xl">
          {user.avatar}
        </div>
      </div>
    </motion.header>
  );
}
