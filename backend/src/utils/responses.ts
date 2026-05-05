import { Response } from 'express';
import { formatSalaryINR } from './normalization';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res: Response,
  error: string,
  statusCode: number = 400
) => {
  res.status(statusCode).json({
    success: false,
    error,
  });
};

export const formatSalaryResponse = (salary: any) => {
  return {
    id: salary._id,
    company: salary.companyOriginal,
    role: salary.roleOriginal,
    level: salary.level,
    location: salary.location,
    country: salary.country,
    base: formatSalaryINR(salary.base_salary),
    bonus: formatSalaryINR(salary.bonus),
    stock: formatSalaryINR(salary.stock),
    total: formatSalaryINR(salary.total_compensation),
    totalRaw: salary.total_compensation,
    yoe: salary.experience_years,
    confidence: salary.confidence_score,
    verified: salary.verified,
  };
};
