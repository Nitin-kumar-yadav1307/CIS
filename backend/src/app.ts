import express from 'express';
import cors from 'cors';
import salaryRoutes from './routes/salaries';
import { getCompanyStats, compareSalaries } from './controllers/salaryController';

type BackendAppOptions = {
  includeFallbacks?: boolean;
};

export const createBackendApp = (options: BackendAppOptions = {}) => {
  const { includeFallbacks = true } = options;
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/salaries', salaryRoutes);
  app.get('/api/company/:company', getCompanyStats);
  app.get('/api/compare', compareSalaries);

  if (includeFallbacks) {
    app.use((err: any, req: any, res: any, next: any) => {
      console.error('❌ Error:', err);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    });

    app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
      });
    });
  }

  return app;
};