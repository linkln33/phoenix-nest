"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLanguage, setLanguage, type Language } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n-client";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { lang, changeLanguage, mounted } = useTranslation();

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "bg" : "en";
    changeLanguage(newLang);
    // Force re-render by reloading the page
    window.location.reload();
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <Languages className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="gap-2 border border-purple-500/30 hover:bg-purple-500/10"
      title={lang === "en" ? "Switch to Bulgarian" : "Switch to English"}
    >
      <Languages className="h-4 w-4" />
      <span className="font-semibold">{lang === "en" ? "EN" : "BG"}</span>
    </Button>
  );
}

