# Deployment Guide: CIS to Render

This version deploys the whole app as **one Render Web Service** and gives you **one public URL**.

**GitHub Repo**: https://github.com/Nitin-kumar-yadav1307/CIS.git

---

## What changed

- The root `server.js` now serves both the Next.js frontend and the Express API.
- The frontend calls the API on the same origin using `/api`.
- You only need one Render web service.

---

## Prerequisites

- GitHub account
- Render account
- MongoDB Atlas account

---

## Step 1: MongoDB Atlas

1. Create a free M0 cluster.
2. Create a DB user and allow `0.0.0.0/0` in Network Access.
3. Copy the connection string.

Example:
```text
mongodb+srv://cis_user:YourStrongPassword123@cluster0.xxxxx.mongodb.net/cis?retryWrites=true&w=majority
```

---

## Step 2: Render Web Service

1. Go to https://render.com and create a **Web Service** from the repo.
2. Use these settings:

```text
Root Directory: .
Build Command: npm install && npm run build
Start Command: npm start
```

3. Add environment variables:

```text
MONGO_URI=your_mongodb_atlas_connection_string
PORT=10000
NODE_ENV=production
```

If your MongoDB password contains special characters like `@`, URL-encode them first. For example, `@` becomes `%40`.

4. Deploy.

---

## Step 3: Use the single link

After deploy, Render gives you one URL, for example:

```text
https://cis.onrender.com
```

Use that one URL for the recruiter/demo.

---

## What to test

1. Open the homepage and verify the salary table loads.
2. Click a company name and verify the company page loads.
3. Open Compare and verify the comparison view works.
4. Try Export CSV.
5. Visit `/health` to confirm the service is alive.

---

## Important notes

- You do **not** need a separate frontend Render service anymore.
- You do **not** need to set `NEXT_PUBLIC_API_URL` for deployment.
- If you run the frontend separately in local dev, you can still set `NEXT_PUBLIC_API_URL` in `frontend/.env.local`.

---

## Troubleshooting

- If the app cannot connect to MongoDB, check the Atlas connection string and IP allowlist.
- If the page loads but API calls fail, check Render logs for `MONGO_URI` or startup errors.
- If build fails, make sure Render is using the repo root as the root directory.
