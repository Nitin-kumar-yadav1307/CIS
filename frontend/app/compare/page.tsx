'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SalaryTable from '@/components/SalaryTable';
import salaryAPI from '@/lib/api';
import { Salary, ComparisonResult } from '@/types';
import { formatCurrency } from '@/lib/constants';

export default function ComparePage() {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<[string | null, string | null]>([null, null]);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [total, setTotal] = useState(0);

  // Fetch initial salaries
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setIsLoading(true);
        const response = await salaryAPI.getSalaries({ limit: 100 });
        setSalaries(response.salaries);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to fetch salaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  // Perform comparison
  useEffect(() => {
    const performComparison = async () => {
      if (!selectedIds[0] || !selectedIds[1]) {
        setComparison(null);
        return;
      }

      try {
        const result = await salaryAPI.compareSalaries(selectedIds[0], selectedIds[1]);
        setComparison(result);
      } catch (error) {
        console.error('Failed to compare:', error);
      }
    };

    performComparison();
  }, [selectedIds]);

  const handleSelectSalary = (salary: Salary, position: 0 | 1) => {
    const newIds: [string | null, string | null] = [...selectedIds];
    newIds[position] = salary.id;
    setSelectedIds(newIds);
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Compare Salaries</h2>
          <p className="text-gray-600 mt-2">Select two salaries to compare side-by-side</p>
        </div>

        {/* Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Select Salary 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary 1</h3>
            {selectedIds[0] ? (
              <div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  {comparison?.salary1 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">{comparison.salary1.company}</p>
                      <p className="text-sm text-gray-600">
                        {comparison.salary1.role} • {comparison.salary1.level}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{comparison.salary1.total}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedIds([null, selectedIds[1]])}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {salaries.map((salary) => (
                  <div
                    key={salary.id}
                    onClick={() => handleSelectSalary(salary, 0)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                  >
                    <p className="font-medium text-gray-900">{salary.company}</p>
                    <p className="text-sm text-gray-600">{salary.role} • {salary.level}</p>
                    <p className="text-sm font-semibold text-gray-900">{salary.total}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Select Salary 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary 2</h3>
            {selectedIds[1] ? (
              <div>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  {comparison?.salary2 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">{comparison.salary2.company}</p>
                      <p className="text-sm text-gray-600">
                        {comparison.salary2.role} • {comparison.salary2.level}
                      </p>
                      <p className="text-lg font-bold text-gray-900">{comparison.salary2.total}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedIds([selectedIds[0], null])}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {salaries.map((salary) => (
                  <div
                    key={salary.id}
                    onClick={() => handleSelectSalary(salary, 1)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer transition"
                  >
                    <p className="font-medium text-gray-900">{salary.company}</p>
                    <p className="text-sm text-gray-600">{salary.role} • {salary.level}</p>
                    <p className="text-sm font-semibold text-gray-900">{salary.total}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Results */}
        {comparison && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Base Salary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Base Salary</p>
                <p className="text-lg font-semibold text-gray-900">
                  {comparison.comparison.base_difference > 0 ? '+' : ''}
                  {formatCurrency(comparison.comparison.base_difference)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {comparison.salary1.base} vs {comparison.salary2.base}
                </p>
              </div>

              {/* Bonus */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Bonus</p>
                <p className="text-lg font-semibold text-gray-900">
                  {comparison.comparison.bonus_difference > 0 ? '+' : ''}
                  {formatCurrency(comparison.comparison.bonus_difference)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {comparison.salary1.bonus} vs {comparison.salary2.bonus}
                </p>
              </div>

              {/* Stock */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Stock</p>
                <p className="text-lg font-semibold text-gray-900">
                  {comparison.comparison.stock_difference > 0 ? '+' : ''}
                  {formatCurrency(comparison.comparison.stock_difference)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {comparison.salary1.stock} vs {comparison.salary2.stock}
                </p>
              </div>

              {/* Total Difference */}
              <div
                className={`p-4 rounded-lg ${
                  comparison.comparison.salary1_is_higher
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-blue-50 border-2 border-blue-200'
                }`}
              >
                <p className="text-sm text-gray-600 mb-2">Total Difference</p>
                <p className="text-lg font-semibold text-gray-900">
                  {comparison.comparison.total_difference > 0 ? '+' : ''}
                  {formatCurrency(comparison.comparison.total_difference)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ({comparison.comparison.difference_percentage}%)
                </p>
              </div>

              {/* Winner */}
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <p className="text-sm text-gray-600 mb-2">Higher Offer</p>
                <p className="text-lg font-semibold text-gray-900">
                  {comparison.comparison.salary1_is_higher ? 'Salary 1' : 'Salary 2'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {comparison.comparison.salary1_is_higher
                    ? comparison.salary1.company
                    : comparison.salary2.company}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Message */}
        {!selectedIds[0] || !selectedIds[1] ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-900">Select two salaries above to see detailed comparison</p>
          </div>
        ) : null}
      </main>
    </>
  );
}
