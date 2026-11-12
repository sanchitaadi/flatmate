'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  LayoutGrid,
  Map as MapIcon,
  Home,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilterBar, PropertyFilters } from '@/components/property/PropertyFilterBar';
import { PropertyMap } from '@/components/property/PropertyMap';
import { Button } from '@/components/ui/Button';

function ExploreContent() {
  const searchParams = useSearchParams();
  const { properties } = useAuth();

  const initialCity = searchParams.get('city') || 'all';
  const initialLocality = searchParams.get('locality') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState<PropertyFilters>({
    city: initialCity,
    locality: initialLocality,
    category: initialCategory,
    minRent: 0,
    maxRent: 150000,
    furnishing: 'all',
    bedrooms: 'all',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // City filter
      if (filters.city !== 'all' && p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      // Locality filter
      if (
        filters.locality &&
        !p.locality.toLowerCase().includes(filters.locality.toLowerCase()) &&
        !p.city.toLowerCase().includes(filters.locality.toLowerCase())
      ) {
        return false;
      }
      // Category filter
      if (filters.category !== 'all' && p.property_category !== filters.category) {
        return false;
      }
      // Rent Max
      if (p.rent_monthly > filters.maxRent) {
        return false;
      }
      // Furnishing
      if (filters.furnishing !== 'all' && p.furnishing !== filters.furnishing) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.rent_monthly - b.rent_monthly;
      if (sortBy === 'price_desc') return b.rent_monthly - a.rent_monthly;
      return 0;
    });
  }, [properties, filters, sortBy]);

  const handleReset = () => {
    setFilters({
      city: 'all',
      locality: '',
      category: 'all',
      minRent: 0,
      maxRent: 150000,
      furnishing: 'all',
      bedrooms: 'all',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore Verified Rentals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Entire flats, private rooms, flatmate vacancies &amp; managed PGs across India.
          </p>
        </div>

        {/* View Mode Toggle: Grid vs Map */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="featured">Featured First</option>
            <option value="price_asc">Rent: Low to High</option>
            <option value="price_desc">Rent: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Bar */}
      <PropertyFilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        totalCount={filteredProperties.length}
      />

      {/* Content Rendering: Map or Grid */}
      {viewMode === 'map' ? (
        <div className="mb-12">
          <PropertyMap
            properties={filteredProperties}
            selectedCity={filters.city !== 'all' ? filters.city : 'Bangalore'}
          />
        </div>
      ) : null}

      {/* Grid of Properties */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-subtle">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Home className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Properties Found</h3>
          <p className="text-xs text-slate-500 mb-6">
            Try loosening your rent budget slider or switching to &apos;All Cities&apos; to view all available listings.
          </p>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-400">Loading rentals directory...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
