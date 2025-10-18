
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
    title: 'Electronic | Orchestral (Tron Feel Music)',
    category: 'Music',
    description: 'Orchestral and electronic elements blend to create a dramatic, immersive soundscape.',
    longDescription: 'Inspired by Tron: Legacy – Daft Punk: The Suite, combining orchestral and electronic sounds for a cinematic effect.',
    roleDescription: '',
    type: 'audio',
    url: '/audio/Tron Alike Portfolio.wav',
    thumbnailUrl: '/images/CosmicBackground.jpg',
  },
  {
    id: 4,
    title: 'Orchestral (Action/Combat) ',
    category: 'Music',
    description: 'One of my very first orchestral compositions(2022)',
    longDescription: 'Definitely needs some mixing, though I love the energy It gave me when I created it',
    roleDescription: 'DAW - Fl Studio (Used Kontakt symphony orchestra for the very first time... )',
    type: 'audio',
    url: '/audio/OrchestralTest.mp3',
    thumbnailUrl: '/images/ensemble.jpg',
  },
  {
    id: 2,
    title: 'Audio Post Production Practice #1 - Animation Project',
    category: 'Linear Audio',
    description: 'Music | Sound Design | Audio Mixing',
    longDescription: 'Animation was made by my brother - Levan Abashidze (Le1cho). This is one of my first projects fully made in Reaper (After Fl Studio) - Full Audio Post production.',
    roleDescription: 'I handled all aspects of the audio post-production, from music scoring and sound effects to the final mix and master.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kW0Paxotqyo', 
    thumbnailUrl: '/images/ThumbnailElephant.png',
  },
  {
    id: 3,
    title: 'Tango En Skai - Roland Dyens',
    category: 'Guitar Performance',
    description: 'A live performance - my Solo Guitar Concert at Komarovi Campus School.',
    longDescription: 'This is one of my live recordings at Komarovi Campus School (2024). I\'ve always wanted to contribute something musical to Komarovi, so I ended up performing a Solo Guitar Concert :DD This piece is one of the compositions from my repertoire. I\'ve always admired the musicality of Roland Dyens, and I am sure I\'ll learn a lot from exploring his works in the future. ',
    roleDescription: 'Classical Guitar Solo Concert Live Performer',
    type: 'video',
    url: 'https://youtu.be/7lk_tFkkTT8?si=ZR7W_P1LyEUwDJPD&t=22',
    thumbnailUrl: '/images/Tango.jpg',
    descriptionImage: '/images/GuitarConcertPoster.png',
  },
  {
    id: 5,
    title: 'Audio Post Production Practice #2 - Short Animation',
    category: 'Linear Audio',
    description: 'Music | Sound Design | Audio Mixing',
    longDescription: 'Animation made by my brother - Levan Abashidze (Le1cho) (2023). The goal was to capture the sense of freedom using music and carefully placed dramatic transitions. The animation explores the feeling of release and motion... ',
    roleDescription: '',
    type: 'video',
    url: 'https://www.youtube.com/embed/wjtb69nZfTM',
    thumbnailUrl: '/images/Bird.png',
  },
  {
    id: 6,
    title: 'S.L.Weiss - Fantasie',
    category: 'Guitar Performance',
    description: 'One of the compositions out of my Guitar repertoire',
    longDescription: ' About the composer:  Sylvius Leopold Weiss (1686–1750) -  German composer and lutenist. His lute works translate beautifully to the guitar.',
    roleDescription: 'I recorded this piece in 2024, while testing my usb microphone (HyperX):DD.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kU4sPPl3LBw',
    thumbnailUrl: '/images/Weiss.jpg',
  },
  {
    id: 7,
    title: 'Isaac Albéniz - Leyenda',
    category: 'Guitar Performance',
    description: 'Solo Guitar Concert at Komarovi Campus School (Partial Recording)',
    longDescription: '',
    roleDescription: 'Komarovi Solo Guitar Concert Recording',
    type: 'video',
    url: 'https://youtu.be/v0rwCozHIk8',
    thumbnailUrl: '/images/Leyenda.png',
  },
  {
    id: 8,
    title: 'Audio Post-Production Practice #3 - Dumbots - Jump Shoes',
    category: 'Linear Audio',
    description: 'Focused on synced movement sounds',
    longDescription: 'Animation was made by my brother - Levan Abashidze (Le1cho)(2024). I didn\'t compose the music for this animation, but I absolutely love how well the following pieces of music fit with it: Fleetwood Mac \- The Chain |The Beatles \- Strawberry Fields Forever. ',
    roleDescription: 'I was responsible for all sound effects, and the final audio mix. Software: Fl Studio.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=BHmFQ96LtMY',
    thumbnailUrl: '/images/dumbots.png'
  },
  {
    id: 10,
    title: 'Game Audio Practice #1 - GDG Kutaisi Hackathon 2025 Winner Project ',
    category: 'Game Audio',
    description: ' Educational Game - LIFE (Learning Is For Everyone)',
    longDescription: 'The game was built under the topic - "Gamified Education". This Specific video is the showcase of our game, You can Visit website to download the demo version and test the Audio part of it along with the game.',
    roleDescription: 'I worked on Sound Design, Video Editing, Recording/VoiceOverin, and Music Production. I used quite minimalistic sounds, though it was a great experience for the first steps into a Game Audio Design.',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=kizOK2RtQkA',
    externalLink: {
        label: 'Visit Platform to see our Game',
        url: 'https://theggestking.github.io/Hackathon/'
    },
    thumbnailUrl: '/images/LIFE.png'
  }
];
