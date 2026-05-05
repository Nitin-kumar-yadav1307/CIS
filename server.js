const path = require('path');

process.env.TS_NODE_PROJECT = path.join(__dirname, 'backend', 'tsconfig.json');
process.env.TS_NODE_TRANSPILE_ONLY = 'true';

require('ts-node/register/transpile-only');

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, 'backend', '.env.local') });

const express = require('express');
const { createBackendApp } = require('./backend/src/app');
const { connectDB } = require('./backend/src/db');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 10000;
const frontendDir = path.join(__dirname, 'frontend');
const next = require(path.join(frontendDir, 'node_modules', 'next'));

const nextApp = next({ dev, dir: frontendDir });
const handle = nextApp.getRequestHandler();

async function start() {
  await connectDB();
  await nextApp.prepare();

  const app = express();
  app.use(createBackendApp({ includeFallbacks: false }));

  app.all('*', (req, res) => handle(req, res));

  app.listen(PORT, () => {
    console.log(`✅ Unified server running on http://localhost:${PORT}`);
    console.log(`✅ Frontend + API served from one URL`);
  });
}

start().catch((error) => {
  console.error('❌ Failed to start unified server:', error);
  process.exit(1);
});