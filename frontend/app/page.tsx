'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SalaryTable from '@/components/SalaryTable';
import FilterPanel from '@/components/FilterPanel';
import salaryAPI from '@/lib/api';
import { Salary, SalaryFilter, SalaryListResponse } from '@/types';

export default function Home() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [filters, setFilters] = useState<SalaryFilter>({
    sortBy: 'total_compensation',
    sortOrder: 'desc',
    skip: 0,
    limit: 50,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [companies, setCompanies] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  // Fetch salaries
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setIsLoading(true);
        const response = await salaryAPI.getSalaries(filters);
        setSalaries(response.salaries);
        setTotal(response.total);

        // Extract unique values for filters (on first load)
        if (companies.length === 0) {
          const uniqueCompanies = Array.from(new Set(response.salaries.map((s) => s.company)));
          const uniqueRoles = Array.from(new Set(response.salaries.map((s) => s.role)));
          const uniqueLocations = Array.from(new Set(response.salaries.map((s) => s.location)));

          setCompanies(uniqueCompanies.sort());
          setRoles(uniqueRoles.sort());
          setLocations(uniqueLocations.sort());
        }
      } catch (error) {
        console.error('Failed to fetch salaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalaries();
  }, [filters]);

  const handleFilterChange = (newFilters: SalaryFilter) => {
    setFilters(newFilters);
  };

  const handleSelectSalary = (salary: Salary) => {
    // Could implement modal or detail view here
    console.log('Selected salary:', salary);
  };

  const handleExportCsv = () => {
    if (salaries.length === 0) return;

    const headers = ['Company', 'Role', 'Level', 'Location', 'Country', 'YoE', 'Base', 'Bonus', 'Stock', 'Total', 'Confidence'];
    const rows = salaries.map((salary) => [
      salary.company,
      salary.role,
      salary.level,
      salary.location,
      salary.country,
      salary.yoe,
      salary.base,
      salary.bonus,
      salary.stock,
      salary.total,
      salary.confidence,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `cis-salaries-${Date.now()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Salary Intelligence</h2>
          <p className="text-gray-600 mt-2">
            Browse {total} verified salary entries, structured by level
          </p>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          companies={companies}
          roles={roles}
          locations={locations}
        />

        {/* Results Summary */}
        <div className="mt-6 mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing {salaries.length} of {total} results
          </p>
          <button
            onClick={handleExportCsv}
            disabled={salaries.length === 0}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SalaryTable
            salaries={salaries}
            isLoading={isLoading}
            onSelectSalary={handleSelectSalary}
          />
        </div>

        {/* Pagination */}
        {total > filters.limit! && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  skip: Math.max(0, filters.skip! - filters.limit!),
                })
              }
              disabled={filters.skip! === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {Math.floor(filters.skip! / filters.limit!) + 1}
              </span>
            </div>

            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  skip: filters.skip! + filters.limit!,
                })
              }
              disabled={filters.skip! + filters.limit! >= total}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}
