# Deployment Alternatives (Non-Vercel)

## Option 1: Railway (Recommended)

**Best for**: All-in-one solution with database included

### Steps:

1. **Push to GitHub:**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add PostgreSQL:**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway automatically sets `DATABASE_URL` environment variable

4. **Configure Environment Variables:**
   - In your service settings → Variables, add:
     ```
     NEXT_PUBLIC_SOLANA_NETWORK=devnet
     NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
     ```

5. **Deploy:**
   - Railway auto-detects Next.js
   - Build command: `npm run build`
   - Start command: `npm start`
   - Railway will auto-deploy on every push

**Cost**: Free tier available, then $5/month

---

## Option 2: Render

**Best for**: Simple deployment with free tier

### Steps:

1. **Push to GitHub**

2. **Create Web Service:**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - **Name**: phenix-nest
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid)

3. **Add PostgreSQL:**
   - New → PostgreSQL
   - Copy connection string
   - Add to Web Service environment variables as `DATABASE_URL`

4. **Set Environment Variables:**
   ```
   DATABASE_URL=from_postgres_service
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
   ```

5. **Deploy:**
   - Render will build and deploy automatically
   - First deploy may take 5-10 minutes

**Cost**: Free tier (spins down after inactivity), $7/month for always-on

---

## Option 3: Fly.io

**Best for**: Global edge deployment

### Steps:

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Create App:**
   ```bash
   fly launch
   ```
   - Follow prompts
   - Choose region
   - Don't deploy yet

4. **Add PostgreSQL:**
   ```bash
   fly postgres create
   fly postgres attach --app YOUR_APP_NAME
   ```

5. **Set Environment Variables:**
   ```bash
   fly secrets set NEXT_PUBLIC_SOLANA_NETWORK=devnet
   fly secrets set NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
   ```

6. **Deploy:**
   ```bash
   fly deploy
   ```

**Cost**: Free tier available, pay-as-you-go

---

## Option 4: DigitalOcean App Platform

**Best for**: Managed platform with good performance

### Steps:

1. **Push to GitHub**

2. **Create App:**
   - Go to [digitalocean.com](https://digitalocean.com)
   - App Platform → Create App
   - Connect GitHub repo

3. **Configure:**
   - **Type**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Environment Variables**:
     ```
     DATABASE_URL=your_postgres_url
     NEXT_PUBLIC_SOLANA_NETWORK=devnet
     NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
     ```

4. **Add Database:**
   - Add PostgreSQL component
   - Connection string auto-provided

**Cost**: $5/month minimum

---

## Option 5: Docker Deployment

**Best for**: Full control, any platform

### Using Docker Compose:

1. **Build and deploy:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

### Deploy Docker image to:

- **Fly.io**: `fly deploy`
- **Google Cloud Run**: Use Dockerfile
- **AWS ECS/Fargate**: Use Docker image
- **Azure Container Instances**: Use Docker image
- **Any VPS**: `docker compose up -d`

---

## Database Options (Free Tier)

### 1. Supabase (Recommended)
- **URL**: [supabase.com](https://supabase.com)
- **Free Tier**: 500MB database, 2GB bandwidth
- **Setup**: Create project → Settings → Database → Connection string

### 2. Neon
- **URL**: [neon.tech](https://neon.tech)
- **Free Tier**: 0.5GB storage
- **Setup**: Create project → Copy connection string

### 3. Railway PostgreSQL
- Included when you add PostgreSQL service
- Free tier available

### 4. Render PostgreSQL
- Included when you add PostgreSQL service
- Free tier available

---

## Post-Deployment Checklist

1. ✅ Set all environment variables
2. ✅ Run database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```
3. ✅ Verify app is accessible
4. ✅ Test marketplace loads
5. ✅ Test wallet connection
6. ✅ Verify database connection

---

## Recommended Setup

**For beginners**: Railway (easiest, includes database)
**For production**: Render or DigitalOcean (reliable, good performance)
**For global reach**: Fly.io (edge deployment)

