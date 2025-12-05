export type Language = 'en' | 'bg';

export interface Translations {
  [key: string]: {
    en: string;
    bg: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.marketplace': { en: 'Marketplace', bg: 'Пазар' },
  'nav.createListing': { en: 'Create Listing', bg: 'Създай Обява' },
  'nav.profile': { en: 'Profile', bg: 'Профил' },
  'nav.home': { en: 'Home', bg: 'Начало' },
  
  // Homepage
  'home.title': { en: 'Phenix Nest', bg: 'Гнездото на Феникса' },
  'home.subtitle': { en: 'Mystical Marketplace for Witches & Sorcerers', bg: 'Мистичен Пазар за Вещици и Магьосници' },
  'home.description': { en: 'Trade enchanted goods, rare ingredients, and magical artifacts for $GUL tokens on Solana.', bg: 'Търгувайте с магически стоки, редки съставки и артефакти за $GUL токени на Solana.' },
  'home.explore': { en: 'Explore Marketplace', bg: 'Разгледай Пазара' },
  'home.startSelling': { en: 'Start Selling', bg: 'Започни Да Продаваш' },
  
  // Categories
  'category.potions': { en: 'Potions', bg: 'Отвари' },
  'category.herbs': { en: 'Herbs', bg: 'Билки' },
  'category.oils': { en: 'Oils', bg: 'Масла' },
  'category.elixirs': { en: 'Elixirs', bg: 'Еликсири' },
  'category.crystals': { en: 'Crystals', bg: 'Кристали' },
  'category.talismans': { en: 'Talismans', bg: 'Талисмани' },
  'category.books': { en: 'Spell Books', bg: 'Книги за Магии' },
  'category.candles': { en: 'Candles', bg: 'Свещи' },
  'category.incense': { en: 'Incense', bg: 'Тамян' },
  'category.ritual': { en: 'Ritual Items', bg: 'Ритуални Предмети' },
  'category.all': { en: 'All Items', bg: 'Всички Предмети' },
  
  // Marketplace
  'marketplace.title': { en: 'Mystical Marketplace', bg: 'Мистичен Пазар' },
  'marketplace.search': { en: 'Search for spells, potions, herbs...', bg: 'Търси магии, отвари, билки...' },
  'marketplace.noResults': { en: 'No magical items found', bg: 'Няма намерени магически предмети' },
  'marketplace.createFirst': { en: 'Create First Listing', bg: 'Създай Първа Обява' },
  
  // Listing
  'listing.create': { en: 'Create New Listing', bg: 'Създай Нова Обява' },
  'listing.title': { en: 'Title', bg: 'Заглавие' },
  'listing.description': { en: 'Description', bg: 'Описание' },
  'listing.price': { en: 'Price ($GUL)', bg: 'Цена ($GUL)' },
  'listing.category': { en: 'Category', bg: 'Категория' },
  'listing.images': { en: 'Images', bg: 'Снимки' },
  'listing.seller': { en: 'Seller', bg: 'Продавач' },
  'listing.purchase': { en: 'Purchase with $GUL', bg: 'Купи с $GUL' },
  'listing.sold': { en: 'Sold', bg: 'Продадено' },
  'listing.yourListing': { en: 'This is your listing', bg: 'Това е твоята обява' },
  
  // Profile
  'profile.title': { en: 'Your Profile', bg: 'Твоят Профил' },
  'profile.username': { en: 'Username', bg: 'Потребителско Име' },
  'profile.bio': { en: 'Bio', bg: 'Биография' },
  'profile.balance': { en: 'Balance', bg: 'Баланс' },
  'profile.activeListings': { en: 'Active Listings', bg: 'Активни Обяви' },
  'profile.soldItems': { en: 'Sold Items', bg: 'Продадени Предмети' },
  'profile.edit': { en: 'Edit', bg: 'Редактирай' },
  'profile.save': { en: 'Save Changes', bg: 'Запази Промените' },
  
  // Common
  'common.connectWallet': { en: 'Connect Your Wallet', bg: 'Свържи Портфейла' },
  'common.walletRequired': { en: 'Please connect your Solana wallet', bg: 'Моля свържи Solana портфейла си' },
  'common.loading': { en: 'Loading...', bg: 'Зареждане...' },
  'common.cancel': { en: 'Cancel', bg: 'Отказ' },
  'common.save': { en: 'Save', bg: 'Запази' },
  'common.delete': { en: 'Delete', bg: 'Изтрий' },
  'common.back': { en: 'Back', bg: 'Назад' },
};

// Default language - always use 'en' for SSR to avoid hydration mismatch
const DEFAULT_LANGUAGE: Language = 'en';

// Get language from cookie (server-side) or localStorage (client-side)
export function getLanguage(): Language {
  // On server, always return default
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // On client, try to get from cookie first (for SSR compatibility)
  const cookieLang = document.cookie
    .split('; ')
    .find(row => row.startsWith('phenix-nest-language='))
    ?.split('=')[1] as Language;
  
  if (cookieLang === 'en' || cookieLang === 'bg') {
    return cookieLang;
  }
  
  // Fallback to localStorage
  const saved = localStorage.getItem('phenix-nest-language') as Language;
  if (saved === 'en' || saved === 'bg') {
    return saved;
  }
  
  return DEFAULT_LANGUAGE;
}

export function setLanguage(lang: Language) {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Set in both cookie and localStorage
  document.cookie = `phenix-nest-language=${lang}; path=/; max-age=31536000`; // 1 year
  localStorage.setItem('phenix-nest-language', lang);
}

// Translation function - always returns default on server to avoid hydration issues
export function t(key: string, lang?: Language): string {
  const currentLang = lang || getLanguage();
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[currentLang] || translation.en;
}
