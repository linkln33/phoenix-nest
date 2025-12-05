# Phenix Nest - Local Setup

## Quick Start with Docker (Recommended)

### 1. Start Database (PostgreSQL + pgAdmin)

```bash
# For development
docker-compose -f docker-compose.dev.yml up -d

# Or use the default (same as dev)
docker-compose up -d
```

This starts:
- **PostgreSQL** on port `5432`
- **pgAdmin** (web UI) on port `5050` → http://localhost:5050
- **App** runs on port `8000` → http://localhost:8000

### 2. Configure Environment

Create `.env.local`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/phenix_nest?schema=public"
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=11111111111111111111111111111111
```

### 3. Setup Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Start App

```bash
npm run dev
```

Visit: http://localhost:3000

## Access pgAdmin (Database UI)

1. Open: http://localhost:5050
2. Login:
   - Email: `admin@phenix.local`
   - Password: `admin`
3. Add server:
   - Name: `Phenix Nest`
   - Host: `postgres` (or `localhost`)
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`

## Auto-Restart Development

The app uses `nodemon` for automatic restart on file changes:
- Watches: `app/`, `components/`, `lib/`, `prisma/`
- Extensions: `.ts`, `.tsx`, `.js`, `.jsx`
- Restarts automatically when you save files

## Docker Deployment

### Development
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production
```bash
# Build and run production stack
docker-compose -f docker-compose.prod.yml up -d --build

# Or build separately
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

## Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs -f

# Reset database (removes all data)
docker-compose down -v
```

## Alternative: Local PostgreSQL

If you have PostgreSQL installed locally:

```env
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/phenix_nest?schema=public"
```

Then create database:
```sql
CREATE DATABASE phenix_nest;
```
