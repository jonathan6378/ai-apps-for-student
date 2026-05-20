'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/dashboard/Header';
import { useUserStore } from '@/lib/store';
import { usePlannerStore } from '@/lib/store';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';

const quickActions = [
  { href: '/dashboard/notes', icon: '📝', label: 'Simplify Notes', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
  { href: '/dashboard/assignments', icon: '✍️', label: 'Write Assignment', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
  { href: '/dashboard/planner', icon: '📅', label: 'Plan Study', color: 'from-orange-500/20 to-yellow-500/20', border: 'border-orange-500/30' },
  { href: '/dashboard/tutor', icon: '🤖', label: 'Ask AI Tutor', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
];

const recentActivity = [
  { icon: '📝', text: 'Simplified "Quantum Mechanics Ch.5"', time: '2 hours ago', xp: '+25 XP' },
  { icon: '✍️', text: 'Generated History assignment', time: '5 hours ago', xp: '+50 XP' },
  { icon: '📅', text: 'Completed 3 Pomodoro sessions', time: 'Yesterday', xp: '+75 XP' },
  { icon: '🤖', text: 'Asked 5 doubts to AI Tutor', time: 'Yesterday', xp: '+30 XP' },
  { icon: '🔥', text: 'Achieved 10-day study streak!', time: '2 days ago', xp: '+200 XP' },
];

export default function DashboardPage() {
  const { user } = useUserStore();
  const { tasks } = usePlannerStore();
  const todayTasks = tasks.filter((t) => !t.completed);
  const completedToday = tasks.filter((t) => t.completed).length;

  const xpForNextLevel = 500;
  const currentLevelXP = user.xp % xpForNextLevel;

  return (
    <div>
      <Header />

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="glass-card !p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📝</span>
            <span className="text-xs text-green-400 font-medium">+12 this week</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.totalNotes}</p>
          <p className="text-xs text-dark-400 mt-1">Notes Simplified</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">✍️</span>
            <span className="text-xs text-green-400 font-medium">+5 this week</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.totalAssignments}</p>
          <p className="text-xs text-dark-400 mt-1">Assignments Written</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">⏱️</span>
            <span className="text-xs text-green-400 font-medium">+8h this week</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.totalStudyHours}h</p>
          <p className="text-xs text-dark-400 mt-1">Study Hours</p>
        </div>
        <div className="glass-card !p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">🏆</span>
            <span className="text-xs text-brand-400 font-medium">Level {user.level}</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.xp.toLocaleString()}</p>
          <p className="text-xs text-dark-400 mt-1">Total XP</p>
        </div>
      </motion.div>

      {/* Level Progress + Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
      >
        {/* Level progress */}
        <div className="glass-card !p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Level Progress</h3>
            <span className="text-sm font-bold gradient-text">Level {user.level}</span>
          </div>
          <ProgressBar
            value={currentLevelXP}
            max={xpForNextLevel}
            color="from-brand-500 to-accent-pink"
            size="lg"
            showValue
          />
          <p className="text-xs text-dark-400 mt-2">
            {xpForNextLevel - currentLevelXP} XP to Level {user.level + 1}
          </p>
          {/* Achievements preview */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <span className="text-xs text-dark-400">Achievements:</span>
            <div className="flex gap-1">
              {['📝', '🔥', '✍️', '🏆', '⚡'].map((emoji, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                    i < 3 ? 'bg-brand-500/20' : 'bg-white/5 opacity-40'
                  }`}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-xs text-dark-500 ml-auto">3/8 unlocked</span>
          </div>
        </div>

        {/* Streak calendar */}
        <div className="glass-card !p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Study Streak</h3>
            <span className="text-sm font-bold text-orange-400">🔥 {user.streak} days</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => {
              const isActive = i >= 28 - user.streak;
              const isToday = i === 27;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center text-[10px] ${
                    isToday
                      ? 'bg-orange-500 text-white font-bold ring-2 ring-orange-500/50'
                      : isActive
                      ? 'bg-orange-500/30 text-orange-300'
                      : 'bg-white/5 text-dark-600'
                  }`}
                >
                  {isActive && '🔥'}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-dark-400 mt-3">
            Keep it going! Study today to maintain your streak.
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`glass-card !p-5 text-center bg-gradient-to-br ${action.color} ${action.border}`}
              >
                <span className="text-3xl block mb-2">{action.icon}</span>
                <span className="text-sm font-medium text-white">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Today's Tasks + Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Today's Tasks */}
        <div className="glass-card !p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Today&apos;s Tasks</h3>
            <span className="text-xs text-dark-400">{completedToday}/{tasks.length} done</span>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  task.completed ? 'bg-green-500/5 border border-green-500/10' : 'bg-white/5 border border-white/5'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    task.completed
                      ? 'border-green-500 bg-green-500'
                      : 'border-dark-500'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.completed ? 'text-dark-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-dark-500">{task.subject} • {task.duration}min</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/planner" className="block text-center text-sm text-brand-400 font-medium mt-4 hover:text-brand-300">
            View All Tasks →
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="glass-card !p-6">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.text}</p>
                  <p className="text-xs text-dark-500">{activity.time}</p>
                </div>
                <span className="text-xs font-semibold text-green-400">{activity.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
