
"use client";

import { createContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { PortfolioItem } from '@/lib/data';

interface AudioPlayerContextType {
  currentlyPlaying: PortfolioItem | null;
  setCurrentlyPlaying: (item: PortfolioItem | null) => void;
  isPlaying: boolean;
  playAudio: (audio: HTMLAudioElement) => void;
  pauseAudio: () => void;
  getAudioElement: () => HTMLAudioElement | null;
  setAudioElement: (audio: HTMLAudioElement) => void;
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
  setAudioElement: () => {},
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

  const setAudioElement = useCallback((newAudio: HTMLAudioElement | null) => {
    if (audioRef.current) {
        audioRef.current.pause();
        removeAudioListeners(audioRef.current);
        audioRef.current.src = ""; // Detach the source
        audioRef.current.load();
    }

    if (newAudio) {
      audioRef.current = newAudio;
      setAudioListeners(newAudio);
      setCurrentTime(0);
      setDuration(0);
    } else {
      audioRef.current = null;
    }
  }, [setAudioListeners, removeAudioListeners]);


  const playAudio = useCallback((audio: HTMLAudioElement) => {
    audio.play().catch(e => console.error("Audio play failed:", e));
  }, []);

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
    setAudioElement,
    currentTime,
    duration,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
