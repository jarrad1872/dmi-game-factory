export type GameTemplate = 'flappy' | 'runner' | 'match3';

export type GameTheme = 'industrial' | 'construction' | 'tech' | 'nature';

export interface DMIProduct {
  id: string;
  name: string;
  icon: string;
}

export const DMI_PRODUCTS: DMIProduct[] = [
  { id: 'core-bits', name: 'Core Bits', icon: '🔘' },
  { id: 'slurry-rings', name: 'Slurry Rings', icon: '⭕' },
  { id: 'diamond-blades', name: 'Diamond Blades', icon: '💎' },
  { id: 'drill-motors', name: 'Drill Motors', icon: '⚙️' },
];

export interface GameConfig {
  template: GameTemplate;
  title: string;
  products: string[];
  ctaText: string;
  ctaUrl: string;
  theme: GameTheme;
  difficulty: number;
  showBranding: boolean;
}

export interface GameBuild {
  id: string;
  name: string;
  config: GameConfig;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  code?: string; // Custom code from code editor
}

export const DEFAULT_CONFIG: GameConfig = {
  template: 'flappy',
  title: 'DMI Adventure',
  products: ['core-bits', 'diamond-blades'],
  ctaText: 'Shop DMI Tools',
  ctaUrl: 'https://dmitools.com',
  theme: 'industrial',
  difficulty: 5,
  showBranding: true,
};

export const THEME_COLORS: Record<GameTheme, { primary: string; secondary: string; bg: string }> = {
  industrial: { primary: '#FF6B00', secondary: '#4FC3F7', bg: '#1a1a2e' },
  construction: { primary: '#FFA500', secondary: '#FFD700', bg: '#2d2d2d' },
  tech: { primary: '#00D4FF', secondary: '#7B2DFF', bg: '#0a0a1a' },
  nature: { primary: '#4CAF50', secondary: '#8BC34A', bg: '#1a2e1a' },
};
