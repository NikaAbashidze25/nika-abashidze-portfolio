import type { LucideIcon } from 'lucide-react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

type SocialLink = {
  name: string;
  icon: LucideIcon;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/nika-abashidze-16aa38359/' },
  { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/nika.abashidze.58118' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nikaabashidze25/' },
];

type PortfolioItem = {
  id: number;
  title: string;
  category: 'Composition' | 'Guitar' | 'Sound Design';
  description: string;
  youtubeId: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Cinematic Trailer Score',
    category: 'Composition',
    description: 'Original composition for a fictional movie trailer, blending orchestral and electronic elements to create a dramatic and immersive soundscape.',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Animated Short "The Wanderer"',
    category: 'Sound Design',
    description: 'Complete sound design, foley, and mixing for an animated short. The goal was to bring the minimalist visuals to life with rich audio textures.',
    youtubeId: '3-yI-q_1L9I',
  },
  {
    id: 3,
    title: 'Acoustic Session: "Solitude"',
    category: 'Guitar',
    description: 'A live performance of an original intricate fingerstyle guitar piece, recorded in a single take to capture the raw emotion of the music.',
    youtubeId: 'h6fcK_fRYaI',
  },
  {
    id: 4,
    title: 'Video Game Main Theme',
    category: 'Composition',
    description: 'Main theme for an indie adventure game. The music evolves with the player\'s journey, incorporating adaptive audio techniques.',
    youtubeId: 'gN_x1rpGbY8',
  },
  {
    id: 5,
    title: 'Commercial Audio for "Nova"',
    category: 'Sound Design',
    description: 'Sound design and audio mixing for a tech product commercial. The sound enhances the sleek and futuristic feel of the product.',
    youtubeId: '8aGhZQkoFbQ',
  },
  {
    id: 6,
    title: 'Electric Guitar Improvisation',
    category: 'Guitar',
    description: 'An improvised electric guitar solo over a custom backing track, showcasing technical proficiency and melodic creativity in a rock-fusion style.',
    youtubeId: 'T_lC2O1oIUA',
  },
];
