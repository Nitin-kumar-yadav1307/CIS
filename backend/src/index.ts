import dotenv from 'dotenv';
import path from 'path';
import { createBackendApp } from './app';
import { connectDB } from './db';

dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config();

const app = createBackendApp();
const PORT = process.env.PORT || 5000;

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
