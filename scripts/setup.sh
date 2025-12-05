#!/bin/bash

echo "🚀 Phenix Nest Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
# Database Connection
# Get your connection string from Supabase, Railway, Neon, or your local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/phenix_nest?schema=public"

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=YOUR_TOKEN_MINT_ADDRESS

# Optional: Custom RPC Endpoint
# NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
EOF
    echo "✅ Created .env.local template"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your:"
    echo "   1. DATABASE_URL (PostgreSQL connection string)"
    echo "   2. NEXT_PUBLIC_GUL_TOKEN_MINT (Your $GUL token mint address)"
    echo ""
    read -p "Press Enter after you've updated .env.local to continue..."
fi

# Check if DATABASE_URL is set
source .env.local 2>/dev/null || true
if [ -z "$DATABASE_URL" ] || [ "$DATABASE_URL" == 'postgresql://user:password@localhost:5432/phenix_nest?schema=public' ]; then
    echo "❌ DATABASE_URL is not configured in .env.local"
    echo "   Please set up your database connection string first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Generating Prisma Client..."
npm run db:generate

echo ""
echo "🗄️  Pushing database schema..."
npm run db:push

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your DATABASE_URL in .env.local is correct"
echo "2. Update NEXT_PUBLIC_GUL_TOKEN_MINT with your token address"
echo "3. Run 'npm run dev' to start the development server"
echo ""

