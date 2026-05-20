import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const sorted = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const prev = new Date(sorted[i + 1]);
    const diff = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getLevelFromXP(xp: number): number {
  let level = 1;
  let required = 100;
  while (xp >= required) {
    xp -= required;
    level++;
    required = Math.floor(100 * Math.pow(1.5, level - 1));
  }
  return level;
}
