# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_GUL_TOKEN_MINT=YOUR_TOKEN_MINT_ADDRESS
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Connect your wallet:**
   - Click the "Select Wallet" button in the top right
   - Choose Phantom, Solflare, or Torus
   - Approve the connection

2. **Create a listing:**
   - Click "Create Listing" in the navigation
   - Fill in the form with your item details
   - Upload images (up to 8)
   - Set your price in $GUL tokens
   - Click "Create Listing"

3. **Browse the marketplace:**
   - Visit the Marketplace page
   - Use search and filters to find items
   - Click on any listing to view details

4. **Make a purchase:**
   - View a listing detail page
   - Click "Purchase with $GUL"
   - Approve the transaction in your wallet
   - Wait for confirmation

## Important Notes

- **Token Setup**: You need to deploy or have access to a $GUL token on Solana. Update the `NEXT_PUBLIC_GUL_TOKEN_MINT` environment variable with your token's mint address.

- **Network**: The app defaults to Solana devnet. For production, change `NEXT_PUBLIC_SOLANA_NETWORK` to `mainnet-beta`.

- **Data Storage**: Currently, listings are stored in browser localStorage. For production, you should:
  - Use a database (PostgreSQL, MongoDB, etc.)
  - Store images on IPFS or Arweave
  - Consider on-chain storage for critical data

- **RPC Endpoint**: For better performance, use a custom RPC endpoint:
  ```env
  NEXT_PUBLIC_RPC_ENDPOINT=https://your-rpc-endpoint.com
  ```

## Troubleshooting

**Wallet won't connect:**
- Make sure you have a Solana wallet extension installed
- Check that you're on the correct network (devnet/mainnet)

**Transactions fail:**
- Ensure you have enough SOL for transaction fees
- Check that you have sufficient $GUL tokens
- Verify the token mint address is correct

**Images not uploading:**
- Check file size (max 5MB per image)
- Ensure you're using supported image formats (JPG, PNG, etc.)

## Next Steps

- Deploy your $GUL token to Solana
- Set up a production database
- Integrate IPFS/Arweave for image storage
- Deploy to Vercel or your preferred hosting platform

