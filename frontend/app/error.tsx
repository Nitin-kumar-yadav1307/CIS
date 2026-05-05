'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Unexpected error</h1>
        <p className="mt-4 text-gray-600">Please try again or return to the home page.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Go home
          </Link>
        </div>
      </main>
    </>
  );
}