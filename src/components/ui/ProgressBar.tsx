'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'from-brand-500 to-brand-400',
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-dark-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-medium text-dark-300">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-white/5 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', color)}
        />
      </div>
    </div>
  );
}
