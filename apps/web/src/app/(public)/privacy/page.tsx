import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Privacy &amp; Data Protection Policy
      </h1>
      <div className="prose prose-slate text-xs text-slate-600 space-y-4 leading-relaxed">
        <p>
          Last updated: November 2026. NestMate Technologies India Private Limited (&ldquo;NestMate&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to safeguarding personal data in accordance with the Digital Personal Data Protection Act (DPDP) of India.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">1. Confidentiality of Residential Addresses</h2>
        <p>
          We do not publicly expose exact door numbers, flat numbers, or street building coordinates. Only generalized localities and approximate areas (e.g. Koramangala 4th Block, Bandra West) are shared on public search cards.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">2. Private Contact Number Shield</h2>
        <p>
          Your mobile phone number and identification documents are stored in private encrypted storage and are never revealed to other seekers or property owners without your explicit mutual consent.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">3. RERA Compliance and Fraud Prevention</h2>
        <p>
          Documents submitted for property verification (title deeds, utility bills, RERA registration numbers) are strictly reviewed by authorized administrators and are not accessible via public URLs.
        </p>
      </div>
    </div>
  );
}
