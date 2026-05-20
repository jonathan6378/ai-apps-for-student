'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <span className="text-xl font-bold gradient-text">StudyGenie</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#pricing" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">Pricing</a>
            <a href="#testimonials" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">Reviews</a>
            <a href="#faq" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="btn-ghost text-sm">Log In</Link>
            <Link href="/dashboard" className="btn-primary text-sm !px-5 !py-2">
              Get Started Free
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-3"
        >
          <a href="#features" className="block text-dark-300 hover:text-white py-2">Features</a>
          <a href="#pricing" className="block text-dark-300 hover:text-white py-2">Pricing</a>
          <a href="#testimonials" className="block text-dark-300 hover:text-white py-2">Reviews</a>
          <Link href="/dashboard" className="btn-primary block text-center mt-4">Get Started Free</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
