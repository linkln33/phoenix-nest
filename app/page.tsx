"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Icon } from "@/lib/icons";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n-client";

export default function HomePage() {
  const { t, mounted } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Icon name="crystal" className="h-32 w-32 text-purple-400" />
          </div>
          
          <div className="relative z-10">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Icon name="moon" className="h-12 w-12 text-purple-400" />
              <motion.h1
                variants={itemVariants}
                className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              >
                {mounted ? t("home.title") : "Phenix Nest"}
              </motion.h1>
              <Icon name="star" className="h-12 w-12 text-yellow-400" />
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-2xl text-purple-200 mb-4 font-light"
            >
              {t("home.subtitle")}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto"
            >
              {t("home.description")}
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/marketplace">
                  <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                    <Icon name="wand" className="h-5 w-5 mr-2" />
                    {t("home.explore")}
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/create-listing">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-purple-500 text-purple-300 hover:bg-purple-500/10">
                    <Icon name="sparkles" className="h-5 w-5 mr-2" />
                    {t("home.startSelling")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          >
            {t("category.all")}
          </motion.h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: "🧪", name: t("category.potions"), color: "from-purple-500 to-pink-500" },
              { icon: "🌿", name: t("category.herbs"), color: "from-green-500 to-emerald-500" },
              { icon: "🫗", name: t("category.oils"), color: "from-amber-500 to-orange-500" },
              { icon: "⚗️", name: t("category.elixirs"), color: "from-blue-500 to-cyan-500" },
              { icon: "💎", name: t("category.crystals"), color: "from-indigo-500 to-purple-500" },
              { icon: "🔮", name: t("category.talismans"), color: "from-red-500 to-pink-500" },
              { icon: "📖", name: t("category.books"), color: "from-slate-500 to-gray-600" },
              { icon: "🕯️", name: t("category.candles"), color: "from-yellow-500 to-amber-500" },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link href={`/marketplace?category=${category.name.toLowerCase()}`}>
                  <div className="group relative p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm hover:border-purple-500 transition-all duration-300 cursor-pointer overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity rounded-xl`}
                      whileHover={{ opacity: 0.3 }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-3">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-purple-200">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: "gem",
              title: "Magical Items",
              description: "Discover rare potions, enchanted herbs, mystical oils, and powerful elixirs from skilled practitioners.",
              color: "purple",
            },
            {
              icon: "wand",
              title: "$GUL Tokens",
              description: "Trade using Guldens ($GUL), our native token on the Solana blockchain for secure, fast transactions.",
              color: "pink",
            },
            {
              icon: "moon",
              title: "Decentralized",
              description: "Built on Solana for fast, low-cost transactions with true ownership of your magical goods.",
              color: "yellow",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-slate-900/50 backdrop-blur-sm cursor-pointer"
            >
              <Icon 
                name={feature.icon as any} 
                className={`h-12 w-12 mb-4 ${
                  feature.color === "purple" ? "text-purple-400" :
                  feature.color === "pink" ? "text-pink-400" :
                  "text-yellow-400"
                }`} 
              />
              <h3 className={`text-xl font-semibold mb-2 ${
                feature.color === "purple" ? "text-purple-200" :
                feature.color === "pink" ? "text-pink-200" :
                "text-yellow-200"
              }`}>
                {feature.title}
              </h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
