'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building,
  ArrowLeft,
  Check,
  Plus,
  Image as ImageIcon,
  ShieldCheck,
  Sparkles,
  MapPin,
  IndianRupee,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Property, PropertyCategory, FurnishingStatus } from '@flatmate/shared';
import { Button } from '@/components/ui/Button';

export default function AddPropertyPage() {
  const router = useRouter();
  const { currentUser, addProperty } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('entire_flat');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('560034');
  const [addressLine, setAddressLine] = useState('');
  const [rentMonthly, setRentMonthly] = useState(35000);
  const [securityDeposit, setSecurityDeposit] = useState(70000);
  const [maintenanceCharge, setMaintenanceCharge] = useState(2500);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [balconies, setBalconies] = useState(1);
  const [carpetArea, setCarpetArea] = useState(1100);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('fully_furnished');
  const [availableFrom, setAvailableFrom] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-Speed Wi-Fi',
    '100% Power Backup (DG)',
    'Air Conditioner',
    'Dedicated Parking',
  ]);
  const [photoUrlInput, setPhotoUrlInput] = useState(
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  );
  const [photosList, setPhotosList] = useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const availableAmenitiesList = [
    'High-Speed Wi-Fi',
    '100% Power Backup (DG)',
    'Air Conditioner',
    'Modular Kitchen',
    'Washing Machine',
    'Dedicated Parking',
    'Swimming Pool',
    'Clubhouse & Gym',
    '24/7 Security CCTV',
    'Daily Housekeeping',
    'RO Purifier',
    'Lift Access',
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddPhoto = () => {
    if (photoUrlInput.trim()) {
      setPhotosList((prev) => [...prev, photoUrlInput.trim()]);
      setPhotoUrlInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);

    const newPropertyId = `prop-${Date.now()}`;
    const newProp: Property = {
      id: newPropertyId,
      owner_id: currentUser.id,
      created_by_user_id: currentUser.id,
      title,
      description,
      property_category: category,
      city,
      state,
      locality,
      pincode,
      address_line: addressLine || `${locality}, ${city}`,
      rent_monthly: Number(rentMonthly),
      security_deposit: Number(securityDeposit),
      maintenance_charge: Number(maintenanceCharge),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      balconies: Number(balconies),
      carpet_area_sqft: Number(carpetArea),
      furnishing,
      status: 'active',
      is_verified: true,
      available_from: availableFrom,
      preferred_tenants: ['Bachelors', 'Working Professionals'],
      images: photosList.map((url, idx) => ({
        id: `img-${Date.now()}-${idx}`,
        property_id: newPropertyId,
        image_url: url,
        display_order: idx + 1,
        is_primary: idx === 0,
        created_at: new Date().toISOString(),
      })),
      amenities: selectedAmenities,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addProperty(newProp);
    setIsSubmitting(false);
    setPublishedSuccess(true);
    setTimeout(() => {
      router.push(`/property/${newPropertyId}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/owner"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Owner Hub</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-subtle">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200">
            <Building className="w-3.5 h-3.5" />
            <span>Direct Owner / Agent Listing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Post a Verified Property Listing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill in the authentic details of your accommodation. Exact street addresses are strictly hidden to ensure privacy.
          </p>
        </div>

        {publishedSuccess ? (
          <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Property Listed Successfully!</h3>
            <p className="text-xs text-slate-600">
              Your listing is now live on the NestMate rental marketplace. Redirecting to your public listing page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Basic Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Basic Property Information
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spacious 2BHK with Lake View in HSR Layout Sector 2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="entire_flat">Entire Flat / Apartment</option>
                    <option value="private_room">Private Room (in shared flat)</option>
                    <option value="flatmate_vacancy">Flatmate Vacancy</option>
                    <option value="pg_accommodation">Managed PG / Co-Living</option>
                    <option value="shared_room">Shared Double Occupancy Room</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Furnishing Status *
                  </label>
                  <select
                    value={furnishing}
                    onChange={(e) => setFurnishing(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="fully_furnished">Fully Furnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the rooms, natural light, security, gated community perks, nearby metro stations and IT tech parks..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            </div>

            {/* 2. Location */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. City &amp; Locality
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (e.target.value === 'Bangalore') setState('Karnataka');
                      if (e.target.value === 'Mumbai') setState('Maharashtra');
                      if (e.target.value === 'Delhi NCR') setState('Haryana');
                      if (e.target.value === 'Pune') setState('Maharashtra');
                      if (e.target.value === 'Hyderabad') setState('Telangana');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    {['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Locality / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Koramangala 4th Block, Bandra West"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    6-digit PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confidential Street Address (Withheld from Public Display) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 302, Green Glen Layout, Bellandur (Private for verification)"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* 3. Pricing */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. Rent &amp; Deposit
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    step="500"
                    required
                    value={rentMonthly}
                    onChange={(e) => setRentMonthly(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Security Deposit (₹) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Maintenance (₹/mo)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={maintenanceCharge}
                    onChange={(e) => setMaintenanceCharge(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 4. Specifications */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                4. Room Configuration &amp; Specs
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Balconies
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={balconies}
                    onChange={(e) => setBalconies(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Carpet Area (sqft)
                  </label>
                  <input
                    type="number"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 5. Amenities Selection */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                5. Verified Amenities
              </h2>

              <div className="flex flex-wrap gap-2">
                {availableAmenitiesList.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Photo URLs */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                6. Property Photographs
              </h2>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste Unsplash or Supabase Storage image URL..."
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddPhoto}>
                  Add Photo
                </Button>
              </div>

              {/* Photos Grid Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photosList.map((url, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Cover Photo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                Publish Property Listing
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
