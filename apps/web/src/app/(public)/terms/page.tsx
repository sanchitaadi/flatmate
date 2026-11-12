import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Terms of Service
      </h1>
      <div className="prose prose-slate text-xs text-slate-600 space-y-4 leading-relaxed">
        <p>
          Welcome to NestMate. By using our website and mobile application, you agree to these Terms of Service.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">1. Eligibility &amp; User Conduct</h2>
        <p>
          Users must be at least 18 years old. Fraudulent listings, harassment, discriminatory tenant filtering on arbitrary grounds, and misleading property photos will result in immediate permanent suspension.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">2. Agent Authorization Rules</h2>
        <p>
          Real estate agents may only manage listings for properties where an explicit owner authorization has been recorded in the platform database. Agents may not claim direct property ownership or verify their own properties.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-4">3. Zero Upfront Token Payments</h2>
        <p>
          Never transfer token money or advance rent without visiting the property and verifying ownership documents in person. NestMate is not liable for unauthorized offline cash exchanges.
        </p>
      </div>
    </div>
  );
}
