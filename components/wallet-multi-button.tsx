"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton as SolanaWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function WalletMultiButton() {
  const { publicKey } = useWallet();
  const { setProfile } = useStore();

  useEffect(() => {
    if (publicKey) {
      // Initialize or load user profile
      const profile = {
        walletAddress: publicKey.toBase58(),
        createdAt: new Date(),
      };
      setProfile(profile);
    } else {
      setProfile(null);
    }
  }, [publicKey, setProfile]);

  return (
    <div className="wallet-adapter-button-trigger">
      <SolanaWalletMultiButton />
    </div>
  );
}

