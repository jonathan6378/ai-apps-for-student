import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudyGenie - AI-Powered Student Productivity Platform',
  description: 'Simplify notes, generate assignments, plan study schedules, and ace your exams with AI. The ultimate productivity platform for students.',
  keywords: ['AI study', 'notes simplifier', 'assignment writer', 'study planner', 'student productivity', 'exam prep'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-950 text-dark-50 overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-cyan rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-pink rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow animation-delay-4000" />
        </div>
        {children}
      </body>
    </html>
  );
}
