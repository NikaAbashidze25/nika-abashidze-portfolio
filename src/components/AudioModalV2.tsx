
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
    if (isNaN(seconds) || seconds < 0) return '0:00';
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
    duration,
    setCurrentlyPlaying,
  } = useContext(AudioPlayerContext);

  const isCurrentTrack = currentlyPlaying?.id === item?.id;

  useEffect(() => {
    const audio = getAudioElement();
    if (isOpen && item && !isCurrentTrack) {
        setCurrentlyPlaying(item);
    }
  }, [isOpen, item, isCurrentTrack, setCurrentlyPlaying, getAudioElement]);


  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!item) return;

    if (isPlaying && isCurrentTrack) {
      pauseAudio();
    } else {
      playAudio(item);
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

  const isModalTrackPlaying = isPlaying && isCurrentTrack;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-full max-h-full p-0 flex flex-col sm:rounded-none">
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="w-full h-1/2 bg-black flex items-center justify-center relative flex-shrink-0">
            <Image
                src={resolveImageUrl(item.thumbnailUrl)}
                alt={item.title}
                fill
                className="object-cover"
            />
          </div>
          <div className="w-full h-1/2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6 flex flex-col overflow-y-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h2>
                {item.externalLink && (
                    <a href={item.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4">
                        {item.externalLink.label} <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                )}
              </div>

            <div className="my-4 sm:my-6">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={togglePlay}
                        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors z-10 flex-shrink-0"
                        aria-label={isModalTrackPlaying ? "Pause" : "Play"}
                        >
                        {isModalTrackPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </button>
                    <div className="w-full flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(isCurrentTrack ? currentTime : 0)}</span>
                        <div className="w-full bg-muted h-2 rounded-full cursor-pointer" onClick={handleSeek}>
                            <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${isCurrentTrack && duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(isCurrentTrack ? duration : 0)}</span>
                    </div>
                </div>
            </div>
            
            <div className="overflow-y-auto">
              {item.longDescription && <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-6">{item.longDescription}</p>}
              
              {item.descriptionImage && (
                <div className="relative aspect-[9/12] w-full overflow-hidden rounded-md my-4 sm:my-6">
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
                      <h3 className="text-base sm:text-lg font-semibold mb-2">My role on it</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.roleDescription}</p>
                  </div>
              )}
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
