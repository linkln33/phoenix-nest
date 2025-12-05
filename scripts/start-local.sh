#!/bin/bash

echo "🚀 Starting Phenix Nest Locally"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local..."
    cat > .env.local << 'EOF'
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/phenix_nest?schema=public"
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=11111111111111111111111111111111
EOF
    echo "✅ Created .env.local"
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Starting Docker containers (PostgreSQL + pgAdmin)..."
    docker-compose up -d
    
    echo "⏳ Waiting for database to be ready..."
    sleep 5
    
    echo "📦 Setting up database schema..."
    npm run db:generate
    npm run db:push
    
    echo "🌱 Seeding test data..."
    npm run db:seed || echo "Seed skipped"
    
    echo ""
    echo "✅ Database ready!"
    echo "   - PostgreSQL: localhost:5432"
    echo "   - pgAdmin UI: http://localhost:8000"
    echo "   - Login: admin@phenix.local / admin"
    echo ""
else
    echo "⚠️  Docker not found. Using existing database connection."
    echo "   Make sure PostgreSQL is running on localhost:5432"
    echo ""
fi

echo "🚀 Starting Next.js dev server..."
echo "   App will open at: http://localhost:3000"
echo ""

npm run dev

