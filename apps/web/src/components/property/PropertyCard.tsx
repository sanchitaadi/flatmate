'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Property } from '@flatmate/shared';
import { formatINR, formatCategory, formatFurnishing } from '@/lib/utils/formatters';
import { useAuth } from '@/lib/auth/authContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PropertyCardProps {
  property: Property;
  onEnquireClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEnquireClick,
}) => {
  const { savedPropertyIds, toggleSaveProperty } = useAuth();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isSaved = savedPropertyIds.includes(property.id);
  const images = property.images && property.images.length > 0
    ? property.images
    : [{ id: 'placeholder', image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', is_primary: true }];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col overflow-hidden">
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={images[activeImageIdx]?.image_url || images[0].image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge & Verification */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
            {formatCategory(property.property_category)}
          </span>
          {property.is_verified && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveProperty(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
          }`}
          aria-label="Save property"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Price on Image Bottom Left */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight">
              {formatINR(property.rent_monthly)}
            </span>
            <span className="text-xs text-slate-200">/ month</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Deposit: {formatINR(property.security_deposit)}
          </div>
        </div>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/50 backdrop-blur-sm px-2 py-1 rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIdx === idx ? 'bg-white w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">
              {property.locality}, {property.city}
            </span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.id}`} className="block">
            <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1 hover:text-brand-600 transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Key specs: Bed, Bath, Furnishing */}
          <div className="flex items-center gap-4 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} BHK`}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{formatFurnishing(property.furnishing)}</span>
            </div>
          </div>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-md font-medium"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[11px] text-slate-400 self-center">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Available: <strong className="text-slate-700">{property.available_from}</strong>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/property/${property.id}`}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
