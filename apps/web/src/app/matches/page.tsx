'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Check,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/formatters';

export default function MatchesPage() {
  const router = useRouter();
  const { matches, currentUser, getOrCreateConversation } = useAuth();

  const handleOpenChat = (userId: string) => {
    getOrCreateConversation(userId);
    router.push('/messages');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-rose-200/60">
          <Heart className="w-3.5 h-3.5 fill-rose-600" />
          <span>Mutual Connections</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Mutual Matches
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          These flatmate seekers liked your profile too! Reach out to introduce yourself and plan visits together.
        </p>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => {
            const user = match.matched_user;
            if (!user) return null;

            return (
              <div
                key={match.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle hover:shadow-card transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar_url || ''}
                        alt={user.full_name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 text-lg">
                            {user.full_name}
                          </h3>
                          {user.age && (
                            <span className="text-sm text-slate-400 font-normal">
                              , {user.age}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {user.occupation} • {user.city}
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                      {match.compatibility_score}% Match
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed line-clamp-2">
                    {user.bio}
                  </p>

                  {user.preferences && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>Target Localities:</span>
                      <strong className="text-slate-800">
                        {user.preferences.preferred_localities.slice(0, 2).join(', ')}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link href={`/flatmates/${user.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenChat(user.id)}
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    Open Chat
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-subtle">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Matches Yet</h3>
          <p className="text-xs text-slate-500 mb-6">
            Keep swiping on the flatmate deck! When someone you liked swipes right on your profile, they will appear here.
          </p>
          <Link href="/flatmates">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Discover Flatmates
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
