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
  longDescription?: string;
  roleDescription?: string;
  externalLink?: {
    label: string;
    url: string;
  };
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Cinematic Trailer Score',
    category: 'Composition',
    description: 'Orchestral and electronic elements blend to create a dramatic, immersive soundscape.',
    type: 'audio',
    url: '/audio/cinematic-trailer-score.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/trailer-score/600/400',
  },
  {
    id: 4,
    title: 'Video Game Main Theme',
    category: 'Composition',
    description: 'An evolving theme for an indie adventure game, incorporating adaptive audio techniques.',
    type: 'audio',
    url: '/audio/game-theme.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/game-theme/600/400',
  },
  {
    id: 2,
    title: 'Animated Short "The Wanderer"',
    category: 'Linear Audio',
    description: 'Complete sound design, foley, and mixing for an animated short.',
    longDescription: 'Complete sound design, foley, and mixing for an animated short. The goal was to bring the minimalist visuals to life with rich audio textures.',
    roleDescription: 'For this project, I handled all aspects of the audio post-production, from foley recording and sound effect creation to the final mix and master.',
    type: 'video',
    url: 'https://www.youtube.com/embed/L3n1f4oI3_8',
    thumbnailUrl: 'https://picsum.photos/seed/wanderer-anim/600/400'
  },
  {
    id: 3,
    title: 'Acoustic Session: "Solitude"',
    category: 'Guitar',
    description: 'A live performance of an original intricate fingerstyle guitar piece.',
    longDescription: 'A live performance of an original intricate fingerstyle guitar piece, recorded in a single take to capture the raw emotion of the music.',
    roleDescription: 'As the sole performer and composer of this piece, my focus was on delivering a technically clean yet emotionally resonant performance. I also managed the recording and mixing process.',
    type: 'video',
    url: 'https://www.youtube.com/embed/wX5yP2hT8gU',
    thumbnailUrl: 'https://picsum.photos/seed/acoustic-session/600/400'
  },
  {
    id: 5,
    title: 'Commercial Audio for "Nova"',
    category: 'Linear Audio',
    description: 'Sound design and audio mixing for a tech product commercial.',
    longDescription: 'Sound design and audio mixing for a tech product commercial. The sound enhances the sleek and futuristic feel of the product, aligning with its modern aesthetic.',
    roleDescription: 'My role was to create a soundscape that matched the product\'s brand identity. This involved sound design, selecting and editing music, and mixing all audio elements to broadcast standards.',
    type: 'video',
    url: 'https://www.youtube.com/embed/G524_4V1yRg',
    thumbnailUrl: 'https://picsum.photos/seed/nova-commercial/600/400'
  },
  {
    id: 6,
    title: 'Electric Guitar Improvisation',
    category: 'Guitar',
    description: 'An improvised electric guitar solo over a custom backing track.',
    longDescription: 'An improvised electric guitar solo over a custom backing track, showcasing technical proficiency and melodic creativity in a rock-fusion style.',
    roleDescription: 'In this piece, I composed the backing track and performed the improvised lead guitar part. It\'s a demonstration of my ability to create compelling melodies and navigate complex harmonic structures in real-time.',
    type: 'video',
    url: 'https://www.youtube.com/embed/p_jpE0Vp9iA',
    thumbnailUrl: 'https://picsum.photos/seed/guitar-improv/600/400'
  },
];
