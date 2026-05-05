'use client';

import Link from 'next/link';
import { Salary } from '@/types';
import { formatCurrency } from '@/lib/constants';

interface SalaryTableProps {
  salaries: Salary[];
  isLoading: boolean;
  onSelectSalary?: (salary: Salary) => void;
}

export const SalaryTable: React.FC<SalaryTableProps> = ({ salaries, isLoading, onSelectSalary }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (salaries.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No salaries found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Level</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">YoE</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Base</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Bonus</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Stock</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary, index) => (
            <tr
              key={salary.id}
              className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
              onClick={() => onSelectSalary?.(salary)}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                <Link
                  href={`/company/${encodeURIComponent(salary.company)}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {salary.company}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{salary.role}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {salary.level}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{salary.location}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{salary.yoe} yrs</td>
              <td className="px-4 py-3 text-sm text-right text-gray-700">{salary.base}</td>
              <td className="px-4 py-3 text-sm text-right text-gray-700">{salary.bonus}</td>
              <td className="px-4 py-3 text-sm text-right text-gray-700">{salary.stock}</td>
              <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">{salary.total}</td>
              <td className="px-4 py-3 text-center text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    salary.confidence >= 90
                      ? 'bg-green-100 text-green-800'
                      : salary.confidence >= 75
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {salary.confidence}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
