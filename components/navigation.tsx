"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from "@/components/wallet-multi-button";
import { LanguageToggle } from "@/components/language-toggle";
import { Icon } from "@/lib/icons";
import { useTranslation } from "@/lib/i18n-client";

export function Navigation() {
  const { t, mounted } = useTranslation();
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-purple-500/30 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-purple-500/10"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold group">
            <Icon name="moon" className="h-8 w-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {mounted ? t("home.title") : "Phenix Nest"}
            </span>
          </Link>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/marketplace">
              <Button variant="ghost" className="hover:text-purple-300">{t("nav.marketplace")}</Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create-listing">
              <Button variant="ghost" className="hover:text-purple-300">{t("nav.createListing")}</Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/profile">
              <Button variant="ghost" className="hover:text-purple-300">{t("nav.profile")}</Button>
            </Link>
          </motion.div>
          <LanguageToggle />
          <WalletMultiButton />
        </div>
      </div>
    </motion.nav>
  );
}

