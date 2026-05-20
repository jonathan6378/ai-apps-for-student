'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PRICING_PLANS } from '@/lib/constants';
import Link from 'next/link';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [language, setLanguage] = useState('English');
  const [aiModel, setAiModel] = useState('GPT-4');

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        value ? 'bg-brand-500' : 'bg-dark-600'
      }`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
        value ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">⚙️</span> Settings
        </h1>
        <p className="text-dark-400 text-sm mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card !p-6"
          >
            <h3 className="font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <Input label="Full Name" defaultValue="Student" />
              <Input label="Email" defaultValue="student@studygenie.ai" type="email" />
              <Input label="Phone (Optional)" placeholder="+91 98765 43210" />
              <Button variant="primary" size="md">Save Changes</Button>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card !p-6"
          >
            <h3 className="font-semibold text-white mb-4">Preferences</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Dark Mode</p>
                  <p className="text-xs text-dark-400">Use dark theme throughout the app</p>
                </div>
                <Toggle value={darkMode} onChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Push Notifications</p>
                  <p className="text-xs text-dark-400">Get notified about study reminders</p>
                </div>
                <Toggle value={notifications} onChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Study Reminders</p>
                  <p className="text-xs text-dark-400">Daily reminders to maintain streak</p>
                </div>
                <Toggle value={studyReminders} onChange={setStudyReminders} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Default Language</p>
                  <p className="text-xs text-dark-400">AI response language preference</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-dark-300 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">AI Model</p>
                  <p className="text-xs text-dark-400">Choose AI model for responses</p>
                </div>
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-dark-300 focus:outline-none"
                >
                  <option value="GPT-4">GPT-4 (Best)</option>
                  <option value="GPT-3.5">GPT-3.5 (Faster)</option>
                  <option value="Claude">Claude 3.5</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card !p-6 border-red-500/10"
          >
            <h3 className="font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <div>
                  <p className="text-sm font-medium text-white">Delete Account</p>
                  <p className="text-xs text-dark-400">Permanently delete your account and all data</p>
                </div>
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subscription panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card !p-6"
          >
            <h3 className="font-semibold text-white mb-4">Current Plan</h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-accent-pink/10 border border-brand-500/20 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white">Pro</span>
                <span className="text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-300">Active</span>
              </div>
              <p className="text-2xl font-bold text-white">$9.99<span className="text-sm text-dark-400 font-normal">/month</span></p>
              <p className="text-xs text-dark-400 mt-1">Renews on Feb 15, 2025</p>
            </div>
            <div className="space-y-2 mb-4">
              {['Unlimited AI generations', 'All export formats', 'Priority support', 'AI Tutor access'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-dark-300">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
            <Button variant="secondary" size="md" className="w-full">Manage Subscription</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card !p-6"
          >
            <h3 className="font-semibold text-white mb-3">Usage This Month</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-dark-400">AI Generations</span>
                  <span className="text-dark-300">∞ Unlimited</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan w-3/4" />
                </div>
                <p className="text-xs text-dark-500 mt-1">247 generations used</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-dark-400">Storage</span>
                  <span className="text-dark-300">1.2 GB / 10 GB</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 w-[12%]" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card !p-6"
          >
            <h3 className="font-semibold text-white mb-3">Refer & Earn</h3>
            <p className="text-xs text-dark-400 mb-3">Get 1 month free Pro for every friend who signs up!</p>
            <div className="flex gap-2">
              <input
                readOnly
                value="studygenie.ai/ref/student123"
                className="flex-1 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-dark-300"
              />
              <button className="text-xs px-3 py-2 rounded-lg bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 transition-colors font-medium">
                Copy
              </button>
            </div>
            <p className="text-xs text-dark-500 mt-2">3 referrals so far • 0 converted</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
