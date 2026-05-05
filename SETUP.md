# 🚀 CIS Setup Guide

Step-by-step guide to get the Compensation Intelligence System running locally and deployed.

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 8.x or higher
- **MongoDB Atlas**: Free account (https://www.mongodb.com/cloud/atlas)
- **Git**: For cloning and version control
- **Code Editor**: VS Code recommended

## Local Setup (5 mins)

### 1. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a cluster (free tier)
5. Create a database user with password
6. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/cis?retryWrites=true&w=majority`)

### 2. Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env.local

# Edit .env.local and add your MongoDB URI
# MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/cis?retryWrites=true&w=majority

# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend should be running on `http://localhost:3000`

### 4. Verify Setup

- Visit http://localhost:3000 in your browser
- You should see 50+ salary entries
- Try filtering by company, level, location
- Test the compare functionality

## Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. Go to https://railway.app
2. Create account, connect GitHub
3. Create new service → GitHub repo
4. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `PORT` - 3000 (or default)
5. Deploy!

Backend URL will be something like: `https://cis-backend-production.railway.app`

#### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Create account, connect GitHub
3. Import project → select `frontend` directory
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://cis-backend-production.railway.app/api`
5. Deploy!

Frontend URL will be something like: `https://cis-frontend-production.vercel.app`

### Option 2: Full Docker Deployment

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123

  backend:
    build: ./backend
    ports:
      - '5000:5000'
    environment:
      MONGO_URI: mongodb://admin:password123@mongodb:27017/cis?authSource=admin
      PORT: 5000
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000/api
    depends_on:
      - backend
```

Then run:
```bash
docker-compose up -d
```

## API Testing

### Using cURL

```bash
# Get all salaries
curl http://localhost:5000/api/salaries

# Filter by level
curl "http://localhost:5000/api/salaries?level=L4"

# Filter by company and level
curl "http://localhost:5000/api/salaries?company=google&level=L4"

# Add new salary
curl -X POST http://localhost:5000/api/salaries/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Netflix",
    "role": "SDE",
    "level": "L4",
    "location": "Bangalore",
    "country": "India",
    "base_salary": 1800000,
    "bonus": 400000,
    "stock": 600000,
    "experience_years": 5,
    "confidence": 90
  }'

# Get company stats
curl http://localhost:5000/api/salaries/company/google

# Compare two salaries (replace IDs with actual)
curl "http://localhost:5000/api/salaries/compare/salaries?salary1=ID1&salary2=ID2"
```

### Using Postman

1. Import the following collection (create in Postman):
   - `GET` /api/salaries
   - `GET` /api/salaries?level=L4
   - `POST` /api/salaries/ingest
   - `GET` /api/salaries/company/{company}
   - `GET` /api/salaries/compare/salaries

## Troubleshooting

### Frontend not connecting to backend
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running and accessible
- Check browser console for CORS errors

### MongoDB connection failed
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
- Ensure database user has correct password

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Seed data not appearing
```bash
cd backend
npm run seed
```

## Performance Optimization

### Database Indexes
Indexes are created automatically in `Salary.ts` model:
- `(company, level, location)` - For filtering
- `(total_compensation)` - For sorting

### Frontend Optimization
- Data table uses virtual scrolling (via TanStack Table)
- Images optimized via Next.js Image component
- CSS minimized via Tailwind

### API Caching
Add Redis caching layer (future):
```typescript
// Cache company stats for 1 hour
cache.set(`company:${company}`, stats, 3600)
```

## Monitoring

### Backend Logs
```bash
# Live logs
npm run dev

# Production logs (Railway)
railway logs --follow
```

### Frontend Monitoring
- Use Vercel Analytics dashboard
- Monitor Core Web Vitals

### Database Monitoring
- MongoDB Atlas dashboard
- Monitor query performance

## Security Checklist

- [x] Input validation (Zod)
- [x] MongoDB injection prevention
- [x] CORS configured
- [x] Environment variables for secrets
- [ ] Rate limiting (TODO)
- [ ] HTTPS enabled (auto on Vercel/Railway)
- [ ] Auth system (TODO for Phase 2)

## Common Commands

```bash
# Backend
cd backend
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run built version
npm run seed         # Seed database

# Frontend
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run built version
npm run lint         # Lint code
```

## Next Steps

1. ✅ Local setup complete
2. Deploy backend to Railway
3. Deploy frontend to Vercel
4. Share live URL
5. Add more sample data
6. Implement Phase 2 features

---

**Need help?** Check the README.md for API documentation.
