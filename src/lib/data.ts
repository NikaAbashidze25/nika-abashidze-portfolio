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
  descriptionImage?: string;
  externalLink?: {
    label: string;
    url:string;
  };
  type: 'audio' | 'video';
  url: string;
  thumbnailUrl: string;
  posterUrl?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Cinematic Trailer Score',
    category: 'Composition',
    description: 'Orchestral and electronic elements blend to create a dramatic, immersive soundscape.',
    longDescription: 'This score was composed for a hypothetical movie trailer, designed to build tension and excitement. It features a full orchestral arrangement combined with modern electronic textures and heavy percussion to create a powerful and epic feel.',
    roleDescription: 'As the composer, I was responsible for the entire creation of the piece, from the initial melodic concepts to the final orchestration and mixing. The goal was to produce a track that could stand on its own while also supporting a strong visual narrative.',
    type: 'audio',
    url: '/audio/Tron Alike Portfolio.wav',
    thumbnailUrl: 'https://picsum.photos/seed/trailer-score/600/400',
  },
  {
    id: 4,
    title: 'Video Game Main Theme',
    category: 'Composition',
    description: 'An evolving theme for an indie adventure game, incorporating adaptive audio techniques.',
    longDescription: 'The main theme for the indie title "Aetherium." The music was written to be adaptive, with different layers and intensities that can change based on gameplay, from peaceful exploration to intense combat sequences.',
    roleDescription: 'I composed and produced the main theme, working closely with the game developers to ensure the music reflected the game\'s atmosphere and narrative. This involved creating multiple arrangements and stems for the adaptive audio engine.',
    type: 'audio',
    url: '/audio/game-theme.mp3',
    thumbnailUrl: 'https://picsum.photos/seed/game-theme/600/400',
  },
  {
    id: 2,
    title: 'Audio Post Production Practice #1 - Animation Project',
    category: 'Linear Audio',
    description: 'Complete sound design, foley, and mixing for an animated short.',
    longDescription: 'Complete sound design, foley, and mixing for an animated short. The goal was to bring the minimalist visuals to life with rich audio textures.',
    roleDescription: 'For this project, I handled all aspects of the audio post-production, from foley recording and sound effect creation to the final mix and master.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kW0Paxotqyo', 
    thumbnailUrl: '/images/ThumbnailElephant.png',
  },
  {
    id: 3,
    title: 'Tango En Skai - Roland Dyens (Nika Abashidze)',
    category: 'Guitar',
    description: 'A live performance of an original intricate fingerstyle guitar piece.',
    longDescription: 'A live performance of an original intricate fingerstyle guitar piece, recorded in a single take to capture the raw emotion of the music.',
    roleDescription: 'As the sole performer and composer of this piece, my focus was on delivering a technically clean yet emotionally resonant performance. I also managed the recording and mixing process.',
    type: 'video',
    url: 'https://www.youtube.com/embed/7lk_tFkkTT8',
    thumbnailUrl: '/images/Tango.jpg',
    descriptionImage: '/images/GuitarConcertPoster.png',
  },
  {
    id: 5,
    title: 'Audio Post Production Practice #2 - Short Animation',
    category: 'Linear Audio',
    description: 'Sound design and audio mixing for a tech product commercial.',
    longDescription: 'Sound design and audio mixing for a tech product commercial. The sound enhances the sleek and futuristic feel of the product, aligning with its modern aesthetic.',
    roleDescription: 'My role was to create a soundscape that matched the product\'s brand identity. This involved sound design, selecting and editing music, and mixing all audio elements to broadcast standards.',
    type: 'video',
    url: 'https://www.youtube.com/embed/wjtb69nZfTM',
    thumbnailUrl: '/images/Bird.png',
  },
  {
    id: 6,
    title: 'S.L.Weiss - Fantasie',
    category: 'Guitar',
    description: 'An improvised electric guitar solo over a custom backing track.',
    longDescription: 'An improvised electric guitar solo over a custom backing track, showcasing technical proficiency and melodic creativity in a rock-fusion style.',
    roleDescription: 'In this piece, I composed the backing track and performed the improvised lead guitar part. It\'s a demonstration of my ability to create compelling melodies and navigate complex harmonic structures in real-time.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kU4sPPl3LBw',
    thumbnailUrl: 'Weiss.jpg',
  },
  {
    id: 7,
    title: 'Nika Abashidze - Vazha',
    category: 'Guitar',
    description: 'A captivating original guitar performance.',
    longDescription: 'A live performance of the original composition "Vazha", showcasing a blend of intricate fingerstyle and melodic phrasing.',
    roleDescription: 'Composer and performer of the piece. Responsible for the composition, arrangement, and performance.',
    type: 'video',
    url: 'https://www.youtube.com/embed/7lk_tFkkTT8',
    thumbnailUrl: 'https://picsum.photos/seed/vazha-guitar/600/400',
  }
];
