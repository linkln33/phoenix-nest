# 🚀 Quick Deploy Guide - Render

Follow these steps to deploy your Phenix Nest marketplace to Render.

## Prerequisites ✅

- ✅ GitHub repository: https://github.com/linkln33/phoenix-nest
- ✅ Database connection string ready
- ✅ Render account (sign up at [render.com](https://render.com) if needed)

## Step-by-Step Deployment

### Step 1: Sign Up / Log In to Render

1. Go to **[render.com](https://render.com)**
2. Click **"Get Started for Free"** (or log in if you have an account)
3. Sign up with **GitHub** (recommended - easier to connect repo)

### Step 2: Create Web Service

1. In Render dashboard, click the **"New +"** button (top right)
2. Select **"Web Service"**
3. If prompted, **connect your GitHub account**
4. Select repository: **`linkln33/phoenix-nest`**
5. Click **"Connect"**

### Step 3: Configure Web Service

Fill in these settings:

**Basic Settings:**
- **Name**: `phenix-nest` (or any name you like)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: (leave empty)
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```
- **Plan**: Select **"Free"** (or "Starter" for $7/month always-on)

### Step 4: Add Environment Variables

**IMPORTANT**: Before clicking "Create Web Service", add these environment variables:

1. Click **"Advanced"** → **"Add Environment Variable"**

2. Add these 4 variables one by one:

   **Variable 1:**
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db`
   
   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SOLANA_NETWORK`
   - **Value**: `devnet`
   
   **Variable 3:**
   - **Key**: `NEXT_PUBLIC_GUL_TOKEN_MINT`
   - **Value**: `11111111111111111111111111111111`
   
   **Variable 4:**
   - **Key**: `NODE_ENV`
   - **Value**: `production`

3. Click **"Create Web Service"**

### Step 5: Wait for Deployment ⏳

- First deployment takes **5-10 minutes**
- Watch the build logs in real-time
- You'll see:
  1. Installing dependencies
  2. Generating Prisma Client
  3. Building Next.js app
  4. Starting service

### Step 6: Set Up Database

Once deployment is **successful** (green status):

1. Click on your Web Service
2. Go to **"Shell"** tab (or "Logs" tab)
3. Click **"Open Shell"** button
4. Run these commands:

```bash
npx prisma db push
```

```bash
npx prisma db seed
```

This will:
- Create database tables
- Seed demo listings

### Step 7: Verify Deployment ✅

1. Your app URL will be: `https://phenix-nest.onrender.com` (or your custom name)
2. Visit the URL
3. Check if:
   - ✅ Homepage loads
   - ✅ Marketplace shows listings
   - ✅ Navigation works

## 🎉 You're Live!

Your marketplace is now deployed and accessible on the internet!

## Quick Reference

**Your App URL**: `https://phenix-nest.onrender.com` (or your custom name)

**Database**: Already connected via `DATABASE_URL`

**Auto-Deploy**: Every push to `main` branch will auto-deploy

## Troubleshooting

### Build Fails?
- Check build logs in Render dashboard
- Look for error messages
- Common issues:
  - Missing dependencies → Check `package.json`
  - Prisma errors → Ensure `DATABASE_URL` is correct

### Database Connection Error?
- Verify `DATABASE_URL` environment variable is set correctly
- Check database is running in Render dashboard
- Try using Internal Database URL instead (if database is in same Render account)

### App Shows "Listing not found"?
- Run database seed: `npx prisma db seed` in Shell
- Or app will use demo listings (fallback)

### Cold Start Slow?
- Normal for free tier (spins down after 15 min inactivity)
- First request takes ~30 seconds
- Upgrade to Starter ($7/month) for always-on

## Next Steps

1. ✅ Share your live URL
2. ✅ Test all features
3. ✅ (Optional) Upgrade to Starter plan for production
4. ✅ (Optional) Add custom domain

## Need Help?

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check logs in Render dashboard for errors

