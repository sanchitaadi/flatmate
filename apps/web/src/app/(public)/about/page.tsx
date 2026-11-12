import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart, Users, Home, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Redefining How India Finds Flatmates &amp; Spaces
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          NestMate was built to solve the chaotic, unverified, and high-brokerage renting experience across Indian tech hubs like Bangalore, Mumbai, Gurgaon, Pune, and Hyderabad.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-subtle space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Why NestMate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              <span>Lifestyle-First Compatibility</span>
            </h3>
            <p>
              Moving in with someone is more than just sharing rent. It is about waking schedules, cleaning standards, food habits, and home hosting. Our deterministic matching engine calculates true compatibility before you reach out.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Zero-Spam &amp; Privacy First</span>
            </h3>
            <p>
              We protect your phone number, social profiles, and residential addresses until you explicitly approve contact sharing with a verified flatmate or verified owner.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/flatmates">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Flatmate Matching
          </Button>
        </Link>
      </div>
    </div>
  );
}
