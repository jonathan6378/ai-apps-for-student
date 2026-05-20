'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: string;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, glow = false, gradient, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'glass-card p-6 relative overflow-hidden',
        glow && 'glow-effect',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {gradient && (
        <div className={cn('absolute inset-0 opacity-10 bg-gradient-to-br', gradient)} />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  color = 'from-brand-500 to-brand-600',
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {trend}
            </p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', color)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
