'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  X,
  Heart,
  Star,
  Info,
  MapPin,
  Briefcase,
  Sparkles,
  Calendar,
  Utensils,
  Moon,
  PawPrint,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Profile, FlatmatePreferences, calculateFlatmateCompatibility } from '@flatmate/shared';
import { formatINR, formatDiet, formatSleepSchedule, getCompatibilityBadgeClass } from '@/lib/utils/formatters';

interface SwipeCardDeckProps {
  candidates: { profile: Profile; preferences: FlatmatePreferences }[];
  currentUserPrefs: FlatmatePreferences | null;
  onSwipe: (targetUserId: string, direction: 'left' | 'right' | 'superlike') => void;
  onInspect: (profile: Profile, preferences: FlatmatePreferences) => void;
}

export const SwipeCardDeck: React.FC<SwipeCardDeckProps> = ({
  candidates,
  currentUserPrefs,
  onSwipe,
  onInspect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeCandidate = candidates[currentIndex];

  const handleSwipeAction = (direction: 'left' | 'right' | 'superlike') => {
    if (!activeCandidate) return;
    onSwipe(activeCandidate.profile.id, direction);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= candidates.length || !activeCandidate) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-md mx-auto shadow-subtle">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">You&apos;re All Caught Up!</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          You&apos;ve reviewed all available flatmate seekers in this city. Adjust your filters or browse candidate profiles in list view.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
        >
          Reset and review deck again
        </button>
      </div>
    );
  }

  const { profile, preferences } = activeCandidate;

  // Calculate compatibility using deterministic engine
  const compatibility = currentUserPrefs
    ? calculateFlatmateCompatibility(currentUserPrefs, preferences)
    : { overallScore: 88, tier: 'high' as const, highlights: ['Same city search'], potentialConflicts: [], breakdown: {} as any };

  const badge = getCompatibilityBadgeClass(compatibility.overallScore);

  return (
    <div className="max-w-md mx-auto relative flex flex-col items-center">
      {/* Top Stack Counter */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-3 px-2">
        <span className="font-medium">
          {currentIndex + 1} of {candidates.length} potential flatmates
        </span>
        <button
          onClick={() => onInspect(profile, preferences)}
          className="text-brand-600 hover:underline flex items-center gap-1 font-semibold"
        >
          <Info className="w-3.5 h-3.5" />
          Full Breakdown
        </button>
      </div>

      {/* Main Interactive Card */}
      <div className="relative w-full aspect-[3/4] max-h-[580px] rounded-3xl overflow-hidden shadow-floating border border-slate-200 bg-slate-950 select-none">
        {/* Background photo */}
        <img
          src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'}
          alt={profile.full_name}
          className="w-full h-full object-cover"
        />

        {/* Top Floating Match Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-white font-bold text-xs">
              {compatibility.overallScore}% Compatibility
            </span>
          </div>
        </div>

        {/* Verification Pill */}
        {profile.is_verified && (
          <div className="absolute top-4 right-4 z-20 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ID Verified</span>
          </div>
        )}

        {/* Bottom Dark Gradient Info Area */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white z-10">
          <div className="space-y-2">
            {/* Name, Age, Occupation */}
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {profile.full_name}
              </h2>
              {profile.age && <span className="text-xl text-slate-300 font-normal">, {profile.age}</span>}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Briefcase className="w-3.5 h-3.5 text-brand-300 shrink-0" />
              <span>{profile.occupation || 'Working Professional'}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-brand-300 shrink-0" />
              <span>{profile.city}</span>
            </div>

            {/* Target localities */}
            <div className="flex flex-wrap gap-1 text-[11px]">
              {preferences.preferred_localities.slice(0, 3).map((loc) => (
                <span
                  key={loc}
                  className="bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium text-slate-100"
                >
                  📍 {loc}
                </span>
              ))}
            </div>

            {/* Budget & Move-in */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/15">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Budget Range</span>
                <span className="font-bold text-white">
                  {formatINR(preferences.budget_min)} - {formatINR(preferences.budget_max)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Move-In Target</span>
                <span className="font-medium text-slate-200">{preferences.target_move_date}</span>
              </div>
            </div>

            {/* Lifestyle Highlights Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="bg-slate-900/80 border border-white/10 text-[10px] px-2 py-0.5 rounded-full text-slate-200">
                🧹 Cleanliness {preferences.cleanliness_level}/5
              </span>
              <span className="bg-slate-900/80 border border-white/10 text-[10px] px-2 py-0.5 rounded-full text-slate-200">
                🥗 {formatDiet(preferences.food_preference)}
              </span>
              <span className="bg-slate-900/80 border border-white/10 text-[10px] px-2 py-0.5 rounded-full text-slate-200">
                🌙 {preferences.sleep_schedule === 'night_owl' ? 'Night Owl' : preferences.sleep_schedule === 'early_bird' ? 'Early Bird' : 'Flexible Sleep'}
              </span>
            </div>

            {/* Top Match Highlight */}
            {compatibility.highlights[0] && (
              <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-xl p-2 text-xs text-emerald-200 flex items-center gap-1.5 mt-1">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{compatibility.highlights[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swipe Action Controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {/* Pass Button */}
        <button
          onClick={() => handleSwipeAction('left')}
          className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-card flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:border-rose-200 active:scale-95 transition-all"
          aria-label="Pass"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Superlike Button */}
        <button
          onClick={() => handleSwipeAction('superlike')}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-card flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:border-sky-200 active:scale-95 transition-all"
          aria-label="Superlike"
        >
          <Star className="w-5 h-5 fill-sky-500" />
        </button>

        {/* Like Button */}
        <button
          onClick={() => handleSwipeAction('right')}
          className="w-16 h-16 rounded-full bg-emerald-500 shadow-floating flex items-center justify-center text-white hover:bg-emerald-600 active:scale-95 transition-all"
          aria-label="Like"
        >
          <Heart className="w-8 h-8 fill-white" />
        </button>

        {/* Inspect Details Button */}
        <button
          onClick={() => onInspect(profile, preferences)}
          className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-card flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
          aria-label="Inspect details"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
