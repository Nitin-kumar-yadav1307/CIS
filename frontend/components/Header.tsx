'use client';

import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
              <div className="text-3xl font-bold">💰</div>
              <div>
                <h1 className="text-2xl font-bold">CIS</h1>
                <p className="text-sm text-blue-100">Compensation Intelligence System</p>
              </div>
            </div>
          </Link>

          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-100 transition">
              Salaries
            </Link>
            <Link href="/compare" className="hover:text-blue-100 transition">
              Compare
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
