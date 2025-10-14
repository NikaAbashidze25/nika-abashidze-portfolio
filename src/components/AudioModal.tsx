"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioItem } from "@/lib/data";
import Image from "next/image";
import { X, Play, Pause, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem;
}

export default function AudioModal({ isOpen, onClose, item }: AudioModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if(audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  const handleLoadedMetadata = () => {
    if(audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const timeline = e.currentTarget.getBoundingClientRect();
      const newTime = (e.clientX - timeline.left) / timeline.width * duration;
      if(isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
      }
    }
  };


  if (!isOpen || !item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col md:flex-row p-0 gap-0">
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black flex items-center justify-center relative">
            <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/3 h-1/2 md:h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              {item.externalLink && (
                  <a href={item.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4">
                      {item.externalLink.label} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
              )}

            <div className="my-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={togglePlay}
                        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors z-10"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <div className="w-full bg-muted h-2 rounded-full ml-4 cursor-pointer" onClick={handleSeek}>
                        <div 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>
                </div>
            </div>

              {item.longDescription && <p className="text-base text-foreground mb-6">{item.longDescription}</p>}

              {item.roleDescription && (
                  <div>
                      <h3 className="text-lg font-semibold mb-2">My role on it</h3>
                      <p className="text-base text-muted-foreground">{item.roleDescription}</p>
                  </div>
              )}
          </div>
          <audio 
            ref={audioRef} 
            src={item.url} 
            onEnded={handleAudioEnd} 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            preload="metadata" 
          />
      </DialogContent>
    </Dialog>
  );
}
