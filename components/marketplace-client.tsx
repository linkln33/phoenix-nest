"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Search, Package } from "lucide-react";
import { formatTokenAmount } from "@/lib/solana";
import { fetchListings } from "@/lib/api";
import { demoListings } from "@/lib/demo-listings";
import { useTranslation } from "@/lib/i18n-client";

export function MarketplaceClient() {
  const { t } = useTranslation();
  const { listings, setListings } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Load demo listings immediately on mount
  useEffect(() => {
    loadDemoListings();
    // Also try API in background (non-blocking)
    loadListings();
  }, [selectedCategory, searchQuery]);

  const loadDemoListings = () => {
    const filtered = demoListings.filter((listing) => {
      if (listing.sold) return false;
      const matchesSearch = searchQuery === "" || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    // Convert demo listings to match Listing interface
    const converted = filtered.map((listing) => ({
      id: listing.id,
      seller: listing.sellerId,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      images: listing.images,
      category: listing.category,
      createdAt: new Date(listing.createdAt),
      updatedAt: new Date(listing.updatedAt),
      sold: listing.sold,
    }));
    setListings(converted);
    setLoading(false);
  };

  const loadListings = async () => {
    try {
      const data = await fetchListings({
        sold: false,
        category: selectedCategory === "all" ? undefined : selectedCategory,
        search: searchQuery || undefined,
      });
      if (data && data.length > 0) {
        setListings(data);
      }
      // If API returns empty, keep demo listings
    } catch (error) {
      console.error("Error loading listings from API:", error);
      // Demo listings already loaded, so we're good
    }
  };

  const categories = [
    { value: "all", label: t("category.all") },
    { value: "potions", label: t("category.potions") },
    { value: "herbs", label: t("category.herbs") },
    { value: "oils", label: t("category.oils") },
    { value: "elixirs", label: t("category.elixirs") },
    { value: "crystals", label: t("category.crystals") },
    { value: "talismans", label: t("category.talismans") },
    { value: "books", label: t("category.books") },
    { value: "candles", label: t("category.candles") },
    { value: "incense", label: t("category.incense") },
    { value: "ritual", label: t("category.ritual") },
  ];

  const filteredListings = listings.filter((listing) => {
    if (listing.sold) return false;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {t("marketplace.title")}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder={t("marketplace.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={selectedCategory === cat.value ? "bg-purple-600 hover:bg-purple-700 border-purple-500" : "border-purple-500/30 hover:border-purple-500"}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400">{t("common.loading")}</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔮</div>
            <p className="text-xl text-slate-400 mb-4">{t("marketplace.noResults")}</p>
            <Link href="/create-listing">
              <Button className="bg-purple-600 hover:bg-purple-700">{t("marketplace.createFirst")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link href={`/listing/${listing.id}`}>
                  <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-slate-900/50 to-purple-900/10 overflow-hidden hover:border-purple-500 transition-all duration-300 cursor-pointer shadow-lg shadow-purple-500/10">
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
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-accent">
                        {formatTokenAmount(listing.price)} $GUL
                      </span>
                      {listing.category && (
                        <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 capitalize">
                          {listing.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

