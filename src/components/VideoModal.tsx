"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioItem } from "@/lib/data";
import { X, ExternalLink } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem;
}

export default function VideoModal({ isOpen, onClose, item }: VideoModalProps) {
  if (!isOpen || !item) return null;
  const isYoutube = item.url.includes('youtube.com');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col md:flex-row p-0 gap-0">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black flex items-center justify-center">
             {isYoutube ? (
                <iframe
                    src={item.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    title={item.title}
                ></iframe>
                ) : (
                <video controls className="w-full h-full object-cover" poster={item.thumbnailUrl}>
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
          </div>
          <div className="w-full md:w-1/3 h-1/2 md:h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              {item.externalLink && (
                  <a href={item.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4">
                      {item.externalLink.label} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
              )}

              {item.longDescription && <p className="text-base text-foreground mb-6">{item.longDescription}</p>}

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
