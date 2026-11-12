'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, Heart } from 'lucide-react';
import { Match, Profile } from '@flatmate/shared';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  currentUser: Profile | null;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  match,
  currentUser,
}) => {
  if (!match || !currentUser || !match.matched_user) return null;

  const target = match.matched_user;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md text-center p-0">
      <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 text-white p-8 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl" />

        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Mutual Flatmate Match</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight mb-2">
          It&apos;s a Match!
        </h2>
        <p className="text-sm text-brand-100 max-w-xs mx-auto">
          You and <strong className="text-white">{target.full_name}</strong> both liked each other&apos;s profiles!
        </p>

        {/* Dual Avatars with Heart */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="relative">
            <img
              src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={currentUser.full_name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
          </div>

          <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center shadow-lg transform scale-110 animate-bounce">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>

          <div className="relative">
            <img
              src={target.avatar_url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200'}
              alt={target.full_name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
          </div>
        </div>

        {/* Compatibility badge */}
        <div className="inline-block bg-white text-brand-900 font-bold px-4 py-1.5 rounded-full text-sm shadow-md">
          {match.compatibility_score}% Compatibility Score
        </div>
      </div>

      <div className="p-6 bg-white space-y-3">
        <Link href={`/messages`}>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            leftIcon={<MessageSquare className="w-5 h-5" />}
          >
            Start Chat with {target.full_name.split(' ')[0]}
          </Button>
        </Link>

        <Button variant="ghost" size="md" className="w-full text-slate-500" onClick={onClose}>
          Keep Swiping
        </Button>
      </div>
    </Modal>
  );
};
