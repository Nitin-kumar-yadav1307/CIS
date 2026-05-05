import { Request, Response } from 'express';
import { Salary } from '../models/Salary';
import { IngestSalarySchema, SalaryFilterSchema, IngestSalaryInput } from '../schemas/salary';
import {
  normalizeCompany,
  normalizeRole,
  calculateTotalCompensation,
} from '../utils/normalization';
import { sendSuccess, sendError, formatSalaryResponse } from '../utils/responses';

/**
 * POST /api/salaries/ingest
 * Ingest a salary entry with validation and normalization
 */
export const ingestSalary = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = IngestSalarySchema.parse(req.body) as any;

    const companyOriginal = validatedData.company as string;
    const roleOriginal = validatedData.role as string;
    const company = normalizeCompany(companyOriginal);
    const role = normalizeRole(roleOriginal);
    const level = validatedData.level;
    const location = validatedData.location;
    const country = validatedData.country;
    const baseSalary = validatedData.base_salary as number;
    const bonus = (validatedData.bonus as number) || 0;
    const stock = (validatedData.stock as number) || 0;
    const experienceYears = validatedData.experience_years;
    const confidenceScore = validatedData.confidence as number;
    const totalCompensation = calculateTotalCompensation(baseSalary, bonus, stock);

    // Prevent duplicate normalized entries
    const duplicate = await Salary.findOne({
      company,
      role,
      level,
      location,
      country,
      base_salary: baseSalary,
      bonus,
      stock,
      experience_years: experienceYears,
    }).lean();

    if (duplicate) {
      return sendError(res, 'Duplicate salary entry already exists', 409);
    }

    // Normalize data
    const normalized = {
      company,
      companyOriginal,
      role,
      roleOriginal,
      level,
      location,
      country,
      base_salary: baseSalary,
      bonus,
      stock,
      total_compensation: totalCompensation,
      experience_years: experienceYears,
      confidence_score: confidenceScore,
      source: 'ai_team' as const,
      verified: confidenceScore >= 90,
    };

    // Create and save salary entry
    const salary = new Salary(normalized);
    await salary.save();

    sendSuccess(res, formatSalaryResponse(salary), 'Salary ingested successfully', 201);
  } catch (error: any) {
    if (error.errors) {
      // Zod validation error
      const messages = Object.values(error.errors).map((e: any) => e.message).join(', ');
      sendError(res, `Validation error: ${messages}`, 400);
    } else {
      sendError(res, error.message || 'Failed to ingest salary', 500);
    }
  }
};

/**
 * GET /api/salaries
 * Get filtered, sorted salary list
 */
export const getSalaries = async (req: Request, res: Response) => {
  try {
    // Validate and parse filters
    const filters = SalaryFilterSchema.parse(req.query) as any;

    // Build MongoDB query
    const query: any = {};

    if (filters.company) {
      query.company = normalizeCompany(filters.company as string);
    }
    if (filters.role) {
      query.role = normalizeRole(filters.role as string);
    }
    if (filters.level) {
      query.level = filters.level;
    }
    if (filters.location) {
      query.location = new RegExp(filters.location as string, 'i');
    }

    // Experience range
    if (filters.minExperience !== undefined || filters.maxExperience !== undefined) {
      query.experience_years = {};
      if (filters.minExperience !== undefined) {
        query.experience_years.$gte = filters.minExperience;
      }
      if (filters.maxExperience !== undefined) {
        query.experience_years.$lte = filters.maxExperience;
      }
    }

    // Compensation range
    if (filters.minCompensation !== undefined || filters.maxCompensation !== undefined) {
      query.total_compensation = {};
      if (filters.minCompensation !== undefined) {
        query.total_compensation.$gte = filters.minCompensation;
      }
      if (filters.maxCompensation !== undefined) {
        query.total_compensation.$lte = filters.maxCompensation;
      }
    }

    // Execute query
    const sort: any = {};
    sort[filters.sortBy] = filters.sortOrder === 'asc' ? 1 : -1;

    const salaries = await Salary.find(query)
      .sort(sort)
      .skip(filters.skip)
      .limit(filters.limit)
      .lean();

    // Get total count
    const total = await Salary.countDocuments(query);

    // Format response
    const formattedSalaries = salaries.map(formatSalaryResponse);

    sendSuccess(res, {
      salaries: formattedSalaries,
      total,
      skip: filters.skip,
      limit: filters.limit,
      filters: {
        company: filters.company,
        role: filters.role,
        level: filters.level,
        location: filters.location,
      },
    });
  } catch (error: any) {
    if (error.errors) {
      const messages = Object.values(error.errors).map((e: any) => e.message).join(', ');
      sendError(res, `Validation error: ${messages}`, 400);
    } else {
      sendError(res, error.message || 'Failed to fetch salaries', 500);
    }
  }
};

/**
 * GET /api/salaries/:id
 * Get single salary entry
 */
export const getSalaryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const salary = await Salary.findById(id).lean();
    if (!salary) {
      return sendError(res, 'Salary not found', 404);
    }

    sendSuccess(res, formatSalaryResponse(salary));
  } catch (error: any) {
    sendError(res, error.message || 'Failed to fetch salary', 500);
  }
};

/**
 * GET /api/company/:company
 * Get company-level statistics
 */
export const getCompanyStats = async (req: Request, res: Response) => {
  try {
    const { company } = req.params;
    const normalizedCompany = normalizeCompany(company);

    // Get all salaries for company
    const salaries = await Salary.find({ company: normalizedCompany }).lean();

    if (salaries.length === 0) {
      return sendError(res, `No data found for company: ${company}`, 404);
    }

    // Group by level
    const byLevel: { [key: string]: any } = {};
    salaries.forEach((salary) => {
      if (!byLevel[salary.level]) {
        byLevel[salary.level] = [];
      }
      byLevel[salary.level].push(salary);
    });

    // Calculate stats per level
    const levelStats = Object.entries(byLevel).map(([level, levelSalaries]: [string, any[]]) => {
      const compensations = levelSalaries.map((s) => s.total_compensation).sort((a, b) => a - b);
      const bases = levelSalaries.map((s) => s.base_salary).sort((a, b) => a - b);
      const bonuses = levelSalaries.map((s) => s.bonus).sort((a, b) => a - b);
      const stocks = levelSalaries.map((s) => s.stock).sort((a, b) => a - b);

      const getMedian = (arr: number[]) => {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
      };

      return {
        level,
        count: levelSalaries.length,
        median_total: getMedian(compensations),
        median_base: getMedian(bases),
        median_bonus: getMedian(bonuses),
        median_stock: getMedian(stocks),
        min_total: Math.min(...compensations),
        max_total: Math.max(...compensations),
        avg_years_exp: (levelSalaries.reduce((sum, s) => sum + s.experience_years, 0) / levelSalaries.length).toFixed(1),
      };
    });

    // Overall company stats
    const allCompensations = salaries.map((s) => s.total_compensation).sort((a, b) => a - b);
    const getMedian = (arr: number[]) => {
      const mid = Math.floor(arr.length / 2);
      return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
    };

    sendSuccess(res, {
      company: salaries[0].companyOriginal,
      totalEntries: salaries.length,
      levelDistribution: Object.keys(byLevel).map((level) => ({
        level,
        count: byLevel[level].length,
      })),
      levelStats: levelStats.sort((a, b) => {
        // Sort levels in progression: L3, L4, L5, etc.
        const levelOrder = ['L3', 'L4', 'L5', 'SDE1', 'SDE2', 'SDE3', 'PM1', 'PM2', 'PM3', 'Senior', 'Lead', 'Staff', 'Principal'];
        return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
      }),
      overall_median: getMedian(allCompensations),
      overall_min: Math.min(...allCompensations),
      overall_max: Math.max(...allCompensations),
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to fetch company stats', 500);
  }
};

/**
 * GET /api/compare?salary1=id1&salary2=id2
 * Compare two salaries
 */
export const compareSalaries = async (req: Request, res: Response) => {
  try {
    const salary1 = (req.query.salary1 || req.query.salaryId1) as string | undefined;
    const salary2 = (req.query.salary2 || req.query.salaryId2) as string | undefined;

    if (!salary1 || !salary2) {
      return sendError(res, 'Both salary1 and salary2 IDs are required', 400);
    }

    const s1 = await Salary.findById(salary1).lean();
    const s2 = await Salary.findById(salary2).lean();

    if (!s1 || !s2) {
      return sendError(res, 'One or both salaries not found', 404);
    }

    sendSuccess(res, {
      salary1: formatSalaryResponse(s1),
      salary2: formatSalaryResponse(s2),
      comparison: {
        base_difference: s1.base_salary - s2.base_salary,
        bonus_difference: s1.bonus - s2.bonus,
        stock_difference: s1.stock - s2.stock,
        total_difference: s1.total_compensation - s2.total_compensation,
        salary1_is_higher: s1.total_compensation > s2.total_compensation,
        difference_percentage: (
          ((s1.total_compensation - s2.total_compensation) / s2.total_compensation) * 100
        ).toFixed(2),
      },
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to compare salaries', 500);
  }
};
