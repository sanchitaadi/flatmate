'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Heart,
  Send,
  Sliders,
  Home,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/formatters';

export default function UserDashboardPage() {
  const {
    currentUser,
    currentPreferences,
    savedPropertyIds,
    properties,
    matches,
    enquiries,
    activeRole,
    setActiveRole,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'saved' | 'enquiries' | 'matches'>('saved');

  const savedPropertiesList = properties.filter((p) => savedPropertyIds.includes(p.id));
  const myEnquiriesList = enquiries.filter((e) => e.renter_id === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Overview Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={currentUser?.full_name || 'Profile'}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentUser?.full_name}
              </h1>
              {currentUser?.is_verified && (
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser?.occupation || 'Member'} • {currentUser?.city}, {currentUser?.state}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Current Role Mode:</span>
              <Badge variant="brand" size="sm">
                {activeRole.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Dashboard CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/profile/preferences">
            <Button variant="outline" size="sm" leftIcon={<Sliders className="w-4 h-4" />}>
              Lifestyle Preferences
            </Button>
          </Link>

          <Link href="/flatmates">
            <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}>
              Find Flatmates
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Saved Properties</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {savedPropertyIds.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Mutual Matches</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {matches.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Active Enquiries</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {myEnquiriesList.length}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Identity Trust Score</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center gap-1">
            <span>100%</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Tabbed Area */}
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'saved'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Saved Properties ({savedPropertiesList.length})
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Sent Enquiries ({myEnquiriesList.length})
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'matches'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Flatmate Matches ({matches.length})
          </button>
        </div>

        {/* Tab 1: Saved Properties */}
        {activeTab === 'saved' && (
          <div>
            {savedPropertiesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPropertiesList.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-subtle">
                <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900">No saved properties yet</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Bookmark listings while exploring to quickly review them later.
                </p>
                <Link href="/explore">
                  <Button variant="primary" size="sm">Explore Rentals</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {myEnquiriesList.length > 0 ? (
              myEnquiriesList.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {enq.property?.title || 'Property Enquiry'}
                      </span>
                      <Badge
                        variant={enq.status === 'reviewed' ? 'brand' : enq.status === 'accepted' ? 'trust' : 'neutral'}
                        size="sm"
                      >
                        {enq.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      &ldquo;{enq.message}&rdquo;
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Proposed Move-In Date: <strong>{enq.proposed_move_date || 'Flexible'}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/property/${enq.property_id}`}>
                      <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        View Property
                      </Button>
                    </Link>
                    <Link href="/messages">
                      <Button variant="primary" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                        Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-subtle">
                <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900">No active enquiries</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Send a visit enquiry on any verified rental listing to connect with the owner.
                </p>
                <Link href="/explore">
                  <Button variant="primary" size="sm">Explore Listings</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Mutual Matches */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            {matches.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.matched_user?.avatar_url || ''}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {m.matched_user?.full_name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {m.matched_user?.occupation} • {m.compatibility_score}% Compatibility Match
                    </p>
                  </div>
                </div>

                <Link href="/messages">
                  <Button variant="primary" size="sm">
                    Open Chat
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
