# Render Deployment Guide

Step-by-step guide to deploy Phenix Nest on Render.

## Prerequisites

- GitHub repository: https://github.com/linkln33/phoenix-nest
- Render account (sign up at [render.com](https://render.com))

## Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

## Step 2: Create PostgreSQL Database

1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `phenix-nest-db`
   - **Database**: `phenix_nest`
   - **User**: `phenix_user`
   - **Region**: Choose closest to you
   - **Plan**: **Free** (or Starter for $7/month always-on)
4. Click **"Create Database"**
5. **IMPORTANT**: Copy the **Internal Database URL** (starts with `postgresql://`)
   - You'll need this in the next step

## Step 3: Create Web Service

1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select repository: **`linkln33/phoenix-nest`**
5. Configure the service:

   **Basic Settings:**
   - **Name**: `phenix-nest`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (or Starter for $7/month always-on)

   **Environment Variables:**
   Click "Add Environment Variable" and add:
   
   ```
   DATABASE_URL = (paste the Internal Database URL from Step 2)
   ```
   
   ```
   NEXT_PUBLIC_SOLANA_NETWORK = devnet
   ```
   
   ```
   NEXT_PUBLIC_GUL_TOKEN_MINT = 11111111111111111111111111111111
   ```
   
   ```
   NODE_ENV = production
   ```

6. Click **"Create Web Service"**

## Step 4: Wait for Deployment

- First deployment takes 5-10 minutes
- Render will:
  1. Install dependencies
  2. Build the Next.js app
  3. Start the service
- Watch the build logs for any errors

## Step 5: Set Up Database

Once deployment is complete:

1. Go to your Web Service
2. Click **"Shell"** tab (or use Render's built-in shell)
3. Run database migrations:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

Or add these as build commands in Render:
- Add to build command: `npm install && npx prisma generate && npm run build`

## Step 6: Verify Deployment

1. Visit your Render URL (e.g., `phenix-nest.onrender.com`)
2. Check if the marketplace loads
3. Verify demo listings appear

## Important Notes

### Free Tier Limitations:
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after spin-down takes ~30 seconds (cold start)
- 750 hours/month runtime limit
- Good for testing and development

### Upgrade to Starter ($7/month):
- Always-on (no spin-down)
- Faster response times
- Better for production

### Database Connection:
- Use **Internal Database URL** (not External)
- Internal URL only works within Render's network
- Format: `postgresql://user:password@host:5432/database`

## Troubleshooting

### Build Fails:
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### Database Connection Error:
- Verify `DATABASE_URL` is set correctly
- Use Internal Database URL (not External)
- Check database is running in Render dashboard

### App Shows "Listing not found":
- Run database seed: `npx prisma db seed`
- Or app will use demo listings (fallback)

### Cold Start Slow:
- Normal for free tier
- Upgrade to Starter plan for always-on

## Next Steps

1. ✅ Deploy to Render
2. ✅ Set up database
3. ✅ Run migrations
4. ✅ Test the marketplace
5. (Optional) Upgrade to Starter plan for production

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com

