"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { getTokenBalance, createTokenTransferTransaction, formatTokenAmount, connection } from "@/lib/solana";
import { Package, ArrowLeft, Coins } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { fetchListing, updateListing, createPurchase, fetchUser } from "@/lib/api";
import { demoListings } from "@/lib/demo-listings";

interface ListingDetailClientProps {
  listingId: string;
}

export function ListingDetailClient({ listingId }: ListingDetailClientProps) {
  const router = useRouter();
  const { publicKey, signTransaction } = useWallet();
  const { listings, updateListing } = useStore();
  const [listing, setListing] = useState<any>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadListing();
  }, [listingId]);

  const loadListing = async () => {
    try {
      const listingData = await fetchListing(listingId);
      if (listingData) {
        setListing(listingData);
        return;
      }
    } catch (error) {
      console.error("Error loading listing:", error);
    }
    
    // Fallback to demo listings if API fails
    const demoListing = demoListings.find((l) => l.id === listingId);
    if (demoListing) {
      setListing({
        id: demoListing.id,
        seller: demoListing.sellerId,
        title: demoListing.title,
        description: demoListing.description,
        price: demoListing.price,
        images: demoListing.images,
        category: demoListing.category,
        createdAt: new Date(demoListing.createdAt),
        updatedAt: new Date(demoListing.updatedAt),
        sold: demoListing.sold,
      });
    }
  };

  useEffect(() => {
    if (publicKey) {
      loadBalance();
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
  };

  const handlePurchase = async () => {
    if (!publicKey || !listing || !signTransaction) {
      toast({ title: "Error", description: "Please connect your wallet", variant: "destructive" });
      return;
    }

    if (listing.seller === publicKey.toBase58()) {
      toast({ title: "Error", description: "You cannot purchase your own listing", variant: "destructive" });
      return;
    }

    if (listing.sold) {
      toast({ title: "Error", description: "This item has already been sold", variant: "destructive" });
      return;
    }

    const priceInGul = listing.price / Math.pow(10, 9);
    if (balance === null || balance < priceInGul) {
      toast({ title: "Error", description: "Insufficient $GUL balance", variant: "destructive" });
      return;
    }

    setPurchasing(true);
    try {
      const { PublicKey } = await import("@solana/web3.js");
      const sellerPublicKey = new PublicKey(listing.seller);
      const transaction = await createTokenTransferTransaction(
        publicKey,
        sellerPublicKey,
        listing.price
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Sign and send transaction
      const signed = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      // Create purchase record and update listing
      const priceInGul = listing.price / Math.pow(10, 9);
      await createPurchase({
        listingId: listing.id,
        buyerId: publicKey.toBase58(),
        transactionSignature: signature,
        amount: priceInGul,
      });

      // Update listing via API - get user first to get ID
      const buyerUser = await fetchUser(publicKey.toBase58());
      if (buyerUser) {
        // Type assertion needed because updateListing from api accepts buyerId, not buyer
        type UpdateListingParams = { sold?: boolean; buyerId?: string };
        const updates: UpdateListingParams = { 
          sold: true, 
          buyerId: buyerUser.walletAddress 
        };
        await updateListing(listingId, updates);
      }
      
      // Reload listing
      await loadListing();
      
      // Update store
      useStore.getState().updateListing(listingId, { sold: true, buyer: publicKey.toBase58() });

      toast({ title: "Success", description: "Purchase completed!", variant: "success" });
      router.push("/profile");
    } catch (error: any) {
      console.error("Purchase error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete purchase",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <p className="text-xl text-slate-400">Listing not found</p>
          <Link href="/marketplace">
            <Button className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = publicKey?.toBase58() === listing.seller;
  const canPurchase = publicKey && !isOwner && !listing.sold && balance !== null && balance >= listing.price / Math.pow(10, 9);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square relative bg-slate-800 rounded-lg overflow-hidden mb-4">
              {listing.images && listing.images.length > 0 ? (
                <Image
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-slate-600" />
                </div>
              )}
            </div>
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary" : "border-slate-700"
                    }`}
                  >
                    <Image src={img} alt={`${listing.title} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              {listing.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm mb-2 capitalize">
                  {listing.category}
                </span>
              )}
              {listing.sold && (
                <span className="inline-block px-3 py-1 rounded-full bg-red-900/50 text-red-300 text-sm ml-2">
                  Sold
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
            <div className="flex items-center gap-2 mb-6">
              <Coins className="h-6 w-6 text-accent" />
              <span className="text-3xl font-bold text-accent">
                {formatTokenAmount(listing.price)} $GUL
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-slate-300 whitespace-pre-wrap">{listing.description}</p>
            </div>
            <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Seller</p>
              <p className="font-mono text-sm">{listing.seller}</p>
            </div>
            {publicKey && (
              <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <p className="text-sm text-slate-400 mb-1">Your Balance</p>
                <p className="text-lg font-semibold">
                  {balance !== null ? formatTokenAmount(balance * Math.pow(10, 9)) : "Loading..."} $GUL
                </p>
              </div>
            )}
            {isOwner ? (
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <p className="text-slate-400 mb-2">This is your listing</p>
                <Link href="/profile">
                  <Button>View in Profile</Button>
                </Link>
              </div>
            ) : listing.sold ? (
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <p className="text-slate-400">This item has been sold</p>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full"
                onClick={handlePurchase}
                disabled={!canPurchase || purchasing}
              >
                {purchasing ? "Processing..." : canPurchase ? "Purchase with $GUL" : "Connect Wallet to Purchase"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

