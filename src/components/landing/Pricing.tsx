'use client';

import { motion } from 'framer-motion';
import { PRICING_PLANS } from '@/lib/constants';
import Link from 'next/link';

export function Pricing() {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Simple, <span className="gradient-text">Student-Friendly</span> Pricing
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you need more. Special discounts for students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card !p-8 relative ${
                plan.popular ? 'border-brand-500/50 scale-105 shadow-2xl shadow-brand-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-accent-pink rounded-full text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-dark-400 text-sm">/{plan.period}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
