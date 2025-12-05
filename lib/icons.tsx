"use client";

// Using react-icons for better witchcraft/magic themed icons
import { 
  // Game Icons (magic themed)
  GiMagicPotion,
  GiHerbsBundle,
  GiOilLamp,
  GiElixir,
  GiCrystalShine,
  GiTalisman,
  GiBookCover,
  GiCandleFlame,
  GiIncense,
  GiMagicPortal,
  GiCrystalBall,
  GiWizardStaff,
  GiMoon,
  GiStarSkull,
  GiSparkles,
  GiGemPendant,
  GiEyeOfHorus,
  GiLightningBolt,
  GiHeartShield,
  GiShield,
  GiSwordBrandish,
  GiCrown,
  GiCoins,
  GiPackage,
} from "react-icons/gi";
import {
  Search as SearchIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  X as XIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ChevronDown as ChevronDownIcon,
  Check as CheckIcon,
  Languages as LanguagesIcon,
} from "lucide-react";
import { 
  Github as GithubIcon,
  Twitter as TwitterIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
} from "react-icons/fa";

// Magical/Witchcraft themed icon mappings
export const MagicIcons = {
  // Core magical icons
  moon: GiMoon,
  star: GiStarSkull,
  sparkles: GiSparkles,
  wand: GiWizardStaff,
  gem: GiGemPendant,
  eye: GiEyeOfHorus,
  zap: GiLightningBolt,
  crystal: GiCrystalBall,
  
  // Potions & Alchemy
  potion: GiMagicPotion,
  elixir: GiElixir,
  herbs: GiHerbsBundle,
  oils: GiOilLamp,
  
  // Ritual items
  book: GiBookCover,
  scroll: GiBookCover, // Using book as scroll alternative
  candle: GiCandleFlame,
  flame: GiCandleFlame,
  incense: GiIncense,
  portal: GiMagicPortal,
  
  // Protection & Power
  shield: GiHeartShield,
  sword: GiSwordBrandish,
  crown: GiCrown,
  heart: GiHeartShield,
  
  // Commerce
  coins: GiCoins,
  package: GiPackage,
  
  // UI
  search: SearchIcon,
  user: UserIcon,
  settings: SettingsIcon,
  menu: MenuIcon,
  close: XIcon,
  plus: PlusIcon,
  edit: EditIcon,
  trash: TrashIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  chevronDown: ChevronDownIcon,
  check: CheckIcon,
  x: XIcon,
  
  // Social
  github: GithubIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
  globe: GlobeIcon,
  languages: LanguagesIcon,
};

export type IconName = keyof typeof MagicIcons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  [key: string]: any;
}

export function Icon({ name, className, size = 24, ...props }: IconProps) {
  const IconComponent = MagicIcons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent className={className} size={size} {...props} />;
}
