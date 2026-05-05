# REVERSE ENGINEERING ANALYSIS
## Compensation Intelligence System Research

---

## 1. PLATFORM ANALYSIS

### LEVELS.FYI (PRIMARY REFERENCE)
**URL**: https://www.levels.fyi/

#### Strengths ✅
- **Core Concept**: Standardizes by LEVEL (L3, L4, L5, etc.), not job title
- **Data Focus**: Structured salary data with high confidence
- **Filters**: Company, Role, Level, Location
- **Breakdown**: Shows base + bonus + stock + total compensation
- **Advanced Features**:
  - Salary calculator
  - Salary heatmap (geographic insights)
  - Verified salaries section
  - H-1B salary tracking
  - Internship salaries
  - Benefits tracking
- **User Flow**:
  - Search by company → See salary bands by level
  - Filters are server-side (fast, clean UX)
  - Table shows: Level, Base, Bonus, Stock, Total, Years Exp
- **Services for Employers**: Compensation benchmarking, talent pool, interactive offers
- **Key Insight**: LEVEL is the differentiator - same role ≠ same pay

#### Weaknesses ❌
- Primary focus on tech/US market
- India presence not strong

---

### 6FIGR.COM (SECONDARY REFERENCE)
**URL**: https://6figr.com/

#### Strengths ✅
- **Scope**: 150+ countries, 9.3M+ users
- **Core Features**:
  - Compare salaries across companies and roles
  - OfferGPT: Upload offer letter → AI analysis + market data
  - Career rankings (percentile-based)
  - Resume heatmap analyzer
  - Layoff tracking (interesting)
  - "Switch" feature: Show career path flows
- **Data**: 20.6M+ salary searches answered
- **Compensation Components**: Clearly separated (base, stock, bonus)
- **Filters**: Company, role, location, experience level

#### Weaknesses ❌
- Less emphasis on structured LEVELS
- Tries to do too much (layoffs, career roast, etc.) - dilutes focus
- Not India-specific
- Heavy feature bloat

---

### AMBITIONBOX.COM (COMPETITOR ANALYSIS - WHAT NOT TO DO)
**URL**: https://www.ambitionbox.com/

#### Strengths ✅
- **India-focused**: Shows salary in Lakhs (INR), Indian cities
- **Community**: Strong community feature (discussions, salary talks, interviews)
- **Data Volume**: 4 Crore+ salaries, 95 Lakh+ reviews, 10 Lakh+ interviews
- **Rich Context**: Company reviews, office photos, benefits, interview experiences
- **User Engagement**: Personalized feed, communities by department/city

#### CRITICAL WEAKNESSES ❌
- **NO LEVEL STANDARDIZATION**: Shows salary but doesn't normalize by career level
- **Unstructured Data**: Mix of reviews (subjective) + salary (objective) = confusion
- **Missing Comparability**: Can't easily compare "SDE2 at Google vs SDE2 at Flipkart"
- **Salary as Afterthought**: Community is primary, salary is secondary
- **Example Shown**: "₹35.8 LAKHS, 4 YEARS EXP" - no level indicator!
- **Problem**: Person A's "Software Developer" might be L3, Person B's might be L5

**THIS IS THE FLAW WE FIX**

---

### GLASSDOOR.CO.IN (COMPETITOR ANALYSIS - WHAT NOT TO DO)
**URL**: https://www.glassdoor.co.in/

#### Strengths ✅
- **Scope**: Large salary database
- **Search**: Extensive job listings by city, role, company
- **Reviews**: Strong review section (culture, salary, interviews)
- **Ease of Use**: Simple interface, tons of city filtering

#### CRITICAL WEAKNESSES ❌
- **Job Search First, Salary Second**: Not a compensation intelligence platform
- **No Level Differentiation**: Shows "Software Engineer" without level standardization
- **Unstructured Salary Data**: Mixes verified + user-submitted salary data
- **No Advanced Filtering**: Can't search "L4 Software Engineer at Google in Bangalore"
- **Compensation Confusion**: Same title, vastly different pay - no standardization
- **Missing**: Salary calculator, offer analysis, career progression tracking

**NOT A COMPENSATION PLATFORM - IT'S A JOB BOARD**

---

### INDIATECHSALARIES.COM (NICHE PLAYER)
**URL**: https://www.indiatechsalaries.com/

Status: Could not fetch detailed data, but based on name:
- Likely focuses on tech salaries in India
- Specialized but smaller community
- Probably missing some of the features we'll build

---

## 2. CORE FLOW ANALYSIS

### SALARY LISTING PAGE (Most Important)
**Levels.fyi Flow**:
1. User lands on role page (e.g., "Software Engineer")
2. Server-side filters: Company, Level, Location, Experience
3. Table renders with: Level | Company | Base | Bonus | Stock | Total | Years
4. Can sort by Total Compensation (highest first)
5. Click on row → See individual salary details

**What's Missing in Competitors**:
- ❌ AmbitionBox: No level column, just experience years
- ❌ Glassdoor: Salary ranges, not individual data points + level

**Our Approach**:
- ✅ Mandatory level field (L3, L4, L5, SDE1, SDE2, etc.)
- ✅ Server-side filtering for performance
- ✅ Sortable by all major columns
- ✅ Confidence score per salary (AI-generated)

---

### COMPANY PAGE (Secondary)
**Levels.fyi Flow**:
1. User clicks on company (e.g., "Google")
2. Shows median compensation by level: L3 → L4 → L5 (progression)
3. Pie chart: Level distribution (most engineers are L4, etc.)
4. Median salary trend over time (if available)

**Our Approach**:
- ✅ Show ALL salaries for company (filterable by role)
- ✅ Calculate median by level
- ✅ Show level distribution
- ✅ Show salary progression (L3 → L4 → L5)

---

### SALARY SUBMISSION FLOW
**Levels.fyi Flow**:
1. User clicks "Add Salary"
2. Form with fields:
   - Company (autocomplete)
   - Role (autocomplete)
   - Level (REQUIRED, standardized)
   - Location
   - Base, Bonus, Stock
   - Years of Experience
   - Total Compensation (auto-calculated)
3. Confidence score (AI-determined)
4. Submit → Data added to database

**Our Approach**:
- ✅ Structured form (no free text)
- ✅ Dropdowns for company/role/level
- ✅ Validation on all fields
- ✅ Auto-calculate total compensation
- ✅ Confidence score from AI team

---

### COMPARISON FEATURE
**6figr Approach**:
- Select 2+ salaries/roles
- Side-by-side comparison
- Show: Base | Bonus | Stock | Total
- Percentile comparison (how does this compare to peers?)

**Our MVP**: Single comparison (2 salaries)
**Future**: Multi-salary, percentile ranking

---

## 3. FILTERING & SORTING REQUIREMENTS

### Required Filters
| Filter | Type | Values |
|--------|------|--------|
| Company | Dropdown (multi-select) | Google, Amazon, Microsoft, etc. |
| Role | Dropdown (multi-select) | SDE, PM, Designer, etc. |
| Level | Dropdown (multi-select) | L3, L4, L5 (standardized) |
| Location | Dropdown (multi-select) | Bangalore, US, etc. |
| Experience (optional) | Range | 0-20 years |

### Required Sorting
- Sort by: Total Compensation (default)
- Sort by: Base Salary
- Sort by: Bonus
- Sort by: Stock
- Sort by: Company (A-Z)

---

## 4. DATA SCHEMA OBSERVATIONS

### What Levels.fyi Shows
```
Company | Role | Level | Location | Base | Bonus | Stock | Total | YoE | Verified
Google  | SDE  | L4    | US       | 200K | 40K   | 200K  | 440K  | 5   | ✓
```

### What We Need (Including Confidence)
```
Company | Role | Level | Location | Base | Bonus | Stock | Total | YoE | Confidence
Google  | SDE  | L4    | US       | 200K | 40K   | 200K  | 440K  | 5   | 95%
```

---

## 5. KEY DIFFERENTIATORS (What We Build Different)

### ✅ STANDARDIZED LEVELS (Core Differentiator)
- Every salary entry MUST have a level
- Level: L3, L4, L5, SDE1, SDE2, Senior, etc.
- This is what makes us comparable

### ✅ STRUCTURED DATA ONLY
- No reviews (that's AmbitionBox's job)
- No interviews (that's AmbitionBox's job)
- No community chatter (that's AmbitionBox's job)
- Just: Salary data, clean, queryable, comparable

### ✅ CONFIDENCE SCORING
- Every salary has a confidence %
- Based on: verification, recency, source
- Shows which data is trustworthy

### ✅ INDIA-FIRST (Unlike Levels.fyi)
- Primary currency: INR
- Primary locations: Indian cities
- Secondary: Global tech salaries
- This is our unique angle

### ✅ SMART NORMALIZATION
- Company names normalized (Google, google, GOOGLE → "google")
- Role standardization (SDE, Software Engineer, Dev → "software engineer")
- Level standardization (L4, Senior1, SDE2 → L4)

---

## 6. EDGE CASES TO HANDLE

| Edge Case | Current Problem | Our Solution |
|-----------|-----------------|--------------|
| "Google" vs "google" vs "GOOGLE" | Data split across 3 entries | Normalize to lowercase, store normalized version |
| Missing bonus/stock | Data incomplete | Default to 0, flag as "salary only" |
| Duplicate entries | Same person submits twice | Use hash of (company, role, level, yoe) to detect |
| Invalid numbers | Negative salary, 999M salary | Validate ranges, reject outliers |
| Role variation | "SDE", "Software Engineer", "Dev" | Standardize to canonical role |
| Level variation | "L4", "Senior1", "SDE2" | Map all to standardized level |

---

## 7. WHAT WE WON'T BUILD

- ❌ Reviews (AmbitionBox does this)
- ❌ Interviews section (AmbitionBox does this)
- ❌ Company culture/benefits (Glassdoor does this)
- ❌ Chat/community (AmbitionBox does this)
- ❌ Job listings (Levels.fyi does this)
- ❌ AI features (out of scope for MVP)
- ❌ Auth/user accounts (MVP is anonymous)

---

## 8. SUCCESS METRICS

✅ **We succeed when**:
1. User can filter by Level and get comparable results
2. User can see salary progression (L3 → L4 → L5) at a company
3. User can compare 2 salaries side-by-side
4. No data ambiguity (all fields standardized)
5. Fast, clean UX (no clutter)

❌ **We fail when**:
1. User sees "SDE" and "Software Engineer" as different entries
2. User can't compare salaries because level is missing
3. UI is cluttered with unrelated features
4. Data quality is poor (garbage in, garbage out)

---

## 9. TECH STACK OBSERVATIONS

### Levels.fyi Inferences
- Frontend: React/Next.js (modern, fast)
- Backend: Node.js + TypeScript (fast API)
- Database: PostgreSQL or similar (structured data)
- Deployment: Cloud (AWS/GCP, not specific)

### 6figr Inferences
- More complex (career rankings, AI analysis)
- Likely uses ML/AI for insights
- Probably more mature backend

### Our Stack (Simple, Fast)
- Frontend: React/Next.js + Tailwind
- Backend: Node.js + Express + TypeScript
- Database: MongoDB (flexible schema, fast)
- Deployment: Vercel (frontend) + Railway/Render (backend)

---

## 10. BUSINESS MODEL OBSERVATIONS

### Levels.fyi
- Free tier: Browse salaries
- Premium: Services (negotiation, etc.)
- B2B: Compensation benchmarking for HR teams

### 6figr
- Free tier: Browse salaries
- Premium: Advanced features (career roast, career ranks)
- AI features: OfferGPT (premium)

### Our MVP
- Completely free (build trust first)
- No auth/subscriptions (MVP scope)
- Future: Premium features (salary trends, advanced analytics)

---

## FINAL VERDICT

**What We're Building**:
```
Levels.fyi level system + 6figr comparison features - all the noise = 
Clean, focused COMPENSATION INTELLIGENCE SYSTEM for India + Global
```

**Core Philosophy**:
> "Structured Level Data → Immediately Comparable → Decision Ready"

**Not**:
> "Salary listings with reviews and community chatter"

---
