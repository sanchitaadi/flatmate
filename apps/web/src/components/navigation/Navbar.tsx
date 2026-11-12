'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Search,
  MessageSquare,
  Heart,
  PlusCircle,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { INITIAL_PROFILES } from '@/lib/supabase/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, activeRole, switchPersona, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Properties', href: '/explore', icon: Search },
    { label: 'Find Flatmates', href: '/flatmates', icon: Users },
    { label: 'Matches', href: '/matches', icon: Heart },
    { label: 'Messages', href: '/messages', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Banner: Founder Testing Bar & Persona Switcher */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline font-medium text-white">NestMate Live:</span>
          <span>India&apos;s Integrated Flatmate &amp; Rental Marketplace</span>
        </div>

        {/* Persona Switcher for Instant Role & Permission Testing */}
        <div className="relative">
          <button
            onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-0.5 rounded-md font-mono text-[11px] transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>Test Role: <strong>{currentUser?.full_name.split(' ')[0]}</strong> ({activeRole})</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {personaDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl shadow-floating border border-slate-200 py-2 z-50 text-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch Test Persona
              </div>
              {INITIAL_PROFILES.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    switchPersona(p.id);
                    setPersonaDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    currentUser?.id === p.id ? 'bg-brand-50 text-brand-700 font-semibold' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{p.full_name}</span>
                    <span className="text-[11px] text-slate-500">{p.city} • {p.occupation}</span>
                  </div>
                  <Badge variant={p.active_role === 'property_owner' ? 'accent' : 'brand'} size="sm">
                    {p.active_role.replace('_', ' ')}
                  </Badge>
                </button>
              ))}

              <div className="border-t border-slate-100 my-1"></div>
              {/* Owner and Admin quick switcher */}
              <button
                onClick={() => {
                  switchPersona('a0000000-0000-0000-0000-000000000007');
                  setPersonaDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 text-amber-900"
              >
                <div>
                  <div className="font-medium">Rajesh Malhotra</div>
                  <div className="text-[11px] text-slate-500">Property Owner (Verified)</div>
                </div>
                <Badge variant="accent" size="sm">Owner</Badge>
              </button>

              <button
                onClick={() => {
                  switchPersona('a0000000-0000-0000-0000-000000000009');
                  setPersonaDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 text-indigo-900"
              >
                <div>
                  <div className="font-medium">Sunil Joshi</div>
                  <div className="text-[11px] text-slate-500">Apex Realty (RERA Agent)</div>
                </div>
                <Badge variant="brand" size="sm">Agent</Badge>
              </button>

              <button
                onClick={() => {
                  switchPersona('a0000000-0000-0000-0000-000000000010');
                  setPersonaDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 text-emerald-900"
              >
                <div>
                  <div className="font-medium">SuperAdmin</div>
                  <div className="text-[11px] text-slate-500">Trust &amp; Platform Controls</div>
                </div>
                <Badge variant="trust" size="sm">Admin</Badge>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-brand-700 transition-colors">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-900 tracking-tight flex items-center gap-1">
                  NestMate
                  <span className="text-brand-600">.in</span>
                </span>
                <span className="text-[10px] text-slate-500 hidden md:inline font-medium -mt-1 tracking-wide">
                  Find Your People. Share Your Space.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {activeRole === 'property_owner' || activeRole === 'property_agent' ? (
              <Link href="/owner/add">
                <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  Post a Property
                </Button>
              </Link>
            ) : (
              <Link href="/owner/add">
                <Button variant="outline" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  Post Free Listing
                </Button>
              </Link>
            )}

            {/* Admin shortcut if admin */}
            {activeRole === 'admin' && (
              <Link href="/admin">
                <Button variant="secondary" size="sm" leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
                  Admin Panel
                </Button>
              </Link>
            )}

            {/* Owner portal link if owner/agent */}
            {(activeRole === 'property_owner' || activeRole === 'property_agent') && (
              <Link href="/owner">
                <Button variant="outline" size="sm">
                  Owner Hub
                </Button>
              </Link>
            )}

            {/* Profile Avatar & Dashboard */}
            {currentUser ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 p-1 pl-2 pr-3 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <img
                  src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={currentUser.full_name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                />
                <span className="text-xs font-semibold text-slate-800">
                  {currentUser.full_name.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                <Icon className="w-5 h-5 text-brand-600" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/owner/add"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="primary" size="md" className="w-full">
                Post Property Listing
              </Button>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="outline" size="md" className="w-full">
                My Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
