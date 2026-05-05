import { Router } from 'express';
import {
  ingestSalary,
  getSalaries,
  getSalaryById,
  getCompanyStats,
  compareSalaries,
} from '../controllers/salaryController';

const router = Router();

// Salary endpoints
router.post('/ingest', ingestSalary);
router.get('/', getSalaries);

// Specific routes must come before the :id fallback
router.get('/company/:company', getCompanyStats);
router.get('/compare', compareSalaries);
router.get('/compare/salaries', compareSalaries);
router.get('/:id', getSalaryById);

export default router;
