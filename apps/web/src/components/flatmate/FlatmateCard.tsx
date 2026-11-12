'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Utensils,
  Moon,
} from 'lucide-react';
import { Profile, FlatmatePreferences, calculateFlatmateCompatibility } from '@flatmate/shared';
import { formatINR, formatDiet, getCompatibilityBadgeClass } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

interface FlatmateCardProps {
  profile: Profile;
  preferences: FlatmatePreferences;
  currentUserPrefs: FlatmatePreferences | null;
  onLike?: (profileId: string) => void;
}

export const FlatmateCard: React.FC<FlatmateCardProps> = ({
  profile,
  preferences,
  currentUserPrefs,
  onLike,
}) => {
  const compatibility = currentUserPrefs
    ? calculateFlatmateCompatibility(currentUserPrefs, preferences)
    : { overallScore: 88, highlights: ['Same city match'] };

  const badge = getCompatibilityBadgeClass(compatibility.overallScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle hover:shadow-card transition-all flex flex-col overflow-hidden">
      {/* Top Banner & Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'}
          alt={profile.full_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${badge.bg} ${badge.border}`}>
            {compatibility.overallScore}% Match
          </span>
          {profile.is_verified && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg leading-tight flex items-baseline gap-1.5">
            {profile.full_name}
            {profile.age && <span className="text-sm text-slate-300 font-normal">, {profile.age}</span>}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-0.5">
            <Briefcase className="w-3 h-3 text-brand-300 shrink-0" />
            <span className="truncate">{profile.occupation || 'Professional'}</span>
          </div>
        </div>
      </div>

      {/* Body details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Localities */}
          <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">{profile.city}</span>
              <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                {preferences.preferred_localities.join(', ')}
              </div>
            </div>
          </div>

          {/* Budget Range */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-xs my-2">
            <span className="text-slate-500">Budget Range</span>
            <span className="font-bold text-slate-800">
              {formatINR(preferences.budget_min)} - {formatINR(preferences.budget_max)}
            </span>
          </div>

          {/* Lifestyle Chips */}
          <div className="flex flex-wrap gap-1 mt-2 text-[11px] text-slate-600">
            <span className="bg-slate-100 px-2 py-0.5 rounded-md">
              🥗 {formatDiet(preferences.food_preference)}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-md">
              🌙 {preferences.sleep_schedule === 'night_owl' ? 'Night Owl' : preferences.sleep_schedule === 'early_bird' ? 'Early Bird' : 'Flexible'}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-md">
              🧹 Cleanliness {preferences.cleanliness_level}/5
            </span>
          </div>

          {/* Highlights line */}
          {compatibility.highlights[0] && (
            <div className="text-[11px] text-emerald-700 bg-emerald-50 rounded-lg p-2 mt-3 border border-emerald-100/60 truncate">
              ✓ {compatibility.highlights[0]}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link href={`/flatmates/${profile.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3 h-3" />}>
              Profile
            </Button>
          </Link>

          {onLike && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onLike(profile.id)}
              leftIcon={<Heart className="w-3.5 h-3.5 fill-white" />}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
