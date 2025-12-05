# Phenix Nest - Mystical Marketplace

A decentralized marketplace for witchcraft and sorcery items, built on Solana blockchain. Trade enchanted goods, rare ingredients, and magical artifacts for $GUL tokens.

## Features

- 🧙‍♀️ Witchcraft-themed marketplace
- 🔮 Browse potions, herbs, oils, elixirs, crystals, talismans, and more
- 💰 Trade with $GUL tokens on Solana
- 🌍 English and Bulgarian language support
- 🎨 Beautiful mystical UI with animations
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 14
- **Blockchain**: Solana
- **Database**: PostgreSQL (Prisma ORM)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or use Docker)
- Solana wallet

### Installation

1. Clone the repository:
```bash
git clone YOUR_REPO_URL
cd pfenix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .docker.env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/phenix_nest?schema=public"
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_GUL_TOKEN_MINT=your_token_mint_address
```

4. Set up database:
```bash
# Using Docker
docker compose -f docker-compose.dev.yml up -d

# Or use your own PostgreSQL instance
npm run db:push
npm run db:seed
```

5. Run development server:
```bash
npm run dev
```

Visit [http://localhost:8000](http://localhost:8000)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options including:
- Railway
- Render
- Fly.io
- Docker deployment

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── listing/        # Listing detail pages
│   └── page.tsx        # Homepage
├── components/         # React components
├── lib/               # Utilities and configurations
├── prisma/            # Database schema
└── scripts/           # Seed scripts
```

## Scripts

- `npm run dev` - Start development server (port 8000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed demo listings
- `npm run db:studio` - Open Prisma Studio

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
