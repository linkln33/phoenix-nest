# Deployment Guide for Phenix Nest

This guide covers deploying the Phenix Nest marketplace to the internet.

## Quick Deploy Options

### Option 1: Vercel (Recommended for Next.js)

**Pros:**
- Free tier available
- Automatic deployments from GitHub
- Built-in Next.js optimization
- Easy environment variable management

**Steps:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Set Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     DATABASE_URL=your_postgresql_connection_string
     NEXT_PUBLIC_SOLANA_NETWORK=devnet
     NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
     ```

4. **Set up Database:**
   - Use [Supabase](https://supabase.com) (free PostgreSQL)
   - Or [Neon](https://neon.tech) (free PostgreSQL)
   - Or [Railway](https://railway.app) (free tier available)
   - Copy the connection string to `DATABASE_URL`

5. **Run Database Migrations:**
   ```bash
   # In Vercel, add a build command or use Vercel CLI:
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

### Option 2: Railway (All-in-One)

**Pros:**
- Includes PostgreSQL database
- Simple deployment
- Free tier available

**Steps:**

1. **Push to GitHub** (same as above)

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add PostgreSQL:**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway will automatically set `DATABASE_URL`

4. **Configure Environment Variables:**
   - In your service settings, add:
     ```
     NEXT_PUBLIC_SOLANA_NETWORK=devnet
     NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
     ```

5. **Deploy:**
   - Railway will auto-detect Next.js and deploy
   - Add build command: `npm run build`
   - Add start command: `npm start`

### Option 3: Render

**Pros:**
- Free tier available
- Easy PostgreSQL setup

**Steps:**

1. **Push to GitHub**

2. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
     - Environment: Node

3. **Add PostgreSQL:**
   - New → PostgreSQL
   - Copy connection string to `DATABASE_URL` in Web Service env vars

4. **Set Environment Variables:**
   ```
   DATABASE_URL=from_postgres_service
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
   ```

### Option 4: Docker Deployment (Any Platform)

If you want to use Docker:

1. **Build and push Docker image:**
   ```bash
   docker build -t phenix-nest .
   docker tag phenix-nest your-registry/phenix-nest:latest
   docker push your-registry/phenix-nest:latest
   ```

2. **Deploy to:**
   - **Fly.io**: `flyctl launch`
   - **DigitalOcean App Platform**: Use Dockerfile
   - **AWS ECS/Fargate**: Use Docker image
   - **Google Cloud Run**: Use Docker image

## Database Setup

### Free PostgreSQL Options:

1. **Supabase** (Recommended)
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from Settings → Database
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

2. **Neon**
   - Go to [neon.tech](https://neon.tech)
   - Create project
   - Copy connection string

3. **Railway**
   - Add PostgreSQL service
   - Connection string auto-provided

4. **Render**
   - Add PostgreSQL service
   - Connection string in service dashboard

## Post-Deployment Steps

1. **Run Database Migrations:**
   ```bash
   # Using Vercel CLI or platform's shell:
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

2. **Verify Environment Variables:**
   - Check all required vars are set
   - Ensure `DATABASE_URL` is correct

3. **Test the Application:**
   - Visit your deployed URL
   - Check marketplace loads
   - Verify database connection

## Environment Variables Checklist

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SOLANA_NETWORK` - `devnet` or `mainnet-beta`
- `NEXT_PUBLIC_GUL_TOKEN_MINT` - Your $GUL token mint address

Optional:
- `NODE_ENV` - `production` (auto-set by most platforms)

## Troubleshooting

### Database Connection Issues:
- Verify `DATABASE_URL` format
- Check database allows connections from your platform's IP
- Ensure database is running

### Build Failures:
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs for specific errors

### Missing Listings:
- Run database seed: `npm run db:seed`
- Or listings will use demo data (fallback)

## Recommended: Vercel + Supabase

The easiest combination:
1. **Vercel** for hosting (free, optimized for Next.js)
2. **Supabase** for database (free tier, easy setup)

Both have excellent free tiers and work seamlessly together.

