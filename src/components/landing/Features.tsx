'use client';

import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';

const featureIcons: Record<string, string> = {
  notes: '📝',
  assignments: '✍️',
  planner: '📅',
  tutor: '🤖',
};

const detailedFeatures = [
  {
    category: 'AI Notes Simplifier',
    items: ['PDF & Image Upload', 'OCR for Handwritten Notes', 'Bullet Summaries', 'Flashcard Generation', 'Mind Maps', 'Multi-language Support'],
  },
  {
    category: 'AI Assignment Writer',
    items: ['Human-like Writing', 'Auto Citations', 'Export PDF/DOCX/PPT', 'Plagiarism Reduction', 'Multiple Tones', 'Grammar Enhancement'],
  },
  {
    category: 'AI Study Planner',
    items: ['Smart Timetables', 'Pomodoro Timer', 'Progress Tracking', 'Adaptive Schedules', 'Burnout Prevention', 'Exam Countdown'],
  },
  {
    category: 'AI Tutor Chat',
    items: ['Doubt Solving', 'Step-by-Step Solutions', 'Voice Interaction', 'Concept Explanations', 'Quiz Generation', 'Multi-language Chat'],
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding relative">
      <div className="container-width">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Features</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Everything You Need to <span className="gradient-text">Ace Your Exams</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Four powerful AI tools designed specifically for students. From simplifying notes to planning your entire semester.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card !p-8 group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{featureIcons[feature.id]}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-dark-400 mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {detailedFeatures[i]?.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-dark-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            How It Works — <span className="gradient-text">3 Simple Steps</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Upload or Type', desc: 'Paste notes, upload PDFs, or snap photos of handwritten content.', icon: '📤' },
            { step: '2', title: 'AI Processes', desc: 'Our AI analyzes, simplifies, and structures your content in seconds.', icon: '⚡' },
            { step: '3', title: 'Learn & Excel', desc: 'Get summaries, flashcards, plans, and ace your exams effortlessly.', icon: '🎯' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-pink/20 border border-brand-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-sm font-bold text-brand-400 mb-2">STEP {item.step}</div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-dark-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
