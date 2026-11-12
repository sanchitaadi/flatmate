'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Heart,
  Share2,
  MessageSquare,
  Sparkles,
  Check,
  Lock,
  UserCheck,
  ArrowLeft,
  Send,
  Building,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { formatINR, formatCategory, formatFurnishing } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    properties,
    savedPropertyIds,
    toggleSaveProperty,
    sendEnquiry,
    currentUser,
    allProfiles,
    getOrCreateConversation,
  } = useAuth();

  const property = properties.find((p) => p.id === id) || properties[0];
  const owner = allProfiles.find((p) => p.id === property.owner_id) || allProfiles[6];
  const agent = property.authorized_agent_id
    ? allProfiles.find((p) => p.id === property.authorized_agent_id)
    : null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState(
    `Hi ${owner.full_name.split(' ')[0]}, I am interested in your listing '${property.title}' in ${property.locality}. I am looking to move in around ${property.available_from}. Can we schedule a visit?`
  );
  const [proposedDate, setProposedDate] = useState(property.available_from);
  const [enquirySentSuccess, setEnquirySentSuccess] = useState(false);

  const isSaved = savedPropertyIds.includes(property.id);

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    sendEnquiry({
      property_id: property.id,
      renter_id: currentUser.id,
      owner_id: property.owner_id,
      agent_id: property.authorized_agent_id,
      message: enquiryMessage,
      status: 'pending',
      proposed_move_date: proposedDate,
      occupant_count: 1,
      has_pets: false,
    });
    setEnquirySentSuccess(true);
    setTimeout(() => {
      setIsEnquiryModalOpen(false);
      setEnquirySentSuccess(false);
    }, 2000);
  };

  const handleStartChat = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    const convId = getOrCreateConversation(property.owner_id, property.id);
    router.push('/messages');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Rentals</span>
        </Link>
      </div>

      {/* Top Title & Price Line */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
              {formatCategory(property.property_category)}
            </span>
            {property.is_verified && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Listing
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mt-1.5">
            <MapPin className="w-4 h-4 text-brand-600" />
            <span>
              {property.locality}, {property.city}, {property.state} - {property.pincode}
            </span>
          </div>
        </div>

        {/* Action Buttons (Save, Share) */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSaveProperty(property.id)}
            leftIcon={
              <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
            }
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[16/9] max-h-[500px]">
        {/* Large Primary Image */}
        <div className="md:col-span-2 relative h-full bg-slate-950">
          <img
            src={property.images[activePhotoIdx]?.image_url || property.images[0].image_url}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 p-3 bg-slate-950/40 overflow-y-auto">
          {property.images.map((img, i) => (
            <button
              key={img.id || i}
              onClick={() => setActivePhotoIdx(i)}
              className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all ${
                activePhotoIdx === i ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Left details (65%) + Right Sticky Booking Box (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Detailed Overview */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Bedrooms
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-base mt-0.5">
                <Bed className="w-4 h-4 text-brand-600" />
                <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} BHK`}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Bathrooms
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-base mt-0.5">
                <Bath className="w-4 h-4 text-brand-600" />
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Furnishing
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-base mt-0.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span className="truncate">{formatFurnishing(property.furnishing)}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Available From
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-base mt-0.5">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>{property.available_from}</span>
              </div>
            </div>
          </div>

          {/* About Space */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="text-lg font-bold text-slate-900">About this Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Verified Amenities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Amenities &amp; Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Exact Location Shield Note */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold block">Privacy Shield Active:</strong>
              <p className="text-amber-800 leading-relaxed">
                To protect property owner privacy and prevent unverified walk-ins, the exact building number and address line are safeguarded until your visit enquiry is accepted.
              </p>
            </div>
          </div>

          {/* Owner & Agent Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Property Representation
            </h3>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={owner.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200'}
                  alt={owner.full_name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{owner.full_name}</h4>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                      Direct Owner
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{owner.bio}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleStartChat}>
                Chat with Owner
              </Button>
            </div>

            {agent && (
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-600">
                <Building className="w-4 h-4 text-brand-600 shrink-0" />
                <span>
                  Authorized RERA Agency: <strong className="text-slate-900">{agent.full_name}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Pricing & Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 p-6 shadow-floating space-y-6">
            {/* Rent & Deposit Breakdown */}
            <div className="border-b border-slate-100 pb-5">
              <span className="text-xs text-slate-500 block">Monthly Rent</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatINR(property.rent_monthly)}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <strong className="text-slate-800">{formatINR(property.security_deposit)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance Charge:</span>
                  <strong className="text-slate-800">
                    {property.maintenance_charge === 0 ? 'Included' : formatINR(property.maintenance_charge)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Brokerage:</span>
                  <strong className="text-emerald-600 font-bold">₹0 (Zero Brokerage)</strong>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setIsEnquiryModalOpen(true)}
              >
                Send Visit Enquiry
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={handleStartChat}
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Direct Message
              </Button>
            </div>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Verified through NestMate Trust &amp; Safety Protocol. No upfront token payments before in-person verification.
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <Modal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        title="Schedule Visit or Send Enquiry"
        description={`Send a direct enquiry to ${owner.full_name} for ${property.title}`}
      >
        {enquirySentSuccess ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-bold text-slate-900">Enquiry Sent Successfully!</h4>
            <p className="text-xs text-slate-500">
              The owner has been notified. You can track their response in your messages dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendEnquiry} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Move-In / Visit Date
              </label>
              <input
                type="date"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message to Property Owner
              </label>
              <textarea
                rows={4}
                value={enquiryMessage}
                onChange={(e) => setEnquiryMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                required
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
              Submit Enquiry
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
