'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';
import { Property } from '@flatmate/shared';
import { formatINR, formatCategory } from '@/lib/utils/formatters';

interface PropertyMapProps {
  properties: Property[];
  selectedCity?: string;
  onSelectProperty?: (property: Property) => void;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedCity = 'Bangalore',
  onSelectProperty,
}) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(properties[0] || null);

  // Approximate city coordinates
  const cityCoordinates: Record<string, { lat: number; lng: number; zoom: number }> = {
    Bangalore: { lat: 12.9716, lng: 77.5946, zoom: 12 },
    Mumbai: { lat: 19.0760, lng: 72.8777, zoom: 12 },
    'Delhi NCR': { lat: 28.6139, lng: 77.2090, zoom: 11 },
    Pune: { lat: 18.5204, lng: 73.8567, zoom: 12 },
    Hyderabad: { lat: 17.3850, lng: 78.4867, zoom: 12 },
  };

  const center = cityCoordinates[selectedCity] || cityCoordinates['Bangalore'];

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-subtle bg-slate-100 flex flex-col md:flex-row">
      {/* Interactive Map Visual with OpenStreetMap styling */}
      <div className="relative flex-1 bg-[#e5e3df] overflow-hidden">
        {/* OpenStreetMap Tile Background Frame */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `radial-gradient(#94a3b8 0.75px, transparent 0.75px), radial-gradient(#cbd5e1 0.75px, #f1f5f9 0.75px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />

        {/* Map Header / Location Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs shadow-md flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span className="font-semibold text-slate-800">
            {selectedCity} Map View (OSM Grid)
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{properties.length} listings</span>
        </div>

        {/* Simulated Interactive Pin Markers on Map Canvas */}
        <div className="absolute inset-0 p-12 flex items-center justify-center">
          <div className="relative w-full h-full max-w-lg max-h-[400px]">
            {properties.map((prop, idx) => {
              const isSelected = activeProperty?.id === prop.id;
              // Distribute markers visually
              const topOffset = 20 + ((idx * 33) % 65);
              const leftOffset = 15 + ((idx * 47) % 70);

              return (
                <div
                  key={prop.id}
                  style={{ top: `${topOffset}%`, left: `${leftOffset}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  onClick={() => {
                    setActiveProperty(prop);
                    if (onSelectProperty) onSelectProperty(prop);
                  }}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1 ${
                      isSelected
                        ? 'bg-slate-900 text-white ring-4 ring-brand-500/30 scale-110 z-30'
                        : 'bg-white text-slate-900 hover:bg-brand-50 border border-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-brand-600 font-extrabold">₹</span>
                    <span>{Math.round(prop.rent_monthly / 1000)}k</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Attribution Disclaimer */}
        <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded">
          © OpenStreetMap contributors • Leaflet
        </div>
      </div>

      {/* Selected Property Preview Sidebar */}
      {activeProperty && (
        <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-5 flex flex-col justify-between z-20">
          <div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 relative bg-slate-100">
              <img
                src={activeProperty.images[0]?.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'}
                alt={activeProperty.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {formatCategory(activeProperty.property_category)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{activeProperty.locality}, {activeProperty.city}</span>
            </div>

            <h4 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
              {activeProperty.title}
            </h4>

            <div className="mt-3 text-lg font-bold text-slate-900 flex items-baseline gap-1">
              {formatINR(activeProperty.rent_monthly)}
              <span className="text-xs font-normal text-slate-500">/ mo</span>
            </div>

            <div className="text-xs text-slate-500 mt-1">
              {activeProperty.bedrooms} BHK • {activeProperty.bathrooms} Bath • Deposit {formatINR(activeProperty.security_deposit)}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link href={`/property/${activeProperty.id}`} className="block">
              <button className="w-full py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <span>View Full Listing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
