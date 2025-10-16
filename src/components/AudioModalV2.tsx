
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioItem } from "@/lib/data.tsx";
import Image from "next/image";
import { Play, Pause, ExternalLink } from "lucide-react";
import { useContext, useEffect } from "react";
import { AudioPlayerContext } from "@/context/AudioPlayerContext";
import { resolveImageUrl } from "@/lib/utils";

interface AudioModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function AudioModalV2({ isOpen, onClose, item }: AudioModalV2Props) {
  const { 
    currentlyPlaying,
    isPlaying, 
    playAudio, 
    pauseAudio, 
    getAudioElement,
    currentTime,
    duration
  } = useContext(AudioPlayerContext);

  const isCurrentTrack = currentlyPlaying?.id === item?.id;

  useEffect(() => {
    const audio = getAudioElement();
    if (isOpen && item && (!isCurrentTrack || !audio)) {
        playAudio(item);
    }
  }, [isOpen, item, isCurrentTrack, playAudio, getAudioElement]);


  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const audio = getAudioElement();
    if (!audio) return;

    if (isPlaying) {
      pauseAudio();
    } else {
      if(currentlyPlaying) {
        playAudio(currentlyPlaying);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = getAudioElement();
    if (audio && duration > 0) {
      const timeline = e.currentTarget.getBoundingClientRect();
      const newTime = (e.clientX - timeline.left) / timeline.width * duration;
      if(isFinite(newTime)) {
        audio.currentTime = newTime;
      }
    }
  };

  if (!isOpen || !item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-auto max-h-[90vh] flex flex-col p-0 gap-0">
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="w-full aspect-video bg-black flex items-center justify-center relative flex-shrink-0">
            <Image
                src={resolveImageUrl(item.thumbnailUrl)}
                alt={item.title}
                fill
                className="object-cover"
            />
          </div>
          <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              {item.externalLink && (
                  <a href={item.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4">
                      {item.externalLink.label} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
              )}

            <div className="my-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors z-10 flex-shrink-0"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <div className="w-full flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
                        <div className="w-full bg-muted h-2 rounded-full cursor-pointer" onClick={handleSeek}>
                            <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

              {item.longDescription && <p className="text-base text-foreground mb-6">{item.longDescription}</p>}
              
              {item.descriptionImage && (
                <div className="relative aspect-[9/12] w-full overflow-hidden rounded-md my-6">
                    <Image
                        src={resolveImageUrl(item.descriptionImage)}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                </div>
              )}

              {item.roleDescription && (
                  <div>
                      <h3 className="text-lg font-semibold mb-2">My role on it</h3>
                      <p className="text-base text-muted-foreground">{item.roleDescription}</p>
                  </div>
              )}
          </div>
      </DialogContent>
    </Dialog>
  );
}
