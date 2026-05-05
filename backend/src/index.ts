import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import salaryRoutes from './routes/salaries';
import { getCompanyStats, compareSalaries } from './controllers/salaryController';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/salaries', salaryRoutes);
app.get('/api/company/:company', getCompanyStats);
app.get('/api/compare', compareSalaries);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 Salary API ready at http://localhost:${PORT}/api/salaries`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
