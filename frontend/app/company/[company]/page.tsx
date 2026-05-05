'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import SalaryTable from '@/components/SalaryTable';
import salaryAPI from '@/lib/api';
import { CompanyStats, Salary } from '@/types';
import { formatCurrency } from '@/lib/constants';

export default function CompanyPage() {
  const params = useParams<{ company: string }>();
  const router = useRouter();
  const companySlug = params.company;
  const [company, setCompany] = useState<CompanyStats | null>(null);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setIsLoading(true);
        setError('');
        const [stats, salaryList] = await Promise.all([
          salaryAPI.getCompanyStats(companySlug),
          salaryAPI.getSalaries({ company: companySlug, limit: 100 }),
        ]);

        setCompany(stats);
        setSalaries(salaryList.salaries);
      } catch (fetchError) {
        console.error('Failed to fetch company page:', fetchError);
        setError('No company data found for this page.');
      } finally {
        setIsLoading(false);
      }
    };

    if (companySlug) {
      fetchCompany();
    }
  }, [companySlug]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        </main>
      </>
    );
  }

  if (error || !company) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Company page not found</h2>
            <p className="text-gray-600 mb-6">{error || 'No data available for this company.'}</p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Back to salaries
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">Company Page</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">{company.company}</h2>
          <p className="text-gray-600 mt-2">Structured salary data for level-based comparison.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Total entries</p>
              <p className="text-2xl font-bold text-gray-900">{company.totalEntries}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Median compensation</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(company.overall_median)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Min compensation</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(company.overall_min)}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Max compensation</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(company.overall_max)}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Level distribution</h3>
            <div className="space-y-3">
              {company.levelDistribution.map((item) => (
                <div key={item.level} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-900">{item.level}</span>
                  <span className="text-gray-600">{item.count} entries</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Median by level</h3>
            <div className="space-y-3">
              {company.levelStats.map((item) => (
                <div key={item.level} className="rounded-lg bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{item.level}</span>
                    <span className="text-gray-600">{item.count} entries</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Median: {formatCurrency(item.median_total)}</p>
                    <p>YoE: {item.avg_years_exp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Salary entries</h3>
          <SalaryTable salaries={salaries} isLoading={false} />
        </section>
      </main>
    </>
  );
}