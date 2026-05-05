# Deployment Guide: CIS to Render

This guide walks you through deploying the Compensation Intelligence System to Render (free tier).

**GitHub Repo**: https://github.com/Nitin-kumar-yadav1307/CIS.git

---

## Prerequisites

- GitHub account (repo already public)
- MongoDB Atlas account (free tier)
- Render account (free tier)

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new **Free M0 Cluster**
4. Choose region closest to you (e.g., `ap-south-1` for India)
5. Create a **Database User**:
   - Username: `cis_user`
   - Password: `YourStrongPassword123` (save this)
6. Add **Network Access**: Allow `0.0.0.0/0` (allow all IPs)
7. Get your **Connection String**:
   - Click **Clusters** → **Connect** → **Drivers**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://cis_user:YourStrongPassword123@cluster0.xxxxx.mongodb.net/cis?retryWrites=true&w=majority
     ```
   - **Save this** — you'll need it for backend environment variables

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2a. Create Backend Service

1. Go to https://render.com
2. Sign up with GitHub (authorize the connection)
3. Click **New +** → **Web Service**
4. Select your repo: `Nitin-kumar-yadav1307/CIS`
5. Fill in the form:
   - **Name**: `cis-backend`
   - **Environment**: `Node`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm start`
   - **Root directory**: `backend`
   - **Region**: Choose your region

### 2b. Add Environment Variables

Click **Add Environment Variable** and add:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://cis_user:YourStrongPassword123@cluster0.xxxxx.mongodb.net/cis?retryWrites=true&w=majority` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

### 2c. Deploy

1. Click **Create Web Service**
2. Wait 2–3 minutes for deployment to complete
3. When done, copy your **Backend URL** from the dashboard (e.g., `https://cis-backend.onrender.com`)
4. Test: Visit `https://cis-backend.onrender.com/health` — should return `{"status":"ok","timestamp":"..."}`

---

## Step 3: Deploy Frontend to Render (10 minutes)

### 3a. Create Frontend Service

1. In Render dashboard, click **New +** → **Web Service**
2. Select the same repo: `Nitin-kumar-yadav1307/CIS`
3. Fill in:
   - **Name**: `cis-frontend`
   - **Environment**: `Node`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm start`
   - **Root directory**: `frontend`
   - **Region**: Same as backend

### 3b. Add Environment Variables

Click **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://cis-backend.onrender.com/api` |

(Replace with your actual backend URL from Step 2)

### 3c. Deploy

1. Click **Create Web Service**
2. Wait 2–3 minutes
3. When done, copy your **Frontend URL** (e.g., `https://cis-frontend.onrender.com`)

---

## Step 4: Test Live Deployment (5 minutes)

1. Open your **Frontend URL** in browser
2. Test these flows:
   - ✅ Page loads and shows salary table
   - ✅ Click a company name → goes to company page with stats
   - ✅ Try filters (company, level, location)
   - ✅ Click **Compare** → select 2 salaries → see comparison
   - ✅ Click **Export CSV** → downloads a file

If anything breaks, check **Logs** in Render dashboard for errors.

---

## URLs After Deployment

| Component | URL |
|-----------|-----|
| Frontend | `https://cis-frontend.onrender.com` |
| Backend API | `https://cis-backend.onrender.com/api` |
| Health Check | `https://cis-backend.onrender.com/health` |
| Salary List | `https://cis-backend.onrender.com/api/salaries` |

---

## Troubleshooting

### Backend won't start
- Check **Logs** tab for MongoDB connection errors
- Verify `MONGO_URI` is correct (no typos)
- Ensure MongoDB Atlas Network Access includes `0.0.0.0/0`

### Frontend shows blank page
- Check browser console for errors (F12)
- Verify `NEXT_PUBLIC_API_URL` points to correct backend
- Check Render **Logs** for build errors

### API calls fail (CORS error)
- Backend already has CORS enabled in `src/index.ts`
- If still failing, check that backend URL is correct in frontend

---

## Optional: Add More Sample Data

After deployment, seed the database with sample data:

```bash
# Locally (with backend running on port 5001):
cd backend
MONGO_URI=<your_mongo_uri> npm run seed
```

This adds 24 salary entries from major tech companies.

---

## Cost

- **Render**: Free tier (750 hours/month = always free if 1 service running)
- **MongoDB Atlas**: Free tier (512 MB storage)
- **Total**: $0/month

---

## Next Steps

1. **For recruiting calls**: Open the live URL and show it to recruiters
2. **For improvements**: Each GitHub push auto-redeployes on Render
3. **For scaling**: Upgrade Render plan if you add more features (currently free)

---

## Still Have Questions?

- Render docs: https://render.com/docs
- MongoDB docs: https://docs.mongodb.com/manual/
- Next.js deployment: https://nextjs.org/docs/deployment
