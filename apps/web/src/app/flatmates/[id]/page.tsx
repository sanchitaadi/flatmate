'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Briefcase,
  Heart,
  MessageSquare,
  Sparkles,
  Utensils,
  Moon,
  PawPrint,
  Clock,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { formatINR, formatDiet, formatSleepSchedule } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { CompatibilityBreakdownView } from '@/components/flatmate/CompatibilityBreakdownView';
import { calculateFlatmateCompatibility, FlatmatePreferences } from '@flatmate/shared';

export default function FlatmateProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { allProfiles, currentPreferences, recordSwipe, getOrCreateConversation } = useAuth();

  const candidate = allProfiles.find((p) => p.id === id) || allProfiles[1];

  const candidatePrefs: FlatmatePreferences = {
    id: `p-${candidate.id}`,
    user_id: candidate.id,
    budget_min: 17000,
    budget_max: 28000,
    target_city: candidate.city,
    preferred_localities: ['Koramangala', 'Indiranagar', 'HSR Layout'],
    target_move_date: '2026-11-28',
    sleep_schedule: 'night_owl',
    cleanliness_level: 5,
    food_preference: 'vegetarian',
    smoking_preference: 'non_smoker',
    drinking_preference: 'social_drinker',
    party_habits: 'rarely',
    work_style: 'work_from_home',
    allows_pets: true,
    has_pets: false,
    gender_preference: 'female_only',
    created_at: '',
    updated_at: '',
  };

  const compatibility = currentPreferences
    ? calculateFlatmateCompatibility(currentPreferences, candidatePrefs)
    : null;

  const handleConnect = () => {
    recordSwipe(candidate.id, 'right');
    const convId = getOrCreateConversation(candidate.id);
    router.push('/messages');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/flatmates"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Flatmates</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={candidate.avatar_url || ''}
          alt={candidate.full_name}
          className="w-28 h-28 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md shrink-0"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {candidate.full_name}
            </h1>
            {candidate.age && <span className="text-xl text-slate-400 font-normal">, {candidate.age}</span>}
            {candidate.is_verified && (
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Seeker
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-brand-600" />
              {candidate.occupation || 'Working Professional'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              {candidate.city}, {candidate.state}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-xl italic pt-2">
            &ldquo;{candidate.bio}&rdquo;
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={handleConnect}
              leftIcon={<Heart className="w-4 h-4 fill-white" />}
            >
              Like &amp; Connect
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const convId = getOrCreateConversation(candidate.id);
                router.push('/messages');
              }}
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Compatibility Analysis Engine */}
      {compatibility && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Compatibility Breakdown with You</span>
          </h2>
          <CompatibilityBreakdownView result={compatibility} />
        </div>
      )}

      {/* Lifestyle Details Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-slate-900">Co-Living Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Target Budget</span>
            <span className="font-bold text-slate-800">
              {formatINR(candidatePrefs.budget_min)} - {formatINR(candidatePrefs.budget_max)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Sleep Schedule</span>
            <span className="font-bold text-slate-800">
              {formatSleepSchedule(candidatePrefs.sleep_schedule)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Dietary Habit</span>
            <span className="font-bold text-slate-800">
              {formatDiet(candidatePrefs.food_preference)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Cleanliness Level</span>
            <span className="font-bold text-slate-800">
              {candidatePrefs.cleanliness_level} / 5 (Meticulous)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Smoking Preference</span>
            <span className="font-bold text-slate-800 capitalize">
              {candidatePrefs.smoking_preference.replace('_', ' ')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500">Pet Mindset</span>
            <span className="font-bold text-slate-800">
              {candidatePrefs.allows_pets ? 'Pet Friendly' : 'Prefers Pet-Free'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
