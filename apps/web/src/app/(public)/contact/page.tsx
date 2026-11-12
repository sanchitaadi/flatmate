'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact NestMate Trust &amp; Safety
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Need assistance with verification, owner onboarding, or report escalation? Reach out to our team in Bangalore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Headquarters</h2>
          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span>
                NestMate Technologies India Pvt Ltd<br />
                80 Feet Road, Koramangala 4th Block,<br />
                Bangalore, Karnataka 560034
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-600 shrink-0" />
              <span>support@nestmate.in</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-600 shrink-0" />
              <span>+91 80 4900 1234 (Mon-Sat, 9 AM - 7 PM)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-subtle">
          {submitted ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-bold text-slate-900">Message Delivered</h3>
              <p className="text-xs text-slate-500">We will respond within 2-4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input type="text" required placeholder="Name" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input type="email" required placeholder="name@example.com" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <textarea rows={3} required placeholder="How can we help?" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs" />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                Send Inquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
