import axios from 'axios';
import { Salary, SalaryFilter, SalaryListResponse, CompanyStats, ComparisonResult } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
