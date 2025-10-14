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

export type PortfolioItem = {
  id: number;
  title: string;
  category: 'Composition' | 'Guitar' | 'Linear Audio';
  description: string;
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Cinematic Trailer Score',
    category: 'Composition',
    description: 'Original composition for a fictional movie trailer, blending orchestral and electronic elements to create a dramatic and immersive soundscape.',
    type: 'audio',
    url: '/audio/cinematic-trailer-score.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/trailer-score/600/400'
  },
  {
    id: 2,
    title: 'Animated Short "The Wanderer"',
    category: 'Linear Audio',
    description: 'Complete sound design, foley, and mixing for an animated short. The goal was to bring the minimalist visuals to life with rich audio textures.',
    type: 'video',
    url: '/video/the-wanderer.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/wanderer-anim/600/400'
  },
  {
    id: 3,
    title: 'Acoustic Session: "Solitude"',
    category: 'Guitar',
    description: 'A live performance of an original intricate fingerstyle guitar piece, recorded in a single take to capture the raw emotion of the music.',
    type: 'video',
    url: '/video/solitude.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/acoustic-session/600/400'
  },
  {
    id: 4,
    title: 'Video Game Main Theme',
    category: 'Composition',
    description: 'Main theme for an indie adventure game. The music evolves with the player\'s journey, incorporating adaptive audio techniques.',
    type: 'audio',
    url: '/audio/game-theme.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/game-theme/600/400'
  },
  {
    id: 5,
    title: 'Commercial Audio for "Nova"',
    category: 'Linear Audio',
    description: 'Sound design and audio mixing for a tech product commercial. The sound enhances the sleek and futuristic feel of the product.',
    type: 'audio',
    url: '/audio/nova-commercial.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/nova-commercial/600/400'
  },
  {
    id: 6,
    title: 'Electric Guitar Improvisation',
    category: 'Guitar',
    description: 'An improvised electric guitar solo over a custom backing track, showcasing technical proficiency and melodic creativity in a rock-fusion style.',
    type: 'video',
    url: '/video/guitar-improvisation.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/guitar-improv/600/400'
  },
];
