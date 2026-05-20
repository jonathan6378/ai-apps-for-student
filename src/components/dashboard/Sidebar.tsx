'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠', emoji: true },
  { href: '/dashboard/notes', label: 'Notes', icon: '📝', emoji: true },
  { href: '/dashboard/assignments', label: 'Assignments', icon: '✍️', emoji: true },
  { href: '/dashboard/planner', label: 'Planner', icon: '📅', emoji: true },
  { href: '/dashboard/tutor', label: 'AI Tutor', icon: '🤖', emoji: true },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤', emoji: true },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️', emoji: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 glass border-r border-white/5 p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 py-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center">
          <span className="text-lg">✨</span>
        </div>
        <span className="text-lg font-bold gradient-text">StudyGenie</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                isActive
                  ? 'text-white bg-brand-500/20 border border-brand-500/30'
                  : 'text-dark-400 hover:text-white hover:bg-white/5'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-brand-500/10 rounded-xl border border-brand-500/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-lg">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pro upgrade card */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-pink/20 border border-brand-500/30">
        <div className="text-sm font-semibold text-white mb-1">Upgrade to Pro</div>
        <p className="text-xs text-dark-400 mb-3">Unlock unlimited AI generations</p>
        <Link
          href="/dashboard/settings"
          className="block text-center text-xs font-semibold bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Upgrade Now
        </Link>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
                isActive ? 'text-brand-400 bg-brand-500/10' : 'text-dark-500'
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
