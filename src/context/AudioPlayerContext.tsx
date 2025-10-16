
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

  const setAudioElement = useCallback((newAudio: HTMLAudioElement | null) => {
    if (audioRef.current) {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.removeEventListener('ended', handleAudioEnd);
      audioRef.current.removeEventListener('play', onPlay);
      audioRef.current.removeEventListener('pause', onPause);
      if (!newAudio || newAudio !== audioRef.current) {
        audioRef.current.pause();
      }
    }

    audioRef.current = newAudio;

    if (newAudio) {
      newAudio.addEventListener('timeupdate', handleTimeUpdate);
      newAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      newAudio.addEventListener('ended', handleAudioEnd);
      newAudio.addEventListener('play', onPlay);
      newAudio.addEventListener('pause', onPause);
      setDuration(newAudio.duration || 0);
      setCurrentTime(newAudio.currentTime || 0);
    } else {
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    }
  }, []);

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleAudioEnd = () => {
    setIsPlaying(false);
    if(audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
    }
  };

  const playAudio = useCallback((item: PortfolioItem) => {
    if (!item.url) return;

    if (currentlyPlaying?.id === item.id && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const newAudio = new Audio(item.url);
      setAudioElement(newAudio);
      setCurrentlyPlaying(item);
      newAudio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentlyPlaying, setAudioElement]);


  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const getAudioElement = useCallback(() => audioRef.current, []);

  useEffect(() => {
      const currentAudio = audioRef.current;
      return () => {
          if (currentAudio) {
            currentAudio.pause();
            setAudioElement(null);
          }
      }
  }, [setAudioElement]);


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
