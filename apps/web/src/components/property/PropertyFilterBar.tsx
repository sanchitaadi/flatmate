'use client';

import React from 'react';
import { Search, MapPin, SlidersHorizontal, IndianRupee, Home, RotateCcw } from 'lucide-react';
import { PropertyCategory, FurnishingStatus } from '@flatmate/shared';
import { formatCategory, formatINR } from '@/lib/utils/formatters';

export interface PropertyFilters {
  city: string;
  locality: string;
  category: string;
  minRent: number;
  maxRent: number;
  furnishing: string;
  bedrooms: string;
}

interface PropertyFilterBarProps {
  filters: PropertyFilters;
  onChange: (newFilters: PropertyFilters) => void;
  onReset: () => void;
  totalCount: number;
}

export const CITIES = ['All Cities', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'];

export const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Spaces', value: 'all' },
  { label: 'Entire Flat', value: 'entire_flat' },
  { label: 'Private Room', value: 'private_room' },
  { label: 'Flatmate Vacancy', value: 'flatmate_vacancy' },
  { label: 'PG / Co-Living', value: 'pg_accommodation' },
  { label: 'Shared Room', value: 'shared_room' },
];

export const PropertyFilterBar: React.FC<PropertyFilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-subtle mb-6">
      {/* Top Search Inputs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* City Select */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <select
              value={filters.city}
              onChange={(e) => onChange({ ...filters, city: e.target.value })}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {CITIES.map((c) => (
                <option key={c} value={c === 'All Cities' ? 'all' : c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Locality Search */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Locality / Area
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Koramangala, Bandra..."
              value={filters.locality}
              onChange={(e) => onChange({ ...filters, locality: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Rent Budget Max */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Max Monthly Rent
            </label>
            <span className="text-xs font-bold text-brand-600">
              {filters.maxRent >= 150000 ? 'Any Rent' : formatINR(filters.maxRent)}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="150000"
            step="5000"
            value={filters.maxRent}
            onChange={(e) => onChange({ ...filters, maxRent: Number(e.target.value) })}
            className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Furnishing Status */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Furnishing
          </label>
          <select
            value={filters.furnishing}
            onChange={(e) => onChange({ ...filters, furnishing: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">Any Furnishing</option>
            <option value="fully_furnished">Fully Furnished</option>
            <option value="semi_furnished">Semi Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Active Counts */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onChange({ ...filters, category: cat.value })}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                filters.category === cat.value
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">
            Showing <strong className="text-slate-800">{totalCount}</strong> verified properties
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
