'use client';

import React from 'react';
import Link from 'next/link';
import { Building, PlusCircle, ExternalLink, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR, formatCategory } from '@/lib/utils/formatters';

export default function MyPropertiesPage() {
  const { properties, currentUser, updateProperty } = useAuth();

  const ownerProperties = properties.filter(
    (p) => p.owner_id === currentUser?.id || p.authorized_agent_id === currentUser?.id
  );

  const toggleAvailability = (id: string, currentStatus: string) => {
    updateProperty(id, {
      status: currentStatus === 'active' ? 'occupied' : 'active',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/owner"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Owner Hub</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Property Listings
          </h1>
        </div>

        <Link href="/owner/add">
          <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Post New Listing
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
        {ownerProperties.length > 0 ? (
          ownerProperties.map((prop) => (
            <div key={prop.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={prop.images[0]?.image_url || ''}
                  alt=""
                  className="w-20 h-16 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{prop.title}</h3>
                    <Badge variant={prop.status === 'active' ? 'trust' : 'warning'} size="sm">
                      {prop.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {prop.locality}, {prop.city} • Rent: <strong>{formatINR(prop.rent_monthly)}/mo</strong> • Deposit: <strong>{formatINR(prop.security_deposit)}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Category: {formatCategory(prop.property_category)} • {prop.bedrooms} BHK
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <Link href={`/property/${prop.id}`}>
                  <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Public View
                  </Button>
                </Link>

                <Button
                  variant={prop.status === 'active' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => toggleAvailability(prop.id, prop.status)}
                >
                  {prop.status === 'active' ? 'Mark Occupied' : 'Mark Available'}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-xs text-slate-400">
            No listings found. Click &apos;Post New Listing&apos; to create one.
          </div>
        )}
      </div>
    </div>
  );
}
