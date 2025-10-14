'use client';

import type { PortfolioItem } from '@/lib/data';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function CompositionPlayer({ item }: { item: PortfolioItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const setAudioDuration = () => {
      if(audio.duration && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    }

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('durationchange', setAudioDuration);
    audio.addEventListener('ended', onEnded);


    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('durationchange', setAudioDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const timeline = e.currentTarget.getBoundingClientRect();
      const newTime = (e.clientX - timeline.left) / timeline.width * duration;
      if(isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl animate-fade-in-up">
      {item.backgroundUrl && (
        <Image
          src={item.backgroundUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
        <div className="flex-grow">
          <h3 className="text-3xl font-bold">{item.title}</h3>
          <p className="max-w-prose mt-2 text-neutral-300">{item.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <audio ref={audioRef} src={item.url} preload="metadata" />
          <button
            onClick={togglePlay}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm font-mono w-12">{formatTime(progress)}</span>
            <div 
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-accent rounded-full"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono w-12">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
