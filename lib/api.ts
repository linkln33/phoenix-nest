import { Listing, UserProfile } from "@/lib/store";

const API_BASE = "/api";

export async function fetchListings(params?: {
  sellerId?: string;
  category?: string;
  sold?: boolean;
  search?: string;
}): Promise<Listing[]> {
  const searchParams = new URLSearchParams();
  // If sellerId is a wallet address, we need to get the user ID first
  if (params?.sellerId) {
    if (params.sellerId.length === 44) {
      // Looks like a wallet address, get user ID
      try {
        const userResponse = await fetch(`${API_BASE}/users?walletAddress=${params.sellerId}`);
        if (userResponse.ok) {
          const user = await userResponse.json();
          searchParams.set("sellerId", user.id);
        } else {
          // User doesn't exist yet, return empty array
          return [];
        }
      } catch (e) {
        // If error, try using as-is (might be an ID)
        searchParams.set("sellerId", params.sellerId);
      }
    } else {
      searchParams.set("sellerId", params.sellerId);
    }
  }
  if (params?.category) searchParams.set("category", params.category);
  if (params?.sold !== undefined) searchParams.set("sold", String(params.sold));
  if (params?.search) searchParams.set("search", params.search);

  const response = await fetch(`${API_BASE}/listings?${searchParams}`);
  if (!response.ok) throw new Error("Failed to fetch listings");
  
  const data = await response.json();
  return data.map((listing: any) => ({
    id: listing.id,
    seller: listing.seller.walletAddress,
    title: listing.title,
    description: listing.description,
    price: Number(listing.price),
    images: listing.images,
    category: listing.category,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
    sold: listing.sold,
    buyer: listing.buyerId || undefined,
  }));
}

export async function fetchListing(id: string): Promise<Listing | null> {
  const response = await fetch(`${API_BASE}/listings/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch listing");
  }
  
  const listing = await response.json();
  return {
    id: listing.id,
    seller: listing.seller.walletAddress,
    title: listing.title,
    description: listing.description,
    price: Number(listing.price),
    images: listing.images,
    category: listing.category,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
    sold: listing.sold,
    buyer: listing.buyerId || undefined,
  };
}

export async function createListing(data: {
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  images: string[];
}): Promise<Listing> {
  const response = await fetch(`${API_BASE}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create listing");
  }
  
  const listing = await response.json();
  return {
    id: listing.id,
    seller: listing.seller.walletAddress,
    title: listing.title,
    description: listing.description,
    price: Number(listing.price),
    images: listing.images,
    category: listing.category,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
    sold: listing.sold,
  };
}

export async function updateListing(
  id: string,
  updates: { sold?: boolean; buyerId?: string }
): Promise<Listing> {
  const response = await fetch(`${API_BASE}/listings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update listing");
  }
  
  const listing = await response.json();
  return {
    id: listing.id,
    seller: listing.seller.walletAddress,
    title: listing.title,
    description: listing.description,
    price: Number(listing.price),
    images: listing.images,
    category: listing.category,
    createdAt: new Date(listing.createdAt),
    updatedAt: new Date(listing.updatedAt),
    sold: listing.sold,
    buyer: listing.buyerId || undefined,
  };
}

export async function fetchUser(walletAddress: string): Promise<UserProfile | null> {
  const response = await fetch(`${API_BASE}/users?walletAddress=${walletAddress}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  
  const user = await response.json();
  return {
    walletAddress: user.walletAddress,
    username: user.username || undefined,
    bio: user.bio || undefined,
    avatar: user.avatar || undefined,
    createdAt: new Date(user.createdAt),
  };
}

export async function updateUser(data: {
  walletAddress: string;
  username?: string;
  bio?: string;
  avatar?: string;
}): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error("Failed to update user");
  
  const user = await response.json();
  return {
    walletAddress: user.walletAddress,
    username: user.username || undefined,
    bio: user.bio || undefined,
    avatar: user.avatar || undefined,
    createdAt: new Date(user.createdAt),
  };
}

export async function createPurchase(data: {
  listingId: string;
  buyerId: string;
  transactionSignature: string;
  amount: number;
}): Promise<void> {
  const response = await fetch(`${API_BASE}/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create purchase");
  }
}

