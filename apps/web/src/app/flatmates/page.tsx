'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  Filter,
  MapPin,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Profile, FlatmatePreferences, Match } from '@flatmate/shared';
import { SwipeCardDeck } from '@/components/flatmate/SwipeCardDeck';
import { FlatmateCard } from '@/components/flatmate/FlatmateCard';
import { MatchModal } from '@/components/flatmate/MatchModal';
import { CompatibilityBreakdownView } from '@/components/flatmate/CompatibilityBreakdownView';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { calculateFlatmateCompatibility } from '@flatmate/shared';

function FlatmatesContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || 'All Cities';

  const {
    allProfiles,
    currentUser,
    currentPreferences,
    swipedUserIds,
    recordSwipe,
  } = useAuth();

  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [dietFilter, setDietFilter] = useState('all');
  const [matchedPopup, setMatchedPopup] = useState<Match | null>(null);

  // Inspector modal state
  const [inspectedCandidate, setInspectedCandidate] = useState<{
    profile: Profile;
    preferences: FlatmatePreferences;
  } | null>(null);

  // Filter candidate profiles
  const candidates = useMemo(() => {
    return allProfiles
      .filter((p) => {
        // Exclude current user
        if (currentUser && p.id === currentUser.id) return false;
        // Exclude suspended
        if (p.is_suspended) return false;
        // Must be flatmate seekers
        if (p.active_role !== 'flatmate_seeker') return false;
        // City filter
        if (selectedCity !== 'All Cities' && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
        return true;
      })
      .map((profile) => {
        // Mock preference mapping
        const prefs: FlatmatePreferences = {
          id: `pref-${profile.id}`,
          user_id: profile.id,
          budget_min: profile.city === 'Mumbai' ? 30000 : 16000,
          budget_max: profile.city === 'Mumbai' ? 50000 : 28000,
          target_city: profile.city,
          preferred_localities:
            profile.city === 'Bangalore'
              ? ['Koramangala', 'Indiranagar', 'HSR Layout']
              : profile.city === 'Mumbai'
              ? ['Bandra West', 'Khar']
              : ['Cyber City', 'Golf Course Road'],
          target_move_date: '2026-11-28',
          sleep_schedule: profile.gender === 'female' ? 'night_owl' : 'flexible',
          cleanliness_level: 4,
          food_preference: profile.full_name.includes('Priya') || profile.full_name.includes('Ananya') ? 'vegetarian' : 'non_vegetarian',
          smoking_preference: 'non_smoker',
          drinking_preference: 'social_drinker',
          party_habits: 'rarely',
          work_style: 'hybrid',
          allows_pets: true,
          has_pets: profile.full_name.includes('Neha'),
          gender_preference: 'any',
          created_at: '',
          updated_at: '',
        };
        return { profile, preferences: prefs };
      });
  }, [allProfiles, currentUser, selectedCity]);

  // Candidates for swipe deck (exclude already swiped)
  const swipeCandidates = useMemo(() => {
    return candidates.filter((c) => !swipedUserIds.has(c.profile.id));
  }, [candidates, swipedUserIds]);

  const handleSwipe = (targetUserId: string, direction: 'left' | 'right' | 'superlike') => {
    const res = recordSwipe(targetUserId, direction);
    if (res.isMatch && res.match) {
      setMatchedPopup(res.match);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-brand-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compatibility Engine v1.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Compatible Flatmates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover flatmate seekers matched against your lifestyle, sleep schedule, and budget.
          </p>
        </div>

        {/* View Mode Toggle: Swipe Deck vs Browse Grid */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode('swipe')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'swipe'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Swipe Deck</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Browse Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* City Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {['All Cities', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              selectedCity === city
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* View Rendering */}
      {viewMode === 'swipe' ? (
        <div className="py-4">
          <SwipeCardDeck
            candidates={swipeCandidates}
            currentUserPrefs={currentPreferences}
            onSwipe={handleSwipe}
            onInspect={(p, pref) => setInspectedCandidate({ profile: p, preferences: pref })}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <FlatmateCard
              key={candidate.profile.id}
              profile={candidate.profile}
              preferences={candidate.preferences}
              currentUserPrefs={currentPreferences}
              onLike={(id) => handleSwipe(id, 'right')}
            />
          ))}
        </div>
      )}

      {/* Mutual Match Celebration Modal */}
      <MatchModal
        isOpen={!!matchedPopup}
        onClose={() => setMatchedPopup(null)}
        match={matchedPopup}
        currentUser={currentUser}
      />

      {/* Candidate Profile Inspector Modal */}
      <Modal
        isOpen={!!inspectedCandidate}
        onClose={() => setInspectedCandidate(null)}
        title={inspectedCandidate ? `${inspectedCandidate.profile.full_name}'s Compatibility` : ''}
        className="max-w-2xl"
      >
        {inspectedCandidate && currentPreferences && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={inspectedCandidate.profile.avatar_url || ''}
                alt=""
                className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {inspectedCandidate.profile.full_name}
                </h3>
                <p className="text-xs text-slate-500">
                  {inspectedCandidate.profile.occupation} • {inspectedCandidate.profile.city}
                </p>
                <p className="text-xs text-slate-600 mt-1 italic">
                  &ldquo;{inspectedCandidate.profile.bio}&rdquo;
                </p>
              </div>
            </div>

            <CompatibilityBreakdownView
              result={calculateFlatmateCompatibility(currentPreferences, inspectedCandidate.preferences)}
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  handleSwipe(inspectedCandidate.profile.id, 'right');
                  setInspectedCandidate(null);
                }}
                leftIcon={<Heart className="w-4 h-4 fill-white" />}
              >
                Like Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function FlatmatesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-400">Loading flatmate discovery...</div>}>
      <FlatmatesContent />
    </Suspense>
  );
}
