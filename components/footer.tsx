"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/lib/icons";
import { useTranslation } from "@/lib/i18n-client";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: t("nav.marketplace"), href: "/marketplace" },
      { label: t("nav.createListing"), href: "/create-listing" },
      { label: t("category.all"), href: "/marketplace?category=all" },
    ],
    categories: [
      { label: t("category.potions"), href: "/marketplace?category=potions" },
      { label: t("category.herbs"), href: "/marketplace?category=herbs" },
      { label: t("category.crystals"), href: "/marketplace?category=crystals" },
      { label: t("category.talismans"), href: "/marketplace?category=talismans" },
    ],
    community: [
      { label: "Discord", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative border-t border-purple-500/30 bg-gradient-to-b from-slate-900 to-slate-950 mt-20">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-red-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold group">
            <Icon name="moon" className="h-8 w-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t("home.title")}
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              {t("home.description")}
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
              >
                <Icon name="twitter" className="h-5 w-5 text-purple-400" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
              >
                <Icon name="github" className="h-5 w-5 text-purple-400" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
              >
                <Icon name="mail" className="h-5 w-5 text-purple-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Marketplace Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Icon name="sparkles" className="h-5 w-5" />
              Marketplace
            </h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Icon name="moon" className="h-5 w-5" />
              {t("category.all")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <Icon name="heart" className="h-5 w-5" />
              Community
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-purple-500/20 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm flex items-center gap-2">
              © {currentYear} {t("home.title")}. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Icon name="heart" className="h-4 w-4 text-pink-500 fill-pink-500" />
              </motion.span>
              by the magical community
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

