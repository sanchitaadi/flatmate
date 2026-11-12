import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const cities = [
    { name: 'Bangalore', areas: 'Koramangala, Indiranagar, HSR Layout, Whitefield' },
    { name: 'Mumbai', areas: 'Bandra West, Andheri, Powai, Juhu' },
    { name: 'Delhi NCR', areas: 'Cyber City, Golf Course Road, Sector 62 Noida' },
    { name: 'Pune', areas: 'Viman Nagar, Hinjewadi, Koregaon Park, Baner' },
    { name: 'Hyderabad', areas: 'Gachibowli, HITEC City, Madhapur, Kondapur' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 mt-20">
      {/* Top Cities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-900">
        <div className="flex items-center gap-2 mb-6 text-white font-semibold text-base">
          <MapPin className="w-4 h-4 text-brand-400" />
          <span>Active Across Major Indian Tech Hubs</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {cities.map((c) => (
            <div key={c.name} className="space-y-1">
              <Link href={`/explore?city=${c.name}`} className="font-medium text-slate-200 hover:text-white transition-colors">
                {c.name}
              </Link>
              <p className="text-xs text-slate-500 leading-relaxed">{c.areas}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">NestMate</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            India&apos;s verified flatmate matching engine &amp; zero-brokerage rental property marketplace. Find compatible flatmates with transparent lifestyle matching.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Shield className="w-4 h-4" />
            <span>100% ID Verified &amp; RERA Compliant</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/explore" className="hover:text-white transition-colors">Search Rental Flats</Link></li>
            <li><Link href="/explore?category=private_room" className="hover:text-white transition-colors">Private Rooms</Link></li>
            <li><Link href="/explore?category=pg_accommodation" className="hover:text-white transition-colors">Verified PGs</Link></li>
            <li><Link href="/flatmates" className="hover:text-white transition-colors">Flatmate Swipe Deck</Link></li>
            <li><Link href="/matches" className="hover:text-white transition-colors">Mutual Matches</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Property Owners &amp; Agents</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/owner/add" className="hover:text-white transition-colors">Post Free Property</Link></li>
            <li><Link href="/owner" className="hover:text-white transition-colors">Owner Management Portal</Link></li>
            <li><Link href="/owner/enquiries" className="hover:text-white transition-colors">Tenant Enquiries</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Agent Authorization Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Owner Helpdesk</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Company &amp; Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Trust &amp; Safety</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 NestMate Technologies India Private Limited. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for modern Indian renters
        </p>
      </div>
    </footer>
  );
};
