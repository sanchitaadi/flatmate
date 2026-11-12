'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageSquare, ArrowLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function OwnerEnquiriesPage() {
  const router = useRouter();
  const { enquiries, currentUser, updateEnquiryStatus, getOrCreateConversation } = useAuth();

  const ownerEnquiries = enquiries.filter(
    (e) => e.owner_id === currentUser?.id || e.agent_id === currentUser?.id
  );

  const handleRespondChat = (renterId: string, propId: string) => {
    getOrCreateConversation(renterId, propId);
    router.push('/messages');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <Link
          href="/owner"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Owner Hub</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Tenant Visit Enquiries
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review visit requests and communicate directly with interested renters.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
        {ownerEnquiries.length > 0 ? (
          ownerEnquiries.map((enq) => (
            <div key={enq.id} className="p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{enq.renter?.full_name || 'Renter'}</h3>
                  <Badge variant={enq.status === 'reviewed' ? 'brand' : 'warning'} size="sm">
                    {enq.status.toUpperCase()}
                  </Badge>
                </div>
                <span className="text-[11px] text-slate-400">
                  Target Date: <strong>{enq.proposed_move_date || 'Flexible'}</strong>
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;{enq.message}&rdquo;
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Listing: <strong className="text-slate-800">{enq.property?.title}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateEnquiryStatus(enq.id, 'accepted')}
                  >
                    Accept Visit
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleRespondChat(enq.renter_id, enq.property_id)}
                    leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                  >
                    Reply in Chat
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-xs text-slate-400">
            No enquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
