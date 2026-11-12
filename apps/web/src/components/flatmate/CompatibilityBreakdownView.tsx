'use client';

import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  MapPin,
  Moon,
  Sparkle,
  Utensils,
  Calendar,
  Smile,
} from 'lucide-react';
import { CompatibilityResult } from '@flatmate/shared';
import { getCompatibilityBadgeClass } from '@/lib/utils/formatters';

interface CompatibilityBreakdownViewProps {
  result: CompatibilityResult;
}

export const CompatibilityBreakdownView: React.FC<CompatibilityBreakdownViewProps> = ({
  result,
}) => {
  const badge = getCompatibilityBadgeClass(result.overallScore);

  const categories = [
    {
      title: 'Budget Match',
      weight: '20%',
      score: result.breakdown.budget.score,
      max: 20,
      icon: IndianRupee,
      details: result.breakdown.budget.details,
    },
    {
      title: 'Location & Locality',
      weight: '20%',
      score: result.breakdown.location.score,
      max: 20,
      icon: MapPin,
      details: result.breakdown.location.details,
    },
    {
      title: 'Cleanliness Standards',
      weight: '15%',
      score: result.breakdown.cleanliness.score,
      max: 15,
      icon: Sparkle,
      details: result.breakdown.cleanliness.details,
    },
    {
      title: 'Sleep Schedule Rhythm',
      weight: '15%',
      score: result.breakdown.sleepSchedule.score,
      max: 15,
      icon: Moon,
      details: result.breakdown.sleepSchedule.details,
    },
    {
      title: 'Lifestyle (Smoking/Pets/Party)',
      weight: '15%',
      score: result.breakdown.lifestyle.score,
      max: 15,
      icon: Smile,
      details: result.breakdown.lifestyle.details,
    },
    {
      title: 'Food Preferences',
      weight: '5%',
      score: result.breakdown.food.score,
      max: 5,
      icon: Utensils,
      details: result.breakdown.food.details,
    },
    {
      title: 'Move-in Timeline',
      weight: '10%',
      score: result.breakdown.moveInDate.score,
      max: 10,
      icon: Calendar,
      details: result.breakdown.moveInDate.details,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Top Total Score Ring & Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Algorithmic Compatibility
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
            {result.overallScore}% Match
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Calculated across 7 lifestyle criteria with Indian co-living weight matrix
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border text-sm font-bold ${badge.bg} ${badge.border}`}>
          {badge.label}
        </div>
      </div>

      {/* Highlights & Potential Conflicts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.highlights.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Compatibility Highlights</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-900">
              {result.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.potentialConflicts.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Points to Align On</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-900">
              {result.potentialConflicts.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Categories Progress Bars */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Scoring Category Breakdown
        </h4>
        <div className="space-y-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const pct = Math.round((cat.score / cat.max) * 100);
            return (
              <div key={cat.title} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold text-slate-800">{cat.title}</span>
                    <span className="text-[10px] text-slate-400">({cat.weight})</span>
                  </div>
                  <span className="font-bold text-slate-700">
                    {cat.score} / {cat.max} pts
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-500 mt-1.5">{cat.details}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
