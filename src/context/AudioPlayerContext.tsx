
"use client";

import { createContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { PortfolioItem } from '@/lib/data.tsx';

interface AudioPlayerContextType {
  currentlyPlaying: PortfolioItem | null;
  isPlaying: boolean;
  playAudio: (item: PortfolioItem) => void;
  pauseAudio: () => void;
  getAudioElement: () => HTMLAudioElement | null;
  currentTime: number;
  duration: number;
}

export const AudioPlayerContext = createContext<AudioPlayerContextType>({
  currentlyPlaying: null,
  isPlaying: false,
  playAudio: () => {},
  pauseAudio: () => {},
  getAudioElement: () => null,
  currentTime: 0,
  duration: 0,
});

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<PortfolioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the Audio element only once on the client
  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
        
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onTimeUpdate = () => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        };
        const onLoadedMetadata = () => {
            if (audioRef.current) setDuration(audioRef.current.duration);
        };
        const onEnded = () => {
            setIsPlaying(false);
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
            }
        };

        audioRef.current.addEventListener('play', onPlay);
        audioRef.current.addEventListener('pause', onPause);
        audioRef.current.addEventListener('timeupdate', onTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        audioRef.current.addEventListener('ended', onEnded);
        
        // Cleanup function to remove listeners when provider unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('play', onPlay);
                audioRef.current.removeEventListener('pause', onPause);
                audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
                audioRef.current.removeEventListener('ended', onEnded);
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }
  }, []);

  const playAudio = useCallback((item: PortfolioItem) => {
    if (!item.url || !audioRef.current) return;
    
    const audio = audioRef.current;

    if (currentlyPlaying?.id === item.id) {
      // If it's the same track, just play it
      audio.play().catch(e => console.error("Audio play failed:", e));
    } else {
      // If it's a new track, change the source and play
      setCurrentlyPlaying(item);
      audio.src = item.url;
      audio.load(); // Important: load the new source
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentlyPlaying]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const getAudioElement = useCallback(() => audioRef.current, []);

  const value = {
    currentlyPlaying,
    isPlaying,
    playAudio,
    pauseAudio,
    getAudioElement,
    currentTime,
    duration,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
