# Compensation Intelligence System (CIS)

A production-grade compensation intelligence platform inspired by Levels.fyi, built with structured, level-based salary data.

## 🎯 Core Concept

**Structured Data → Comparable → Decision Ready**

Unlike salary listing sites, CIS standardizes all compensation data by **LEVEL** (L3, L4, L5, SDE1, SDE2, etc.), making salaries immediately comparable across companies, roles, and locations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)

### Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Copy environment variables
cp .env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📊 API Endpoints

### GET `/api/salaries`
Fetch filtered, sorted salary list

**Query Parameters:**
- `company` - Filter by company
- `role` - Filter by role
- `level` - Filter by level (L3, L4, L5, etc.)
- `location` - Filter by location
- `sortBy` - Sort by field (default: `total_compensation`)
- `sortOrder` - `asc` or `desc` (default: `desc`)
- `skip` - Pagination offset (default: 0)
- `limit` - Results per page (default: 50)

**Example:**
```
GET /api/salaries?company=google&level=L4&sortBy=total_compensation&sortOrder=desc
```

### POST `/api/salaries/ingest`
Submit a new salary entry

**Request Body:**
```json
{
  "company": "Google",
  "role": "Software Engineer",
  "level": "L4",
  "location": "Bangalore",
  "country": "India",
  "base_salary": 1500000,
  "bonus": 300000,
  "stock": 500000,
  "experience_years": 5,
  "confidence": 95
}
```

### GET `/api/salaries/:id`
Get single salary entry details

### GET `/api/salaries/company/:company`
Get company-level statistics (median salary by level, distribution, etc.)

### GET `/api/salaries/compare/salaries?salary1=id1&salary2=id2`
Compare two salary entries side-by-side

## 🏗️ Architecture

```
CIS
├── backend/
│   ├── src/
│   │   ├── models/     - MongoDB schemas
│   │   ├── routes/     - API routes
│   │   ├── controllers/ - Business logic
│   │   ├── schemas/    - Zod validation
│   │   ├── utils/      - Helpers (normalization, formatting)
│   │   ├── db.ts       - Database connection
│   │   └── index.ts    - Express app entry
│   └── package.json
├── frontend/
│   ├── app/            - Next.js pages
│   ├── components/     - React components
│   ├── lib/            - Utils and API client
│   ├── types/          - TypeScript definitions
│   └── package.json
└── docs/
```

## 📋 Data Schema

### Salary Document

```typescript
{
  _id: ObjectId
  company: string           // Normalized: lowercase
  companyOriginal: string   // For display
  role: string             // Normalized
  roleOriginal: string     // For display
  level: string            // L3, L4, L5, SDE1, SDE2, etc.
  location: string
  country: string
  base_salary: number      // In INR
  bonus: number            // In INR (default: 0)
  stock: number            // In INR (default: 0)
  total_compensation: number // Auto-calculated
  experience_years: number
  confidence_score: number  // 0-100%
  source: string           // 'ai_team' or 'user_submission'
  verified: boolean
  created_at: Date
  updated_at: Date
}
```

## 🎓 Key Features

### ✅ MVP (Live Now)
- [x] Salary listing with level-based filtering
- [x] Company page with aggregate statistics
- [x] 2-salary comparison
- [x] Data normalization (company names, roles, levels)
- [x] Confidence scoring
- [x] Responsive UI

### 🔄 Phase 2 (Roadmap)
- [ ] Salary trends over time
- [ ] Percentile ranking
- [ ] Export to CSV
- [ ] Mobile app
- [ ] User accounts + saved searches
- [ ] Advanced analytics dashboard

### ❌ Out of Scope
- Reviews, interviews, community (see AmbitionBox)
- Job listings (see Levels.fyi)
- Auth system (MVP is anonymous)

## 🔧 Normalization Rules

All salary data is normalized for consistency:

### Company Names
```
"Google", "google", "GOOGLE" → "google"
```

### Role Names
```
"SDE", "Software Engineer", "Dev" → "software engineer"
```

### Levels
```
"L4", "Senior1", "SDE2" → Standardized to: L3, L4, L5, SDE1, SDE2, SDE3, PM1, PM2, PM3, Senior, Lead, Staff, Principal
```

### Missing Data
```
bonus/stock not provided → Default to 0
Invalid salary → Rejected
```

## 🧪 Seed Data

To populate the database with test data, run:

```bash
# Backend
npm run seed
```

This will insert 100+ sample salary entries from various companies and levels.

## 📱 UI Pages

### 1. **Salary Table** (Homepage)
- Browse all salary entries
- Filter by company, role, level, location
- Sort by total compensation, base, bonus, stock
- Pagination
- Confidence indicator

### 2. **Compare**
- Select 2 salaries
- Side-by-side comparison
- Difference calculation
- Percentage difference

### 3. **Company Page** (Future)
- All salaries for a company
- Median compensation by level
- Level distribution
- Career progression visualization

## 🔐 Security & Best Practices

- ✅ Input validation (Zod)
- ✅ MongoDB injection prevention (Mongoose)
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ TypeScript for type safety
- ⏳ Rate limiting (future)
- ⏳ Auth & rate limiting (future)

## 📊 Performance

- API response time: < 200ms (with indexes)
- Frontend load time: < 1s on 4G
- Database: Compound indexes on (company, level, location) and (total_compensation)

## 🤝 Contributing

This is a collaborative build. Share progress, blockers, and decisions early.

## 📝 License

MIT

---

**Built with clarity. Designed for comparability. Made for decisions.**
