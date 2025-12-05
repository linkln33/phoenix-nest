"use client";

import { useState, useEffect } from "react";
import { getLanguage, setLanguage, type Language, translations } from "./i18n";

// Client-side only translation hook
export function useTranslation() {
  const [lang, setLangState] = useState<Language>(() => {
    // Initialize with default to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      return getLanguage();
    }
    return 'en';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLangState(getLanguage());
  }, []);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[lang] || translation.en;
  };

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setLangState(newLang);
  };

  return { t, lang, changeLanguage, mounted };
}

