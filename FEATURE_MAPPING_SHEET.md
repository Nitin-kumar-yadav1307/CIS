# FEATURE MAPPING SHEET

## Core Feature Comparison

| Feature | Levels.fyi | 6figr | AmbitionBox | Glassdoor | Build? | Priority |
|---------|-----------|-------|-------------|-----------|--------|----------|
| **CORE: Salary Table** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P0 |
| **CORE: Filter by Level** | ✅ YES | ✅ YES | ❌ NO | ❌ NO | ✅ BUILD | P0 |
| **CORE: Filter by Company** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P0 |
| **CORE: Filter by Role** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P0 |
| **CORE: Filter by Location** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P0 |
| **CORE: Sort by Total Comp** | ✅ YES | ✅ YES | ⚠️ PARTIAL | ❌ NO | ✅ BUILD | P0 |
| **CORE: Company Page** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P1 |
| **CORE: Median by Level** | ✅ YES | ✅ YES | ❌ NO | ❌ NO | ✅ BUILD | P1 |
| **CORE: Level Distribution** | ✅ YES | ⚠️ PARTIAL | ❌ NO | ❌ NO | ✅ BUILD | P1 |
| **CORE: 2-Way Comparison** | ⚠️ PARTIAL | ✅ YES | ❌ NO | ❌ NO | ✅ BUILD | P2 |
| | | | | | | |
| **DATA: Structured Salary Data** | ✅ YES | ✅ YES | ⚠️ MIXED | ⚠️ MIXED | ✅ BUILD | P0 |
| **DATA: Base + Bonus + Stock** | ✅ YES | ✅ YES | ✅ YES | ⚠️ RANGES | ✅ BUILD | P0 |
| **DATA: Confidence Score** | ⚠️ PARTIAL | ✅ YES | ❌ NO | ❌ NO | ✅ BUILD | P1 |
| **DATA: Level Standardization** | ✅ YES | ✅ YES | ❌ NO | ❌ NO | ✅ BUILD | P0 |
| **DATA: Company Normalization** | ✅ YES | ✅ YES | ⚠️ PARTIAL | ⚠️ PARTIAL | ✅ BUILD | P0 |
| | | | | | | |
| **UX: Clean Table View** | ✅ YES | ✅ YES | ⚠️ CLUTTERED | ⚠️ CLUTTERED | ✅ BUILD | P0 |
| **UX: Server-side Filtering** | ✅ YES | ✅ YES | ⚠️ CLIENT-SIDE | ⚠️ CLIENT-SIDE | ✅ BUILD | P1 |
| **UX: Empty States** | ✅ YES | ✅ YES | ⚠️ PARTIAL | ⚠️ PARTIAL | ✅ BUILD | P1 |
| **UX: Mobile Responsive** | ✅ YES | ✅ YES | ✅ YES | ✅ YES | ✅ BUILD | P1 |
| | | | | | | |
| **PREMIUM: Reviews** | ❌ NO | ❌ NO | ✅ YES | ✅ YES | ❌ DON'T | Out of Scope |
| **PREMIUM: Interviews** | ❌ NO | ❌ NO | ✅ YES | ⚠️ PARTIAL | ❌ DON'T | Out of Scope |
| **PREMIUM: Community** | ❌ NO | ❌ NO | ✅ YES | ✅ YES | ❌ DON'T | Out of Scope |
| **PREMIUM: Job Listings** | ⚠️ SECONDARY | ⚠️ SECONDARY | ⚠️ SECONDARY | ✅ PRIMARY | ❌ DON'T | Out of Scope |
| **PREMIUM: Offer Analysis** | ❌ NO | ✅ YES | ❌ NO | ❌ NO | ❌ DON'T | Phase 2 |
| **PREMIUM: Benchmarking** | ✅ B2B ONLY | ✅ B2B ONLY | ⚠️ LIMITED | ⚠️ LIMITED | ❌ DON'T | Phase 2 |

---

## Phase 1: MVP Features (MUST BUILD)

### Pages
- [ ] Salary Table Page (core)
- [ ] Company Page (show company-wide stats)
- [ ] Compare Page (2-salary comparison)
- [ ] 404 / Error pages

### Functionality
- [ ] GET /salaries (with filters + sorting)
- [ ] GET /company/:name (aggregate data)
- [ ] GET /compare (2-salary comparison)
- [ ] POST /ingest-salary (receive salary data)
- [ ] Input validation + normalization

### Data Quality
- [ ] Company name normalization (lowercase, trim)
- [ ] Level standardization (L3, L4, L5, etc.)
- [ ] Role standardization (SDE → Software Engineer)
- [ ] Duplicate detection
- [ ] Missing data handling (bonus/stock → 0)

---

## Phase 2: Advanced Features (Nice to Have)

### Analytics
- [ ] Salary trends over time
- [ ] Career progression visualization
- [ ] Percentile ranking (where do you stand?)

### Enhanced UX
- [ ] Offer upload + analysis (OfferGPT lite)
- [ ] Salary calculator (estimate your package)
- [ ] Export to CSV

### Community (Future)
- [ ] Reviews (out of scope)
- [ ] Discussions (out of scope)

---

## Feature Building Priority

### P0: MUST HAVE (Ship with MVP)
1. ✅ Salary table with level-based filtering
2. ✅ Company page with aggregate stats
3. ✅ 2-salary comparison
4. ✅ Level standardization
5. ✅ Company name normalization
6. ✅ Confidence score display

### P1: SHOULD HAVE (Week 2-3)
1. ⚠️ Advanced filtering (location range, YoE range)
2. ⚠️ Salary trends (historical data)
3. ⚠️ Export to CSV
4. ⚠️ Better error states

### P2: NICE TO HAVE (Future)
1. ⚠️ AI offer analysis
2. ⚠️ Percentile ranking
3. ⚠️ Job board integration
4. ⚠️ Auth + saved searches

---

## Data Model Requirements

### Salary Entry (MongoDB Document)
```json
{
  "_id": "ObjectId",
  "company": "google",           // NORMALIZED: lowercase, trimmed
  "companyOriginal": "Google",   // For display
  "role": "software engineer",   // NORMALIZED
  "roleOriginal": "SDE",         // For display
  "level": "L4",                 // STANDARDIZED
  "location": "Bangalore",
  "country": "India",
  "base_salary": 1500000,        // INR (in lowest denomination or actual)
  "bonus": 300000,               // INR, default 0
  "stock": 500000,               // INR, default 0
  "total_compensation": 2300000, // AUTO-CALCULATED
  "experience_years": 5,
  "confidence_score": 95,        // 0-100%
  "source": "ai_team",           // "ai_team" or "user_submission"
  "verified": true,              // true if high confidence
  "created_at": "2025-05-05T10:00:00Z",
  "updated_at": "2025-05-05T10:00:00Z"
}
```

### API Request: POST /ingest-salary
```json
{
  "company": "Google",
  "role": "SDE",
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

**Validation**:
- All fields present ✓
- Level in [L3, L4, L5, SDE1, SDE2, PM1, etc.]
- Numbers > 0 ✓
- Experience 0-100 ✓

### API Response: GET /salaries
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "id": "xxx",
      "company": "Google",
      "role": "Software Engineer",
      "level": "L4",
      "location": "Bangalore",
      "base": "₹15,00,000",
      "bonus": "₹3,00,000",
      "stock": "₹5,00,000",
      "total": "₹23,00,000",
      "yoe": 5,
      "confidence": 95
    }
  ],
  "filters_applied": {
    "level": ["L4"],
    "company": ["google"],
    "location": ["Bangalore"]
  }
}
```

---

## Final Architecture Decision

### Frontend
- React 18
- Next.js (pages + API routes)
- TypeScript
- Tailwind CSS
- TanStack Table (React Table) for data table

### Backend
- Node.js + Express
- TypeScript
- MongoDB (Atlas)
- Validation: Zod

### Deployment
- Frontend: Vercel
- Backend: Railway or Render
- Database: MongoDB Atlas (free tier for MVP)

---

## Success Criteria

✅ **MVP is successful when**:
1. User can view 100+ salary entries in a clean table
2. User can filter by Level and see relevant results
3. User can view a company page with median salary by level
4. User can compare 2 salaries side-by-side
5. All salary data is standardized (no data smell)
6. API response time < 200ms
7. UI loads in < 1s on 4G

---

## Rollout Plan

### Day 1-2: Backend Setup
- [ ] MongoDB schema + validation
- [ ] POST /ingest-salary endpoint
- [ ] GET /salaries endpoint with filters

### Day 2: Frontend Setup
- [ ] Next.js scaffolding
- [ ] Salary table component
- [ ] Filter UI

### Day 2-3: Integration
- [ ] Connect frontend to backend
- [ ] Test filtering, sorting
- [ ] Deploy to Vercel + Railway

### Day 3: Polish
- [ ] Company page
- [ ] Compare page
- [ ] Error handling
- [ ] Mobile responsive

---

## Notes

- **No Auth in MVP**: Let's build trust through open data
- **Data Seeding**: Start with 100-200 sample entries (we create manually or AI generates)
- **Rate Limiting**: Not needed for MVP, add later
- **Caching**: Start simple, add Redis later if needed
