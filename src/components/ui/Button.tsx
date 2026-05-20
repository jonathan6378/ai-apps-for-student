'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40',
    secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20',
    ghost: 'text-dark-300 hover:text-white hover:bg-white/10',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        'font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'opacity-75 cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  );
}
