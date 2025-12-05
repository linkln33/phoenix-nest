"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { WalletMultiButton } from "@/components/wallet-multi-button";
import { getTokenBalance, formatTokenAmount } from "@/lib/solana";
import { Package, Coins, Edit } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { fetchUser, updateUser, fetchListings } from "@/lib/api";

export function ProfileClient() {
  const { publicKey } = useWallet();
  const { profile, listings, setProfile } = useStore();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");

  useEffect(() => {
    if (publicKey) {
      loadBalance();
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [publicKey]);

  const loadBalance = async () => {
    if (!publicKey) return;
    try {
      const tokenBalance = await getTokenBalance(publicKey);
      setBalance(tokenBalance.amount / Math.pow(10, tokenBalance.decimals));
    } catch (error) {
      console.error("Error loading balance:", error);
    }
    setLoading(false);
  };

  const loadProfile = async () => {
    if (!publicKey) return;
    try {
      const userProfile = await fetchUser(publicKey.toBase58());
      if (userProfile) {
        setProfile(userProfile);
        setUsername(userProfile.username || "");
        setBio(userProfile.bio || "");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const saveProfile = async () => {
    if (!publicKey) return;
    try {
      const updated = await updateUser({
        walletAddress: publicKey.toBase58(),
        username: username || undefined,
        bio: bio || undefined,
      });
      setProfile(updated);
      setEditing(false);
      toast({ title: "Success", description: "Profile updated!", variant: "success" });
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (publicKey) {
      loadProfile();
      loadUserListings();
    }
  }, [publicKey]);

  const loadUserListings = async () => {
    if (!publicKey) return;
    try {
      const userListings = await fetchListings({ sellerId: publicKey.toBase58() });
      // Update store with user's listings
      useStore.getState().setListings(userListings);
    } catch (error) {
      console.error("Error loading user listings:", error);
    }
  };

  const userListings = listings.filter((l) => l.seller === publicKey?.toBase58());
  const activeListings = userListings.filter((l) => !l.sold);
  const soldListings = userListings.filter((l) => l.sold);

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-slate-400 mb-6">Please connect your Solana wallet to view your profile</p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {profile?.username || "Your Profile"}
                </h1>
                <p className="text-slate-400 font-mono text-sm">{publicKey.toBase58()}</p>
              </div>
              <Button variant="outline" onClick={() => setEditing(!editing)}>
                <Edit className="h-4 w-4 mr-2" />
                {editing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <Button onClick={saveProfile}>Save Changes</Button>
              </div>
            ) : (
              <div>
                {profile?.bio && <p className="text-slate-300 mb-4">{profile.bio}</p>}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-accent" />
                    <span className="text-lg font-semibold">
                      {balance !== null ? formatTokenAmount(balance * Math.pow(10, 9)) : "Loading..."} $GUL
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="text-lg">{activeListings.length} Active Listings</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">My Listings</h2>
            {activeListings.length === 0 && soldListings.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
                <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">You haven't created any listings yet</p>
                <Link href="/create-listing">
                  <Button>Create Your First Listing</Button>
                </Link>
              </div>
            ) : (
              <div>
                {activeListings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Active Listings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeListings.map((listing) => (
                        <Link key={listing.id} href={`/listing/${listing.id}`}>
                          <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-primary transition-colors cursor-pointer">
                            <div className="aspect-square relative bg-slate-800">
                              {listing.images && listing.images.length > 0 ? (
                                <Image
                                  src={listing.images[0]}
                                  alt={listing.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-12 w-12 text-slate-600" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2 line-clamp-2">{listing.title}</h3>
                              <p className="text-accent font-bold">
                                {formatTokenAmount(listing.price)} $GUL
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {soldListings.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Sold Items</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {soldListings.map((listing) => (
                        <Link key={listing.id} href={`/listing/${listing.id}`}>
                          <div className="rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden opacity-60">
                            <div className="aspect-square relative bg-slate-800">
                              {listing.images && listing.images.length > 0 ? (
                                <Image
                                  src={listing.images[0]}
                                  alt={listing.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-12 w-12 text-slate-600" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2 line-clamp-2">{listing.title}</h3>
                              <p className="text-slate-500 text-sm">Sold</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

