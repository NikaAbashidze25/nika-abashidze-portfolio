
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioItem } from "@/lib/data.tsx";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { convertToEmbedUrl, resolveImageUrl } from "@/lib/utils";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem;
}

export default function VideoModal({ isOpen, onClose, item }: VideoModalProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowVideo(false);
    }
  }, [isOpen]);
  
  if (!isOpen || !item) return null;
  
  const embedUrl = convertToEmbedUrl(item.url);
  const isYoutube = embedUrl && embedUrl.includes('youtube.com/embed');
  const videoUrlWithAutoplay = isYoutube ? `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1` : item.url;
  const poster = item.thumbnailUrl;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row p-0 gap-0">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="w-full md:w-1/2 h-64 md:h-auto bg-black flex items-center justify-center relative flex-shrink-0">
             {showVideo ? (
                isYoutube ? (
                  <iframe
                      src={videoUrlWithAutoplay}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full aspect-video"
                      title={item.title}
                  ></iframe>
                ) : (
                  <video controls autoPlay className="w-full h-full object-contain" poster={resolveImageUrl(poster)}>
                      <source src={embedUrl || item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                )
             ) : (
                <div className="w-full h-full relative group cursor-pointer" onClick={() => setShowVideo(true)}>
                    <Image
                        src={resolveImageUrl(poster)}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                        <Play className="h-12 w-12 text-white/80 group-hover:text-white transition-colors sm:h-16 sm:w-16" />
                    </div>
                </div>
             )}
          </div>
          <div className="w-full md:w-1/2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6 overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h2>
              {item.externalLink && (
                  <a href={item.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4">
                      {item.externalLink.label} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
              )}

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
      </DialogContent>
    </Dialog>
  );
}
