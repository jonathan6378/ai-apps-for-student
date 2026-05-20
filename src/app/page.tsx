'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { CTA, Footer } from '@/components/landing/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
