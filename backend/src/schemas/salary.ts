import { z } from 'zod';

export const VALID_LEVELS = ['L3', 'L4', 'L5', 'SDE1', 'SDE2', 'SDE3', 'PM1', 'PM2', 'PM3', 'Senior', 'Lead', 'Staff', 'Principal'] as const;

export const IngestSalarySchema = z.object({
  company: z.string().min(1, 'Company is required').trim(),
  role: z.string().min(1, 'Role is required').trim(),
  level: z.enum(VALID_LEVELS, {
    errorMap: () => ({ message: `Level must be one of: ${VALID_LEVELS.join(', ')}` }),
  }),
  location: z.string().min(1, 'Location is required').trim(),
  country: z.string().trim().default('India'),
  base_salary: z.number().positive('Base salary must be positive'),
  bonus: z.number().nonnegative('Bonus cannot be negative').default(0),
  stock: z.number().nonnegative('Stock cannot be negative').default(0),
  experience_years: z.number().int().nonnegative('Experience must be non-negative').lte(100, 'Experience must be <= 100'),
  confidence: z.number().int().min(0, 'Confidence must be >= 0').max(100, 'Confidence must be <= 100').default(75),
});

export type IngestSalaryInput = z.infer<typeof IngestSalarySchema>;

export const SalaryFilterSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  level: z.string().optional(),
  location: z.string().optional(),
  minExperience: z.coerce.number().nonnegative().optional(),
  maxExperience: z.coerce.number().nonnegative().optional(),
  minCompensation: z.coerce.number().positive().optional(),
  maxCompensation: z.coerce.number().positive().optional(),
  sortBy: z.enum(['total_compensation', 'base_salary', 'bonus', 'stock', 'experience_years', 'company']).default('total_compensation'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  skip: z.coerce.number().nonnegative().default(0),
  limit: z.coerce.number().positive().default(50),
});

export type SalaryFilterInput = z.infer<typeof SalaryFilterSchema>;
