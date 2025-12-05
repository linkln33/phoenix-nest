import { create } from "zustand";
import { PublicKey } from "@solana/web3.js";

export interface UserProfile {
  walletAddress: string;
  username?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Listing {
  id: string;
  seller: string;
  title: string;
  description: string;
  price: number; // Price in $GUL tokens (with decimals)
  images: string[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  sold: boolean;
  buyer?: string;
}

interface AppState {
  profile: UserProfile | null;
  listings: Listing[];
  setProfile: (profile: UserProfile | null) => void;
  addListing: (listing: Listing) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  setListings: (listings: Listing[]) => void;
}

export const useStore = create<AppState>((set) => ({
  profile: null,
  listings: [],
  setProfile: (profile) => set({ profile }),
  addListing: (listing) => set((state) => ({ listings: [...state.listings, listing] })),
  updateListing: (id, updates) =>
    set((state) => ({
      listings: state.listings.map((listing) =>
        listing.id === id ? { ...listing, ...updates } : listing
      ),
    })),
  setListings: (listings) => set({ listings }),
}));

