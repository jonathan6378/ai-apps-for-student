'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/lib/store';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ACHIEVEMENTS } from '@/lib/constants';

export default function ProfilePage() {
  const { user } = useUserStore();
  const xpForNextLevel = 500;
  const currentLevelXP = user.xp % xpForNextLevel;

  const stats = [
    { label: 'Notes Simplified', value: user.totalNotes, icon: '📝' },
    { label: 'Assignments Written', value: user.totalAssignments, icon: '✍️' },
    { label: 'Study Hours', value: `${user.totalStudyHours}h`, icon: '⏱️' },
    { label: 'Day Streak', value: user.streak, icon: '🔥' },
    { label: 'Total XP', value: user.xp.toLocaleString(), icon: '⚡' },
    { label: 'Quizzes Taken', value: 34, icon: '❓' },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">👤</span> Profile
        </h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card !p-8 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center text-4xl shadow-xl shadow-brand-500/20">
              {user.avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border-2 border-brand-500 flex items-center justify-center text-xs font-bold text-brand-400">
              {user.level}
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-dark-400 text-sm">{user.email}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 justify-center sm:justify-start">
              <span className="text-xs px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 font-medium">
                Pro Member ✨
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300">
                🔥 {user.streak} day streak
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300">
                Level {user.level} Scholar
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">{user.xp.toLocaleString()}</div>
            <div className="text-xs text-dark-400">Total XP</div>
          </div>
        </div>

        {/* Level progress */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-400">Level {user.level} → Level {user.level + 1}</span>
            <span className="text-sm font-medium text-brand-400">{currentLevelXP}/{xpForNextLevel} XP</span>
          </div>
          <ProgressBar value={currentLevelXP} max={xpForNextLevel} color="from-brand-500 to-accent-pink" size="md" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="glass-card !p-4 text-center">
            <span className="text-2xl block mb-2">{stat.icon}</span>
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-xs text-dark-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card !p-6"
      >
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span>🏆</span> Achievements
          <span className="text-xs text-dark-400 font-normal ml-2">
            {user.achievements.length}/{ACHIEVEMENTS.length} unlocked
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = user.achievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border transition-all ${
                  unlocked
                    ? 'bg-brand-500/5 border-brand-500/20'
                    : 'bg-white/2 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{achievement.title}</p>
                    <p className="text-xs text-dark-400">{achievement.description}</p>
                    <p className="text-xs text-brand-400 font-medium mt-1">+{achievement.xp} XP</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
