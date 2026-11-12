'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPersona } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleQuickDemoLogin = (userId: string) => {
    switchPersona(userId);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-subtle space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign in to NestMate
          </h1>
          <p className="text-xs text-slate-500">
            Access your matches, property bookmarks and messages
          </p>
        </div>

        {/* 1-Click Test Persona Login */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-xs">
          <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
            ⚡ Instant Founder / Demo Test Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('a0000000-0000-0000-0000-000000000001')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-left hover:border-brand-500 transition-colors"
            >
              <strong className="block text-slate-900">Aarav S.</strong>
              <span className="text-[10px] text-slate-500">Flatmate Seeker</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('a0000000-0000-0000-0000-000000000007')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-left hover:border-brand-500 transition-colors"
            >
              <strong className="block text-slate-900">Rajesh M.</strong>
              <span className="text-[10px] text-slate-500">Property Owner</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('a0000000-0000-0000-0000-000000000009')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-left hover:border-brand-500 transition-colors"
            >
              <strong className="block text-slate-900">Sunil J.</strong>
              <span className="text-[10px] text-slate-500">RERA Agent</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('a0000000-0000-0000-0000-000000000010')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-left hover:border-brand-500 transition-colors"
            >
              <strong className="block text-slate-900">SuperAdmin</strong>
              <span className="text-[10px] text-slate-500">Admin Controls</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
            Sign In to Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-semibold text-brand-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
