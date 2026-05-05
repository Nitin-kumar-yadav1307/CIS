# ⚡ QUICK REFERENCE - COMMON COMMANDS

## 🚀 LOCAL DEVELOPMENT (5 Minutes to Live)

### Terminal 1: Backend Setup
```bash
cd backend

# Copy environment template
cp .env.example .env.local

# Edit .env.local and add MongoDB URI:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cis?retryWrites=true&w=majority

# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start development server (runs on port 5000)
npm run dev
```

### Terminal 2: Frontend Setup (new terminal)
```bash
cd frontend

# Copy environment template  
cp .env.local.example .env.local

# Edit .env.local if needed (defaults work locally)

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev
```

### Open Browser
- Frontend: http://localhost:3000
- Backend Health: http://localhost:5000/health
- Backend API: http://localhost:5000/api

---

## 📊 API TESTING

### Test Backend is Running
```bash
curl http://localhost:5000/health
```

Expected: `{"status":"ok"}`

### Get All Salaries
```bash
curl "http://localhost:5000/api/salaries"
```

### Get L4 Salaries at Google
```bash
curl "http://localhost:5000/api/salaries?company=google&level=L4"
```

### Get Salaries Sorted by Total Compensation (Highest First)
```bash
curl "http://localhost:5000/api/salaries?sortBy=total_compensation&sortOrder=desc&limit=10"
```

### Add New Salary Entry
```bash
curl -X POST http://localhost:5000/api/salaries/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Netflix",
    "role": "Senior Software Engineer",
    "level": "L5",
    "location": "Bangalore",
    "country": "India",
    "base_salary": 2500000,
    "bonus": 500000,
    "stock": 1000000,
    "experience_years": 7,
    "confidence": 90
  }'
```

### Get Company Statistics
```bash
curl "http://localhost:5000/api/salaries/company/google"
```

### Compare 2 Salaries (replace IDs)
```bash
curl "http://localhost:5000/api/salaries/compare/salaries?salary1=ID1&salary2=ID2"
```

---

## 📦 DEPLOYMENT

### Deploy Backend to Railway

1. Sign up at https://railway.app
2. Create new project
3. Connect GitHub repo
4. Create service from GitHub
5. Add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `PORT` = 5000 (optional, Railway assigns)
6. Deploy (automatic on git push)

Result: `https://your-project.railway.app`

### Deploy Frontend to Vercel

1. Sign up at https://vercel.com
2. Import GitHub repo (select `/frontend` directory)
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://your-project.railway.app/api`
4. Deploy (automatic on git push)

Result: `https://your-project.vercel.app`

---

## 🔧 USEFUL COMMANDS

### Backend
```bash
cd backend

npm run dev      # Start development server
npm run build    # Build TypeScript
npm run seed     # Populate database
npm run lint     # Check code style (if eslint configured)
npm test         # Run tests (if jest configured)
```

### Frontend
```bash
cd frontend

npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code style
npm test         # Run tests
```

---

## 🗄️ DATABASE MANAGEMENT

### View MongoDB Data in Browser

1. Go to https://cloud.mongodb.com
2. Log in
3. Select cluster
4. Click "Collections"
5. Browse "cis" → "salaries"
6. View all documents

### Export Salary Data
```bash
# Via MongoDB Compass (GUI)
1. Download MongoDB Compass
2. Connect with connection string
3. Select database/collection
4. Export to JSON/CSV

# Or via CLI:
mongoexport --uri "MONGO_URI" --collection salaries --out salaries.json
```

### Re-seed Database
```bash
# Delete all data and re-seed
cd backend
npm run seed
```

---

## 🐛 TROUBLESHOOTING

### "Cannot find module..."
```bash
# Solution: Install dependencies
npm install
```

### "Port 5000 already in use"
```bash
# Option 1: Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Option 2: Use different port
PORT=5001 npm run dev
```

### "MongoDB connection failed"
```bash
# Check:
1. MONGO_URI is correct in .env.local
2. IP address is whitelisted in MongoDB Atlas
3. Username/password are correct
4. Cluster is active (not paused)

# Test connection:
mongo "MONGO_URI"
```

### "API returns 400 Bad Request"
```bash
# Check:
1. Required fields present in body
2. Data types correct (base_salary is number, not string)
3. Level is valid (one of: L3, L4, L5, SDE1, SDE2, SDE3, PM1, PM2, PM3, Senior, Lead, Staff, Principal)
```

### "Frontend shows blank page"
```bash
# Check:
1. npm run dev is running
2. API_URL in .env.local is correct
3. Backend is running (http://localhost:5000/health)
4. Browser console for errors (F12)

# Solution:
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📈 PERFORMANCE CHECKS

### Check API Response Time
```bash
# Time the request
time curl http://localhost:5000/api/salaries

# Should be < 200ms
```

### Check Database Indexes
```bash
# Via MongoDB Compass:
1. Connect to database
2. Select "salaries" collection
3. Go to "Indexes" tab
4. Should see: (company, level, location) and (total_compensation DESC)
```

### Monitor Backend Performance
```bash
# Check memory usage
node --inspect=9229 src/index.ts

# Then open chrome://inspect in Chrome
```

---

## 🔐 SECURITY QUICK CHECKS

- [ ] MongoDB URI not in code (should be in .env.local)
- [ ] .env.local added to .gitignore (should be)
- [ ] Never commit API keys
- [ ] CORS enabled only for your domains
- [ ] All inputs validated with Zod
- [ ] No SQL/NoSQL injection possible (Mongoose prevents)

---

## 📋 COMMON QUERIES

### Get Salary Distribution by Level
```bash
curl "http://localhost:5000/api/salaries?level=L4" | jq '.data.salaries | length'
```

### Get Average Salary by Company
```bash
# Via API stats endpoint
curl "http://localhost:5000/api/salaries/company/google" | jq '.data.stats'
```

### Filter Multiple Companies
```bash
# API supports filtering by company
# Get multiple by calling endpoint per company or use search
```

### Export All Data to CSV
```bash
# Via MongoDB Compass export feature
# Or write custom endpoint (Phase 2 feature)
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before going live:

- [ ] Backend running locally and tested
- [ ] Frontend running locally and tested
- [ ] All 5 API endpoints working
- [ ] Filters and sorting working
- [ ] 2-salary comparison working
- [ ] Responsive design tested on mobile
- [ ] Seed data looks good
- [ ] .env.example files created
- [ ] GitHub repo clean (no .env.local committed)
- [ ] README.md complete
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Live URLs tested
- [ ] Live backend connects to live MongoDB
- [ ] Live frontend connects to live backend

---

## 📞 ERROR CODE REFERENCE

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | OK | Success |
| 400 | Bad Request | Check body/parameters |
| 404 | Not Found | Salary ID doesn't exist |
| 500 | Server Error | Check backend logs |
| ECONNREFUSED | Can't reach API | Is backend running? |
| MongoDB auth failed | DB login wrong | Check URI in .env.local |

---

## 💡 PRO TIPS

1. **Use Postman** - Save API calls for later
   ```
   Import via: File → Import → Link to GitHub repo
   ```

2. **Use MongoDB Compass** - GUI for database
   ```
   Download at: https://www.mongodb.com/products/compass
   ```

3. **Use VSCode REST Client** - Test API in editor
   ```
   Install: REST Client extension
   Create: test.http with your curl commands
   Click "Send Request"
   ```

4. **Enable Browser DevTools** - Check network tab
   ```
   F12 → Network tab → See API calls + timing
   ```

5. **Check Backend Logs** - See what's happening
   ```
   Backend terminal shows all requests: 
   [HH:MM:SS] GET /api/salaries 200 42ms
   ```

---

## 🔄 GIT WORKFLOW

```bash
# Clone repo
git clone <repo-url>
cd cis

# Setup backend
cd backend
npm install
cp .env.example .env.local
# Edit .env.local with MongoDB URI
npm run seed
npm run dev

# Setup frontend (new terminal)
cd frontend
npm install
npm run dev

# Make changes
# ... edit files ...
git add .
git commit -m "Add feature"
git push

# Deploy automatically
# → Railway picks up backend changes
# → Vercel picks up frontend changes
```

---

## ✨ NEXT STEPS AFTER LAUNCH

1. **Day 1**: Deploy to production
2. **Day 2**: Test live URLs with real data
3. **Day 3**: Add more salaries (via API)
4. **Week 2**: Collect community submissions
5. **Week 3**: Analyze trends, plan Phase 2
6. **Month 2**: Add new features based on feedback

---

**Last updated**: May 5, 2026
**Status**: Ready for launch
