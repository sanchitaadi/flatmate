'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building,
  PlusCircle,
  Eye,
  MessageSquare,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR, formatCategory } from '@/lib/utils/formatters';

export default function OwnerDashboardOverview() {
  const { currentUser, properties, enquiries, activeRole } = useAuth();

  // Filter properties owned or managed by current persona
  const ownerProperties = properties.filter(
    (p) => p.owner_id === currentUser?.id || p.authorized_agent_id === currentUser?.id
  );

  const ownerEnquiries = enquiries.filter(
    (e) => e.owner_id === currentUser?.id || e.agent_id === currentUser?.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-card">
        <div className="relative z-10 space-y-2 max-w-xl">
          <Badge variant="accent" size="sm">
            {activeRole === 'property_agent' ? 'Authorized Agent Portal' : 'Property Owner Portal'}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {currentUser?.full_name}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Manage your verified listings, review tenant visit requests, and handle agency authorizations without middleman fees.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link href="/owner/add">
            <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Add New Property
            </Button>
          </Link>
          <Link href="/owner/enquiries">
            <Button variant="outline" size="md" className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700">
              View Enquiries ({ownerEnquiries.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Total Listings</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {ownerProperties.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">100% Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Pending Enquiries</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {ownerEnquiries.filter((e) => e.status === 'pending').length}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Awaiting response</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Total Monthly Yield</span>
          <div className="text-2xl font-extrabold text-brand-600 mt-1">
            {formatINR(ownerProperties.reduce((acc, p) => acc + p.rent_monthly, 0))}
          </div>
          <span className="text-[11px] text-slate-400">Projected rent/mo</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">RERA Status</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-base font-bold text-emerald-700">Verified</span>
          </div>
          <span className="text-[11px] text-slate-400">Ownership Verified</span>
        </div>
      </div>

      {/* Active Listings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Active Listings</h2>
            <p className="text-xs text-slate-500">Live properties shown on NestMate public directory</p>
          </div>

          <Link href="/owner/add">
            <Button variant="outline" size="sm" leftIcon={<PlusCircle className="w-3.5 h-3.5" />}>
              Post Another
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {ownerProperties.map((prop) => (
            <div key={prop.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={prop.images[0]?.image_url || ''}
                  alt=""
                  className="w-16 h-14 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{prop.title}</span>
                    <Badge variant="brand" size="sm">{formatCategory(prop.property_category)}</Badge>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {prop.locality}, {prop.city} • Rent: <strong className="text-slate-800">{formatINR(prop.rent_monthly)}/mo</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/property/${prop.id}`}>
                  <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                    Public View
                  </Button>
                </Link>
                <Link href={`/owner/properties`}>
                  <Button variant="primary" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enquiries Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Renter Enquiries</h2>
          <Link href="/owner/enquiries" className="text-xs font-semibold text-brand-600 hover:underline">
            View All Enquiries
          </Link>
        </div>

        {ownerEnquiries.length > 0 ? (
          <div className="space-y-3">
            {ownerEnquiries.slice(0, 3).map((enq) => (
              <div key={enq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{enq.renter?.full_name || 'Renter'}</span>
                    <span className="text-[10px] text-slate-400">for</span>
                    <span className="text-xs font-medium text-slate-700">{enq.property?.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">&ldquo;{enq.message}&rdquo;</p>
                </div>

                <Link href="/messages">
                  <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                    Respond in Chat
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No pending enquiries at the moment.</p>
        )}
      </div>
    </div>
  );
}
