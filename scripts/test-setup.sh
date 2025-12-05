#!/bin/bash

echo "🧪 Phenix Nest Test Setup"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo ""
    echo "Creating .env.local template..."
    cat > .env.local << 'EOF'
# Database Connection
# Get from Supabase: Settings > Database > Connection string (URI)
DATABASE_URL="postgresql://postgres:password@localhost:5432/phenix_nest?schema=public"

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=11111111111111111111111111111111
EOF
    echo -e "${GREEN}✅ Created .env.local template${NC}"
    echo ""
    echo -e "${YELLOW}📝 Next steps:${NC}"
    echo "1. Get your database URL from Supabase (recommended for testing)"
    echo "   → Go to: https://supabase.com/dashboard"
    echo "   → Create new project"
    echo "   → Settings > Database > Copy connection string (URI)"
    echo ""
    echo "2. Update DATABASE_URL in .env.local"
    echo ""
    read -p "Press Enter when you've updated .env.local..."
fi

# Load environment variables
if [ -f ".env.local" ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ] || [[ "$DATABASE_URL" == *"localhost"* ]] && [[ "$DATABASE_URL" == *"password"* ]]; then
    echo -e "${RED}❌ DATABASE_URL not configured${NC}"
    echo "Please update .env.local with your database connection string"
    echo ""
    echo "Quick setup with Supabase:"
    echo "1. Visit: https://supabase.com/dashboard"
    echo "2. Create new project"
    echo "3. Go to Settings > Database"
    echo "4. Copy Connection string (URI format)"
    echo "5. Paste into .env.local as DATABASE_URL"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables loaded${NC}"
echo ""

# Check database connection
echo "🔍 Testing database connection..."
if npx prisma db pull --schema=./prisma/schema.prisma > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful!${NC}"
else
    echo -e "${RED}❌ Cannot connect to database${NC}"
    echo "Please check your DATABASE_URL in .env.local"
    exit 1
fi

echo ""
echo "📦 Generating Prisma Client..."
npm run db:generate

echo ""
echo "🗄️  Pushing database schema..."
if npm run db:push; then
    echo -e "${GREEN}✅ Database schema created!${NC}"
else
    echo -e "${RED}❌ Failed to create schema${NC}"
    exit 1
fi

echo ""
echo "🌱 Seeding database with test data..."
if npm run db:seed; then
    echo -e "${GREEN}✅ Test data seeded!${NC}"
else
    echo -e "${YELLOW}⚠️  Seed script failed (this is okay if you want to start fresh)${NC}"
fi

echo ""
echo -e "${GREEN}✅ Test setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start the dev server: ${GREEN}npm run dev${NC}"
echo "2. Open: http://localhost:3000"
echo "3. Connect your Solana wallet (Phantom recommended)"
echo "4. Test creating listings and browsing the marketplace"
echo ""
echo "To view your database:"
echo "  ${GREEN}npm run db:studio${NC}"
echo ""

