
"use client";

import { createContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { PortfolioItem } from '@/lib/data';

interface AudioPlayerContextType {
  currentlyPlaying: PortfolioItem | null;
  setCurrentlyPlaying: (item: PortfolioItem | null) => void;
  isPlaying: boolean;
  playAudio: (item: PortfolioItem) => void;
  pauseAudio: () => void;
  getAudioElement: () => HTMLAudioElement | null;
  currentTime: number;
  duration: number;
}

export const AudioPlayerContext = createContext<AudioPlayerContextType>({
  currentlyPlaying: null,
  setCurrentlyPlaying: () => {},
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

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);
  
  const handleAudioEnd = useCallback(() => {
    setIsPlaying(false);
    if(audioRef.current) {
        audioRef.current.currentTime = 0;
    }
  }, []);

  const setAudioListeners = useCallback((audio: HTMLAudioElement) => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnd);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
  }, [handleTimeUpdate, handleLoadedMetadata, handleAudioEnd]);

  const removeAudioListeners = useCallback((audio: HTMLAudioElement) => {
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.removeEventListener('ended', handleAudioEnd);
    audio.removeEventListener('play', () => setIsPlaying(true));
    audio.removeEventListener('pause', () => setIsPlaying(false));
  }, [handleTimeUpdate, handleLoadedMetadata, handleAudioEnd]);

  const playAudio = useCallback((item: PortfolioItem) => {
    if (!item.url) return;

    if (currentlyPlaying?.id === item.id && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        removeAudioListeners(audioRef.current);
      }
      
      const newAudio = new Audio(item.url);
      audioRef.current = newAudio;
      setAudioElement(newAudio);
      setCurrentlyPlaying(item);
      newAudio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentlyPlaying, removeAudioListeners]);

  const setAudioElement = useCallback((newAudio: HTMLAudioElement) => {
    if (audioRef.current && audioRef.current !== newAudio) {
      audioRef.current.pause();
      removeAudioListeners(audioRef.current);
      audioRef.current.src = ""; // Detach the source
      audioRef.current.load();
    }
    
    audioRef.current = newAudio;
    setAudioListeners(newAudio);
    setCurrentTime(0);
    setDuration(0);
  }, [removeAudioListeners, setAudioListeners]);


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
              removeAudioListeners(currentAudio);
          }
      }
  }, [removeAudioListeners]);


  const value = {
    currentlyPlaying,
    setCurrentlyPlaying,
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
