'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sliders,
  Check,
  Save,
  ArrowLeft,
  IndianRupee,
  MapPin,
  Calendar,
  Sparkles,
  Moon,
  Utensils,
  PawPrint,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { FlatmatePreferences } from '@flatmate/shared';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/formatters';

export default function PreferencesPage() {
  const router = useRouter();
  const { currentPreferences, updatePreferences, currentUser } = useAuth();

  const [targetCity, setTargetCity] = useState(currentPreferences?.target_city || 'Bangalore');
  const [preferredLocalities, setPreferredLocalities] = useState(
    currentPreferences?.preferred_localities.join(', ') || 'Koramangala, Indiranagar, HSR Layout'
  );
  const [budgetMin, setBudgetMin] = useState(currentPreferences?.budget_min || 18000);
  const [budgetMax, setBudgetMax] = useState(currentPreferences?.budget_max || 30000);
  const [targetMoveDate, setTargetMoveDate] = useState(currentPreferences?.target_move_date || '2026-11-25');
  const [sleepSchedule, setSleepSchedule] = useState(currentPreferences?.sleep_schedule || 'night_owl');
  const [cleanlinessLevel, setCleanlinessLevel] = useState(currentPreferences?.cleanliness_level || 4);
  const [foodPreference, setFoodPreference] = useState(currentPreferences?.food_preference || 'vegetarian');
  const [smokingPreference, setSmokingPreference] = useState(currentPreferences?.smoking_preference || 'non_smoker');
  const [drinkingPreference, setDrinkingPreference] = useState(currentPreferences?.drinking_preference || 'social_drinker');
  const [partyHabits, setPartyHabits] = useState(currentPreferences?.party_habits || 'weekends_only');
  const [workStyle, setWorkStyle] = useState(currentPreferences?.work_style || 'hybrid');
  const [allowsPets, setAllowsPets] = useState<boolean>(currentPreferences?.allows_pets ?? true);
  const [hasPets, setHasPets] = useState<boolean>(currentPreferences?.has_pets ?? false);
  const [genderPreference, setGenderPreference] = useState(currentPreferences?.gender_preference || 'any');
  const [aboutLivingStyle, setAboutLivingStyle] = useState(
    currentPreferences?.about_living_style || 'Work hard during week, love exploring cafes on weekends.'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      target_city: targetCity,
      preferred_localities: preferredLocalities.split(',').map((s) => s.trim()).filter(Boolean),
      budget_min: Number(budgetMin),
      budget_max: Number(budgetMax),
      target_move_date: targetMoveDate,
      sleep_schedule: sleepSchedule as any,
      cleanliness_level: Number(cleanlinessLevel),
      food_preference: foodPreference as any,
      smoking_preference: smokingPreference as any,
      drinking_preference: drinkingPreference as any,
      party_habits: partyHabits as any,
      work_style: workStyle as any,
      allows_pets: allowsPets,
      has_pets: hasPets,
      gender_preference: genderPreference as any,
      about_living_style: aboutLivingStyle,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-subtle">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Compatibility Calibration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Your Lifestyle &amp; Flatmate Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            These parameters feed directly into our mathematical matching engine to recommend compatible flatmates.
          </p>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>Your flatmate matching preferences have been saved and calibrated!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: City & Budget */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Location &amp; Rent Budget
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target City
                </label>
                <select
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  {['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Move-in Date
                </label>
                <input
                  type="date"
                  value={targetMoveDate}
                  onChange={(e) => setTargetMoveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Localities (comma-separated)
              </label>
              <input
                type="text"
                value={preferredLocalities}
                onChange={(e) => setPreferredLocalities(e.target.value)}
                placeholder="e.g. Koramangala, Indiranagar, HSR Layout"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Min Rent Budget (₹/mo)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Rent Budget (₹/mo)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Daily Rhythm & Cleanliness */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Sleep Rhythm &amp; Cleanliness
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sleep Schedule
                </label>
                <select
                  value={sleepSchedule}
                  onChange={(e) => setSleepSchedule(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="early_bird">Early Bird (Wakes up before 7 AM)</option>
                  <option value="night_owl">Night Owl (Active late night)</option>
                  <option value="flexible">Flexible / Shift-based</option>
                  <option value="standard">Standard (8 AM - 11 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cleanliness Standard: {cleanlinessLevel}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={cleanlinessLevel}
                  onChange={(e) => setCleanlinessLevel(Number(e.target.value))}
                  className="w-full accent-brand-600 mt-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Relaxed</span>
                  <span>Moderate</span>
                  <span>Meticulous</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Diet, Smoking, Pets & Parties */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Diet &amp; Lifestyle Habits
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Food Habit
                </label>
                <select
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="jain">Jain Diet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Smoking
                </label>
                <select
                  value={smokingPreference}
                  onChange={(e) => setSmokingPreference(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="non_smoker">Non-Smoker</option>
                  <option value="outside_only">Outside/Balcony Only</option>
                  <option value="occasional">Occasional</option>
                  <option value="regular">Regular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parties &amp; Hosting
                </label>
                <select
                  value={partyHabits}
                  onChange={(e) => setPartyHabits(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="rarely">Rarely / Quiet Home</option>
                  <option value="weekends_only">Weekends Only</option>
                  <option value="frequent">Frequent Social Gatherings</option>
                  <option value="no_parties">Strictly No Parties</option>
                </select>
              </div>
            </div>

            {/* Pets Checkboxes */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowsPets}
                  onChange={(e) => setAllowsPets(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>I am comfortable living with pets</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPets}
                  onChange={(e) => setHasPets(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>I currently own a pet (dog/cat/bird)</span>
              </label>
            </div>
          </div>

          {/* Section 4: Bio / Living Style */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                About Your Living Style &amp; Vibes
              </label>
              <textarea
                rows={3}
                value={aboutLivingStyle}
                onChange={(e) => setAboutLivingStyle(e.target.value)}
                placeholder="Share a short note about what kind of flatmate environment you thrive in..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />}>
              Save &amp; Update Matching Score
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
