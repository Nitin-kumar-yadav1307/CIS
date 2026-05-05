import axios from 'axios';
import { Salary, SalaryFilter, SalaryListResponse, CompanyStats, ComparisonResult } from '../types';

// Prefer same-origin in production. If NEXT_PUBLIC_API_URL points to localhost,
// fall back to '/api' so deployed frontend talks to the deployed backend.
const API_URL = (() => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (!env) return '/api';
  try {
    const u = new URL(env);
    const host = u.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return '/api';
    return env.replace(/\/+$/, '');
  } catch (e) {
    // env might be a relative path already
    return env;
  }
})();

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const salaryAPI = {
  /**
   * Get filtered salaries
   */
  async getSalaries(filters?: SalaryFilter): Promise<SalaryListResponse> {
    const response = await client.get('/salaries', { params: filters });
    return response.data.data;
  },

  /**
   * Get single salary
   */
  async getSalaryById(id: string): Promise<Salary> {
    const response = await client.get(`/salaries/${id}`);
    return response.data.data;
  },

  /**
   * Ingest a new salary
   */
  async ingestSalary(data: any) {
    const response = await client.post('/salaries/ingest', data);
    return response.data.data;
  },

  /**
   * Get company statistics
   */
  async getCompanyStats(company: string): Promise<CompanyStats> {
    const response = await client.get(`/company/${company}`);
    return response.data.data;
  },

  /**
   * Compare two salaries
   */
  async compareSalaries(salary1Id: string, salary2Id: string): Promise<ComparisonResult> {
    const response = await client.get('/compare', {
      params: { salaryId1: salary1Id, salaryId2: salary2Id },
    });
    return response.data.data;
  },
};

export default salaryAPI;
