import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";

// Use devnet for development, mainnet-beta for production
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";
export const RPC_ENDPOINT = 
  SOLANA_NETWORK === "mainnet-beta"
    ? process.env.NEXT_PUBLIC_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com"
    : "https://api.devnet.solana.com";

// $GUL Token Mint Address (replace with actual token mint when deployed)
export const GUL_TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_GUL_TOKEN_MINT || "11111111111111111111111111111111"
);

export const connection = new Connection(RPC_ENDPOINT, "confirmed");

export interface TokenBalance {
  amount: number;
  decimals: number;
}

export async function getTokenBalance(
  walletAddress: PublicKey,
  tokenMint: PublicKey = GUL_TOKEN_MINT
): Promise<TokenBalance> {
  try {
    const tokenAccount = await getAssociatedTokenAddress(tokenMint, walletAddress);
    const balance = await connection.getTokenAccountBalance(tokenAccount);
    
    return {
      amount: Number(balance.value.amount),
      decimals: balance.value.decimals,
    };
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return { amount: 0, decimals: 9 };
  }
}

export async function createTokenTransferTransaction(
  from: PublicKey,
  to: PublicKey,
  amount: number,
  tokenMint: PublicKey = GUL_TOKEN_MINT
): Promise<Transaction> {
  const transaction = new Transaction();
  
  const fromTokenAccount = await getAssociatedTokenAddress(tokenMint, from);
  const toTokenAccount = await getAssociatedTokenAddress(tokenMint, to);
  
  // Check if recipient token account exists, create if not
  const toAccountInfo = await connection.getAccountInfo(toTokenAccount);
  if (!toAccountInfo) {
    // In a real app, you'd create the associated token account first
    // For now, we assume it exists
    throw new Error("Recipient token account does not exist");
  }
  
  const transferInstruction = createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    from,
    amount,
    [],
    TOKEN_PROGRAM_ID
  );
  
  transaction.add(transferInstruction);
  
  return transaction;
}

export function formatTokenAmount(amount: number, decimals: number = 9): string {
  return (amount / Math.pow(10, decimals)).toFixed(2);
}

