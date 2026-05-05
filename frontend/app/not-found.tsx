import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">404</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-4 text-gray-600">The page you are looking for does not exist or has moved.</p>
        <Link
          href="/"
          className="inline-flex mt-8 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Back to salaries
        </Link>
      </main>
    </>
  );
}