# ✅ Render Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Ready
- [x] Code pushed to GitHub: https://github.com/linkln33/phoenix-nest
- [x] All files committed
- [x] Build script includes Prisma generate
- [x] Environment variables documented

### ✅ Configuration Files
- [x] `package.json` - Build scripts configured
- [x] `next.config.js` - Image domains configured
- [x] `prisma/schema.prisma` - Database schema ready
- [x] `render.yaml` - Optional Render config

### ✅ Database
- [x] Database connection string ready
- [x] PostgreSQL database created on Render

## Deployment Steps (Copy & Paste Ready)

### 1. Go to Render
👉 **https://render.com**

### 2. Create Web Service
- Click "New +" → "Web Service"
- Connect GitHub → Select `linkln33/phoenix-nest`

### 3. Settings (Copy These Exactly)

**Name:** `phenix-nest`

**Build Command:**
```
npm install && npx prisma generate && npm run build
```

**Start Command:**
```
npm start
```

**Plan:** `Free`

### 4. Environment Variables (Add These 4)

**Variable 1:**
```
Key: DATABASE_URL
Value: postgresql://phenix_nest_db_user:bnvZCoCZDQpEqZDL1uchd0Xw0rqCRHTO@dpg-d4pmc37diees738qtisg-a/phenix_nest_db
```

**Variable 2:**
```
Key: NEXT_PUBLIC_SOLANA_NETWORK
Value: devnet
```

**Variable 3:**
```
Key: NEXT_PUBLIC_GUL_TOKEN_MINT
Value: 11111111111111111111111111111111
```

**Variable 4:**
```
Key: NODE_ENV
Value: production
```

### 5. Click "Create Web Service"

### 6. Wait for Build (5-10 minutes)

Watch the logs. You should see:
- ✅ Installing dependencies
- ✅ Generating Prisma Client
- ✅ Building Next.js
- ✅ Service started

### 7. After Deployment - Run in Shell

Go to "Shell" tab and run:
```bash
npx prisma db push
npx prisma db seed
```

### 8. Visit Your App

Your URL will be: `https://phenix-nest.onrender.com`

## Quick Copy-Paste Commands

### Build Command:
```
npm install && npx prisma generate && npm run build
```

### Start Command:
```
npm start
```

### Database Setup (in Shell):
```bash
npx prisma db push && npx prisma db seed
```

## Expected Result

✅ App loads at `https://phenix-nest.onrender.com`
✅ Homepage shows mystical marketplace
✅ Marketplace displays 17 demo listings
✅ Navigation works
✅ Language toggle works (EN/BG)

## If Something Goes Wrong

1. **Check Build Logs** - Look for error messages
2. **Verify Environment Variables** - All 4 must be set
3. **Check Database** - Ensure PostgreSQL is running
4. **Run Database Setup** - Use Shell to run `npx prisma db push`

## Support

- Render Docs: https://render.com/docs
- Your Repo: https://github.com/linkln33/phoenix-nest

