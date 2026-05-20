'use client';

import { Sidebar, MobileNav } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
