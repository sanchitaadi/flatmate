'use client';

import React from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Something went wrong</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
      >
        Try Again
      </button>
    </div>
  );
}
