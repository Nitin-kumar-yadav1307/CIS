'use client';

import { LEVELS } from '@/lib/constants';
import { SalaryFilter } from '@/types';

interface FilterPanelProps {
  filters: SalaryFilter;
  onFilterChange: (filters: SalaryFilter) => void;
  companies: string[];
  roles: string[];
  locations: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  companies,
  roles,
  locations,
}) => {
  const handleChange = (key: keyof SalaryFilter, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
      skip: 0, // Reset pagination when filter changes
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <select
            value={filters.company || ''}
            onChange={(e) => handleChange('company', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={filters.role || ''}
            onChange={(e) => handleChange('role', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            value={filters.level || ''}
            onChange={(e) => handleChange('level', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Min Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Experience (yrs)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={filters.minExperience || ''}
            onChange={(e) => handleChange('minExperience', e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        {/* Max Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Experience (yrs)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={filters.maxExperience || ''}
            onChange={(e) => handleChange('maxExperience', e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="100"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sortBy || 'total_compensation'}
            onChange={(e) => handleChange('sortBy', e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="total_compensation">Total Compensation</option>
            <option value="base_salary">Base Salary</option>
            <option value="bonus">Bonus</option>
            <option value="stock">Stock</option>
            <option value="experience_years">Experience</option>
            <option value="company">Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <select
            value={filters.sortOrder || 'desc'}
            onChange={(e) => handleChange('sortOrder', e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Highest First</option>
            <option value="asc">Lowest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
