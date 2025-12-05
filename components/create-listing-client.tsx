"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { WalletMultiButton } from "@/components/wallet-multi-button";
import { X, Plus } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { createListing } from "@/lib/api";
import { useTranslation } from "@/lib/i18n-client";
import { getOrCreateUser } from "@/lib/db-helpers";

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be at least 0.01 $GUL"),
  category: z.string().optional(),
});

type ListingFormData = z.infer<typeof listingSchema>;

export function CreateListingClient() {
  const { t } = useTranslation();
  const router = useRouter();
  const { publicKey } = useWallet();
  const { addListing } = useStore();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      // In production, upload to IPFS/Arweave
      // For now, we'll use data URLs (localStorage)
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          toast({ title: "Error", description: `${file.name} is too large (max 5MB)`, variant: "destructive" });
          continue;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          newImages.push(result);
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ListingFormData) => {
    if (!publicKey) {
      toast({ title: "Error", description: "Please connect your wallet", variant: "destructive" });
      return;
    }

    if (images.length === 0) {
      toast({ title: "Error", description: "Please upload at least one image", variant: "destructive" });
      return;
    }

    try {
      // Get or create user in database
      const userResponse = await fetch(`/api/users?walletAddress=${publicKey.toBase58()}`);
      const user = await userResponse.json();

      // Create listing via API
      const newListing = await createListing({
        sellerId: user.id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        images,
      });

      addListing(newListing);
      toast({ title: "Success", description: "Listing created successfully!", variant: "success" });
      router.push(`/listing/${newListing.id}`);
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create listing",
        variant: "destructive",
      });
    }
  };

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-slate-400 mb-6">Please connect your Solana wallet to create a listing</p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {t("listing.create")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t("listing.title")} *</label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={t("listing.title")}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("listing.description")} *</label>
            <textarea
              {...register("description")}
              rows={6}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={t("listing.description")}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("listing.price")} *</label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0.01"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("listing.category")}</label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">{t("listing.category")}</option>
                <option value="potions">{t("category.potions")}</option>
                <option value="herbs">{t("category.herbs")}</option>
                <option value="oils">{t("category.oils")}</option>
                <option value="elixirs">{t("category.elixirs")}</option>
                <option value="crystals">{t("category.crystals")}</option>
                <option value="talismans">{t("category.talismans")}</option>
                <option value="books">{t("category.books")}</option>
                <option value="candles">{t("category.candles")}</option>
                <option value="incense">{t("category.incense")}</option>
                <option value="ritual">{t("category.ritual")}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("listing.images")} *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700">
                  <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="text-slate-400">Uploading...</div>
                  ) : (
                    <Plus className="h-8 w-8 text-slate-400" />
                  )}
                </label>
              )}
            </div>
            {images.length === 0 && (
              <p className="text-red-500 text-sm">Please upload at least one image</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting || uploading} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? t("common.loading") : t("listing.create")}
            </Button>
            <Link href="/marketplace">
              <Button type="button" variant="outline">{t("common.cancel")}</Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

