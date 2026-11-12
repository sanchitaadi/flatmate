'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Users,
  Home,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Heart,
  CheckCircle2,
  Lock,
  Building,
  KeyRound,
  Compass,
  Star,
  MapPin,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FlatmateCard } from '@/components/flatmate/FlatmateCard';
import { CITIES, CATEGORIES } from '@/components/property/PropertyFilterBar';
import { formatINR } from '@/lib/utils/formatters';

export default function HomePage() {
  const router = useRouter();
  const { properties, allProfiles, currentPreferences } = useAuth();

  const [activeTab, setActiveTab] = useState<'flatmates' | 'properties'>('flatmates');
  const [searchCity, setSearchCity] = useState('Bangalore');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchLocality, setSearchLocality] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'flatmates') {
      router.push(`/flatmates?city=${encodeURIComponent(searchCity)}`);
    } else {
      const params = new URLSearchParams();
      if (searchCity && searchCity !== 'All Cities') params.set('city', searchCity);
      if (searchCategory && searchCategory !== 'all') params.set('category', searchCategory);
      if (searchLocality) params.set('locality', searchLocality);
      router.push(`/explore?${params.toString()}`);
    }
  };

  // Sample flatmate seekers
  const sampleSeekers = allProfiles.filter((p) => p.active_role === 'flatmate_seeker').slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 border-b border-slate-200/80">
        {/* Background decorative blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-200/30 via-indigo-100/40 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-brand-200/80 shadow-subtle px-4 py-1.5 rounded-full text-xs font-semibold text-brand-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Find Your People. Share Your Space.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              India&apos;s Verified Platform for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                Flatmates &amp; Rentals
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Match with compatible flatmates through transparent lifestyle compatibility, or discover verified private rooms, apartments, and co-living spaces across Bangalore, Mumbai, Delhi-NCR, Pune and Hyderabad.
            </p>
          </div>

          {/* Dual Search Box Card */}
          <div className="max-w-3xl mx-auto mt-10 bg-white rounded-3xl border border-slate-200/90 shadow-floating p-4 sm:p-6">
            {/* Tabs: Find Flatmates vs Search Properties */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
              <button
                onClick={() => setActiveTab('flatmates')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'flatmates'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Find Flatmates</span>
              </button>

              <button
                onClick={() => setActiveTab('properties')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'properties'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Explore Properties</span>
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* City selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {activeTab === 'flatmates' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Preferred Budget
                  </label>
                  <select
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="any">₹15,000 - ₹30,000 / mo</option>
                    <option value="budget">Under ₹15,000 / mo</option>
                    <option value="mid">₹30,000 - ₹50,000 / mo</option>
                    <option value="premium">₹50,000+ / mo</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Property Category
                  </label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="all">All Types</option>
                    <option value="entire_flat">Entire Flat</option>
                    <option value="private_room">Private Room</option>
                    <option value="flatmate_vacancy">Flatmate Vacancy</option>
                    <option value="pg_accommodation">PG / Co-Living</option>
                  </select>
                </div>
              )}

              {/* Submit CTA */}
              <div className="sm:self-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full h-[42px]"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {activeTab === 'flatmates' ? 'Discover Flatmates' : 'Search Rentals'}
                </Button>
              </div>
            </form>

            {/* Quick popular chips */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Trending Areas:</span>
              <Link href="/explore?locality=Koramangala" className="hover:text-brand-600 underline">Koramangala</Link>
              <span>•</span>
              <Link href="/explore?locality=Indiranagar" className="hover:text-brand-600 underline">Indiranagar</Link>
              <span>•</span>
              <Link href="/explore?locality=Bandra" className="hover:text-brand-600 underline">Bandra West</Link>
              <span>•</span>
              <Link href="/explore?locality=Cyber City" className="hover:text-brand-600 underline">Cyber City Gurgaon</Link>
              <span>•</span>
              <Link href="/explore?locality=Gachibowli" className="hover:text-brand-600 underline">Gachibowli</Link>
            </div>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs text-slate-600">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Government ID &amp; Aadhaar Verified</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <Lock className="w-5 h-5 text-brand-600 shrink-0" />
              <span>Strict Privacy (No Spam / No Leaks)</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Deterministic Lifestyle Matching</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <Building className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Verified Direct Owners &amp; RERA Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW THE PLATFORM WORKS (4 CORE PILLARS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
              Integrated Experience
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Find Compatible Co-Living
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Unlike generic classifieds or unverified broker groups, NestMate merges lifestyle compatibility with a transparent property marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Tinder-Style Flatmate Matching
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Swipe right on compatible flatmates with a mathematical compatibility score computed across budget, sleep cycle, cleanliness standard, dietary preference, and lifestyle.
              </p>
              <Link href="/flatmates" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
                Explore Flatmate Deck <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Home className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Zero-Spam Property Marketplace
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore verified entire apartments, private rooms in luxury gated societies, and managed PGs with authentic photographs, transparent rent breakdown, and amenities.
              </p>
              <Link href="/explore" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline">
                Browse Properties <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Safe In-App Chat &amp; Contact Shield
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Communicate securely inside NestMate without ever exposing your private phone number or email address until you explicitly approve contact sharing.
              </p>
              <Link href="/messages" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline">
                Review Safety Architecture <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Handpicked Spaces
              </span>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Verified Rental Properties
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Verified listings with transparent rent and genuine owner contact.
              </p>
            </div>

            <Link href="/explore">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All Properties
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FLATMATE MATCHING TEASER CAROUSEL */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Lifestyle Compatibility
              </span>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Meet Compatible Flatmate Seekers
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Connect with young professionals and creators looking for flatmates right now.
              </p>
            </div>

            <Link href="/flatmates">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Open Swipe Deck
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sampleSeekers.map((seeker) => (
              <FlatmateCard
                key={seeker.id}
                profile={seeker}
                preferences={
                  seeker.id === 'a0000000-0000-0000-0000-000000000002'
                    ? {
                        id: 'p2',
                        user_id: seeker.id,
                        budget_min: 17000,
                        budget_max: 28000,
                        target_city: 'Bangalore',
                        preferred_localities: ['Koramangala', 'Indiranagar'],
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
                      }
                    : {
                        id: 'p3',
                        user_id: seeker.id,
                        budget_min: 35000,
                        budget_max: 55000,
                        target_city: 'Mumbai',
                        preferred_localities: ['Bandra West', 'Khar'],
                        target_move_date: '2026-12-05',
                        sleep_schedule: 'standard',
                        cleanliness_level: 4,
                        food_preference: 'non_vegetarian',
                        smoking_preference: 'non_smoker',
                        drinking_preference: 'social_drinker',
                        party_habits: 'weekends_only',
                        work_style: 'office',
                        allows_pets: false,
                        has_pets: false,
                        gender_preference: 'male_only',
                        created_at: '',
                        updated_at: '',
                      }
                }
                currentUserPrefs={currentPreferences}
                onLike={(id) => router.push('/flatmates')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. OWNER & AGENT CALL TO ACTION BANNER */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <Badge variant="accent" size="sm">
              For Property Owners &amp; Authorized Agents
            </Badge>
            <h3 className="text-3xl font-extrabold tracking-tight">
              List Your Flat on NestMate with Zero Spam
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Connect directly with high-intent working professionals and pre-verified tenants. Manage enquiries, schedule visits, and authorize RERA-certified agents safely.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/owner/add">
              <Button variant="primary" size="lg">
                Post Property Free
              </Button>
            </Link>
            <Link href="/owner">
              <Button variant="outline" size="lg" className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700">
                Owner Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
