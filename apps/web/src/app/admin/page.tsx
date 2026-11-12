'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Building,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  Search,
  ExternalLink,
  Ban,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { INITIAL_VERIFICATIONS, INITIAL_REPORTS } from '@/lib/supabase/mockData';
import { formatINR } from '@/lib/utils/formatters';

export default function AdminDashboardPage() {
  const { allProfiles, properties, activeRole, updateProperty } = useAuth();

  const [activeTab, setActiveTab] = useState<'properties' | 'verifications' | 'reports' | 'users'>('properties');
  const [verificationsList, setVerificationsList] = useState(INITIAL_VERIFICATIONS);
  const [reportsList, setReportsList] = useState(INITIAL_REPORTS);
  const [userList, setUserList] = useState(allProfiles);

  const handleVerify = (id: string, status: 'verified' | 'rejected') => {
    setVerificationsList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status, reviewed_at: new Date().toISOString() } : v))
    );
  };

  const handleResolveReport = (id: string, status: 'resolved' | 'dismissed') => {
    setReportsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, updated_at: new Date().toISOString() } : r))
    );
  };

  const handleToggleSuspendUser = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_suspended: !u.is_suspended } : u))
    );
  };

  const handleTogglePropertyStatus = (propId: string) => {
    const prop = properties.find((p) => p.id === propId);
    if (!prop) return;
    updateProperty(propId, {
      status: prop.status === 'active' ? 'under_review' : 'active',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-floating">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NestMate Security &amp; Moderation Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Platform Administration Dashboard
          </h1>
          <p className="text-xs text-slate-300">
            Enforce trust, safety, and RERA compliance across all property listings and co-living profiles.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Role Level: <strong>Admin (SuperUser)</strong></span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Total Users</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {userList.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Across 5 Indian Metros</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Total Properties</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {properties.length}
          </div>
          <span className="text-[11px] text-brand-600 font-medium">100% Zero-Brokerage</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Verifications Pending</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">
            {verificationsList.filter((v) => v.status === 'pending').length}
          </div>
          <span className="text-[11px] text-slate-400">KYC &amp; Deeds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-xs text-slate-500 font-medium block">Open Reports</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">
            {reportsList.filter((r) => r.status === 'pending').length}
          </div>
          <span className="text-[11px] text-slate-400">Moderation Queue</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'properties' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Moderate Properties ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'verifications' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Document Verifications ({verificationsList.length})
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'reports' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Safety Reports ({reportsList.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            User Accounts ({userList.length})
          </button>
        </div>

        {/* Tab 1: Moderate Properties */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
            {properties.map((p) => (
              <div key={p.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={p.images[0]?.image_url} alt="" className="w-16 h-14 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                      <Badge variant={p.status === 'active' ? 'trust' : 'warning'} size="sm">
                        {p.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.locality}, {p.city} • Rent: {formatINR(p.rent_monthly)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/property/${p.id}`}>
                    <Button variant="outline" size="sm">
                      Inspect
                    </Button>
                  </Link>

                  <Button
                    variant={p.status === 'active' ? 'danger' : 'primary'}
                    size="sm"
                    onClick={() => handleTogglePropertyStatus(p.id)}
                  >
                    {p.status === 'active' ? 'Flag / Suspend' : 'Approve & Activate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Document Verifications */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
            {verificationsList.map((v) => (
              <div key={v.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {v.profile?.full_name || 'User'}
                    </span>
                    <Badge variant={v.status === 'verified' ? 'trust' : 'warning'} size="sm">
                      {v.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    Document Type: <strong className="text-slate-800 uppercase">{v.document_type.replace('_', ' ')}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Submitted: {new Date(v.submitted_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleVerify(v.id, 'verified')}
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleVerify(v.id, 'rejected')}
                    leftIcon={<XCircle className="w-3.5 h-3.5" />}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Safety Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
            {reportsList.map((r) => (
              <div key={r.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 uppercase">
                      {r.reason.replace('_', ' ')}
                    </span>
                    <Badge variant={r.status === 'resolved' ? 'trust' : 'warning'} size="sm">
                      {r.status.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {r.description}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveReport(r.id, 'dismissed')}
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleResolveReport(r.id, 'resolved')}
                  >
                    Take Action &amp; Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: User Accounts Directory */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
            {userList.map((user) => (
              <div key={user.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={user.avatar_url || ''} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{user.full_name}</span>
                      <Badge variant={user.is_suspended ? 'danger' : 'brand'} size="sm">
                        {user.is_suspended ? 'SUSPENDED' : user.active_role.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      {user.email} • {user.city}
                    </div>
                  </div>
                </div>

                <Button
                  variant={user.is_suspended ? 'primary' : 'danger'}
                  size="sm"
                  onClick={() => handleToggleSuspendUser(user.id)}
                  leftIcon={user.is_suspended ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                >
                  {user.is_suspended ? 'Unsuspend' : 'Suspend Account'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
