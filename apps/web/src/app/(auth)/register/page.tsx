'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Mail, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { UserRole } from '@flatmate/shared';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [role, setRole] = useState<UserRole>('flatmate_seeker');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signup({
      email,
      full_name: fullName,
      city,
      state: city === 'Bangalore' ? 'Karnataka' : city === 'Mumbai' ? 'Maharashtra' : 'Haryana',
      role,
    });
    setIsLoading(false);
    if (role === 'property_owner' || role === 'property_agent') {
      router.push('/owner');
    } else {
      router.push('/profile/preferences');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-subtle space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Your NestMate Account
          </h1>
          <p className="text-xs text-slate-500">
            One account for verified flatmate discovery and rental property listings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Account Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Primary Role:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setRole('flatmate_seeker')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'flatmate_seeker'
                    ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 font-bold text-brand-900'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Flatmate Seeker</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">Looking for co-living flatmates</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('solo_renter')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'solo_renter'
                    ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 font-bold text-brand-900'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Solo Renter</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">Renting private room or whole flat</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('property_owner')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'property_owner'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 font-bold text-amber-900'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Property Owner</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">Post and manage property listings</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('property_agent')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  role === 'property_agent'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 font-bold text-indigo-900'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>Authorized Agent</div>
                <div className="text-[10px] text-slate-500 font-normal mt-0.5">RERA certified property manager</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Ananya Iyer"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Base City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                {['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
            Create Free Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
