'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { usePlannerStore } from '@/lib/store';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const pomodoroDefault = { work: 25, break: 5, longBreak: 15 };

export default function PlannerPage() {
  const { tasks, toggleTask } = usePlannerStore();
  const [activeView, setActiveView] = useState<'tasks' | 'calendar' | 'pomodoro'>('tasks');
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(pomodoroDefault.work * 60);
  const [pomodoroPhase, setPomodoroPhase] = useState<'work' | 'break'>('work');

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalMinutes = tasks.reduce((acc, t) => acc + t.duration, 0);
  const completedMinutes = tasks.filter((t) => t.completed).reduce((acc, t) => acc + t.duration, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scheduleSlots = [
    { time: '6:00 AM', task: 'Morning Revision - Physics', subject: 'Physics', duration: 45 },
    { time: '7:00 AM', task: 'Break + Breakfast', subject: 'Break', duration: 30 },
    { time: '7:30 AM', task: 'Mathematics Practice', subject: 'Mathematics', duration: 60 },
    { time: '9:00 AM', task: 'Chemistry Organic Reactions', subject: 'Chemistry', duration: 45 },
    { time: '10:00 AM', task: 'Short Break', subject: 'Break', duration: 15 },
    { time: '10:15 AM', task: 'English Essay Writing', subject: 'English', duration: 45 },
    { time: '11:00 AM', task: 'History Chapter Review', subject: 'History', duration: 30 },
    { time: '12:00 PM', task: 'Lunch Break', subject: 'Break', duration: 60 },
    { time: '2:00 PM', task: 'Practice Problems - Math', subject: 'Mathematics', duration: 60 },
    { time: '3:00 PM', task: 'Physics Numericals', subject: 'Physics', duration: 45 },
  ];

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">📅</span> AI Study Planner
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            Smart schedules, Pomodoro timer, and progress tracking
          </p>
        </div>
        <Button variant="primary" size="md">
          + Create New Plan
        </Button>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      >
        <div className="glass-card !p-4 text-center">
          <p className="text-2xl font-bold text-white">{completedCount}/{tasks.length}</p>
          <p className="text-xs text-dark-400 mt-1">Tasks Done</p>
        </div>
        <div className="glass-card !p-4 text-center">
          <p className="text-2xl font-bold text-white">{completedMinutes}m</p>
          <p className="text-xs text-dark-400 mt-1">Study Time</p>
        </div>
        <div className="glass-card !p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">🔥 12</p>
          <p className="text-xs text-dark-400 mt-1">Day Streak</p>
        </div>
        <div className="glass-card !p-4 text-center">
          <p className="text-2xl font-bold text-green-400">87%</p>
          <p className="text-xs text-dark-400 mt-1">Productivity</p>
        </div>
      </motion.div>

      {/* View Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card !p-1 mb-6"
      >
        <div className="flex gap-1">
          {[
            { id: 'tasks' as const, label: 'Today\'s Tasks', icon: '✅' },
            { id: 'calendar' as const, label: 'Schedule', icon: '📅' },
            { id: 'pomodoro' as const, label: 'Pomodoro', icon: '🍅' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeView === tab.id
                  ? 'bg-brand-500/20 text-white border border-brand-500/30'
                  : 'text-dark-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeView === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task list */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">Today&apos;s Study Plan</h3>
                <span className="text-xs text-dark-400">{completedCount} of {tasks.length} completed</span>
              </div>
              <ProgressBar value={completedCount} max={tasks.length} color="from-green-500 to-emerald-400" size="sm" />
              <div className="space-y-2 mt-4">
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-green-500/5 border border-green-500/10'
                        : 'glass-card !rounded-xl'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      task.completed ? 'border-green-500 bg-green-500' : 'border-dark-500 hover:border-brand-500'
                    }`}>
                      {task.completed && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${task.completed ? 'text-dark-500 line-through' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-dark-500 mt-0.5">{task.subject} • {task.duration} min</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar stats */}
            <div className="space-y-4">
              <div className="glass-card !p-5">
                <h4 className="font-semibold text-white mb-3">📊 Weekly Overview</h4>
                <div className="space-y-2">
                  {weekDays.map((day, i) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-xs text-dark-400 w-8">{day}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-accent-cyan rounded-full"
                          style={{ width: `${[80, 65, 90, 45, 70, 55, 30][i]}%` }}
                        />
                      </div>
                      <span className="text-xs text-dark-500">{[4, 3, 5, 2, 3.5, 2.5, 1.5][i]}h</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card !p-5">
                <h4 className="font-semibold text-white mb-3">🎯 Focus Areas</h4>
                <div className="space-y-3">
                  {[
                    { subject: 'Mathematics', progress: 72, color: 'from-blue-500 to-cyan-500' },
                    { subject: 'Physics', progress: 58, color: 'from-purple-500 to-pink-500' },
                    { subject: 'Chemistry', progress: 45, color: 'from-orange-500 to-yellow-500' },
                  ].map((item) => (
                    <div key={item.subject}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-dark-300">{item.subject}</span>
                        <span className="text-dark-400">{item.progress}%</span>
                      </div>
                      <ProgressBar value={item.progress} max={100} color={item.color} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'calendar' && (
          <div className="glass-card !p-6">
            <h3 className="font-semibold text-white mb-4">Today&apos;s Schedule</h3>
            <div className="space-y-1">
              {scheduleSlots.map((slot, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    slot.subject === 'Break' ? 'opacity-60' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs text-dark-500 w-16 shrink-0 font-mono">{slot.time}</span>
                  <div className={`w-1 h-8 rounded-full ${
                    slot.subject === 'Mathematics' ? 'bg-blue-500' :
                    slot.subject === 'Physics' ? 'bg-purple-500' :
                    slot.subject === 'Chemistry' ? 'bg-orange-500' :
                    slot.subject === 'English' ? 'bg-green-500' :
                    slot.subject === 'History' ? 'bg-yellow-500' :
                    'bg-dark-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{slot.task}</p>
                    <p className="text-xs text-dark-500">{slot.duration} min</p>
                  </div>
                  {slot.subject !== 'Break' && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-dark-400">
                      {slot.subject}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'pomodoro' && (
          <div className="max-w-md mx-auto text-center">
            <div className="glass-card !p-8">
              {/* Timer circle */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - pomodoroTime / (pomodoroDefault.work * 60))}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white font-mono">
                    {formatTime(pomodoroTime)}
                  </span>
                  <span className="text-xs text-dark-400 mt-1 uppercase tracking-wider">
                    {pomodoroPhase === 'work' ? 'Focus Time' : 'Break Time'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={pomodoroActive ? 'danger' : 'primary'}
                  size="lg"
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                >
                  {pomodoroActive ? '⏸ Pause' : '▶️ Start Focus'}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setPomodoroActive(false);
                    setPomodoroTime(pomodoroDefault.work * 60);
                    setPomodoroPhase('work');
                  }}
                >
                  🔄 Reset
                </Button>
              </div>

              {/* Session info */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-lg font-bold text-white">4</p>
                  <p className="text-xs text-dark-400">Sessions Today</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-lg font-bold text-white">1h 40m</p>
                  <p className="text-xs text-dark-400">Focus Time</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-lg font-bold text-white">92%</p>
                  <p className="text-xs text-dark-400">Focus Rate</p>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 rounded-xl bg-brand-500/5 border border-brand-500/10 text-left">
                <p className="text-xs font-medium text-brand-300 mb-1">💡 AI Productivity Tip</p>
                <p className="text-xs text-dark-400">
                  You&apos;re most productive between 7-10 AM. Schedule difficult subjects during this window for optimal retention.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
