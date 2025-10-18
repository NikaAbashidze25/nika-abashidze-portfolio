
import React from 'react';

// Custom SVG components for social icons
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="#0077B5" stroke="none"/>
      <rect width="4" height="12" x="2" y="9" fill="#0077B5" stroke="none"/>
      <circle cx="4" cy="4" r="2" fill="#0077B5" stroke="none"/>
    </svg>
  );
  
  const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#1877F2" stroke="none"/>
    </svg>
  );
  
  const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <defs>
        <radialGradient id="insta-gradient" cx="0.3" cy="1" r="1">
          <stop offset="0" stopColor="#FFD600"/>
          <stop offset="0.5" stopColor="#FF7A00"/>
          <stop offset="1" stopColor="#D62976"/>
        </radialGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="url(#insta-gradient)" stroke="none"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white" stroke="none"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

type SocialLink = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/nika-abashidze-16aa38359/' },
  { name: 'Facebook', icon: FacebookIcon, url: 'https://www.facebook.com/nika.abashidze.58118' },
  { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/nikaabashidze25/' },
];

export type PortfolioItem = {
  id: number;
  title: string;
  category: 'Music' | 'Guitar Performance' | 'Linear Audio' | 'Game Audio';
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
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Cinematic Trailer Score',
    category: 'Music',
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
    category: 'Music',
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
    title: 'Tango En Skai - Roland Dyens (Komarovi Solo Concert)',
    category: 'Guitar Performance',
    description: 'A live performance of an original intricate fingerstyle guitar piece.',
    longDescription: 'A live performance of an original intricate fingerstyle guitar piece, recorded in a single take to capture the raw emotion of the music.',
    roleDescription: 'As the sole performer and composer of this piece, my focus was on delivering a technically clean yet emotionally resonant performance. I also managed the recording and mixing process.',
    type: 'video',
    url: 'https://youtu.be/7lk_tFkkTT8?si=ZR7W_P1LyEUwDJPD&t=22',
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
    category: 'Guitar Performance',
    description: 'An improvised electric guitar solo over a custom backing track.',
    longDescription: 'An improvised electric guitar solo over a custom backing track, showcasing technical proficiency and melodic creativity in a rock-fusion style.',
    roleDescription: 'In this piece, I composed the backing track and performed the improvised lead guitar part. It\'s a demonstration of my ability to create compelling melodies and navigate complex harmonic structures in real-time.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kU4sPPl3LBw',
    thumbnailUrl: '/images/Weiss.jpg',
  },
  {
    id: 7,
    title: 'Nika Abashidze - Vazha',
    category: 'Guitar Performance',
    description: 'A captivating original guitar performance.',
    longDescription: 'A live performance of the original composition "Vazha", showcasing a blend of intricate fingerstyle and melodic phrasing.',
    roleDescription: 'Composer and performer of the piece. Responsible for the composition, arrangement, and performance.',
    type: 'video',
    url: 'https://www.youtube.com/embed/7lk_tFkkTT8',
    thumbnailUrl: 'https://picsum.photos/seed/vazha-guitar/600/400',
  },
  {
    id: 8,
    title: 'Audio Post-Production Practice #3 - Dumbots - Jump Shoes',
    category: 'Linear Audio',
    description: 'Crafting futuristic sounds for an otherworldly experience.',
    longDescription: 'This project involved creating a complete sonic landscape for a short sci-fi animation. From alien creature vocalizations to the hum of advanced technology and atmospheric effects, every sound was custom-designed to build an immersive and believable world.',
    roleDescription: 'I was responsible for all sound design, foley, and the final audio mix. The challenge was to create unique sounds that felt both alien and emotionally resonant, enhancing the film\'s narrative and visual storytelling.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=BHmFQ96LtMY',
    thumbnailUrl: '/images/dumbots.png'
  },
  {
    id: 10,
    title: 'Game Audio - Interactive Website',
    category: 'Game Audio',
    description: 'An interactive web experience showcasing dynamic sound design.',
    longDescription: 'This project is a web-based demonstration of adaptive audio concepts. Users can interact with elements on the page to trigger different soundscapes and musical layers, showing how audio can change in real-time based on user input.',
    roleDescription: 'I designed and programmed the audio logic and created all the sound assets. This was a great exercise in combining web development with creative sound design to showcase audio middleware principles.',
    type: 'video',
    url: '',
    externalLink: {
        label: 'Visit the Interactive Site',
        url: '#'
    },
    thumbnailUrl: 'https://picsum.photos/seed/game-audio-2/600/400'
  }
];
