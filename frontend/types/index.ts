export interface Salary {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  country: string;
  base: string;
  bonus: string;
  stock: string;
  total: string;
  totalRaw: number;
  yoe: number;
  confidence: number;
  verified: boolean;
}

export interface SalaryFilter {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  minExperience?: number;
  maxExperience?: number;
  minCompensation?: number;
  maxCompensation?: number;
  sortBy?: 'total_compensation' | 'base_salary' | 'bonus' | 'stock' | 'experience_years' | 'company';
  sortOrder?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
}

export interface SalaryListResponse {
  salaries: Salary[];
  total: number;
  skip: number;
  limit: number;
  filters: Partial<SalaryFilter>;
}

export interface CompanyStats {
  company: string;
  totalEntries: number;
  levelDistribution: Array<{ level: string; count: number }>;
  levelStats: Array<{
    level: string;
    count: number;
    median_total: number;
    median_base: number;
    median_bonus: number;
    median_stock: number;
    min_total: number;
    max_total: number;
    avg_years_exp: string;
  }>;
  overall_median: number;
  overall_min: number;
  overall_max: number;
}

export interface ComparisonResult {
  salary1: Salary;
  salary2: Salary;
  comparison: {
    base_difference: number;
    bonus_difference: number;
    stock_difference: number;
    total_difference: number;
    salary1_is_higher: boolean;
    difference_percentage: string;
  };
}
