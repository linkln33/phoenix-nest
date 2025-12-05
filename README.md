# Phenix Nest - Decentralized Handmade Marketplace

## Quick Start (Local Database)

### Option 1: Docker (Easiest - Port 8000 for pgAdmin)

```bash
# Start PostgreSQL + pgAdmin
docker-compose up -d

# Setup database
npm run db:generate
npm run db:push
npm run db:seed

# Start app
npm run dev
```

**Access:**
- App: http://localhost:3000
- Database UI (pgAdmin): http://localhost:8000
  - Email: `admin@phenix.local`
  - Password: `admin`

### Option 2: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `CREATE DATABASE phenix_nest;`
3. Update `.env.local` with your credentials
4. Run: `npm run db:push && npm run dev`

### Environment Variables

Create `.env.local`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/phenix_nest?schema=public"
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=11111111111111111111111111111111
```

## Features

- 🔐 Wallet Authentication (Phantom, Solflare, Torus)
- 🛍️ Marketplace with search & filters
- 📝 Create listings with images
- 💰 Purchase with $GUL tokens
- 👤 User profiles
- 🗄️ PostgreSQL database

## Commands

```bash
npm run dev          # Start dev server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed test data
npm run db:studio    # Open Prisma Studio
```

## Database Setup

**With Docker:**
```bash
docker-compose up -d    # Start
docker-compose down    # Stop
docker-compose down -v # Reset (removes data)
```

**pgAdmin (Port 8000):**
- URL: http://localhost:8000
- Add server: Host `postgres`, User `postgres`, Password `postgres`
