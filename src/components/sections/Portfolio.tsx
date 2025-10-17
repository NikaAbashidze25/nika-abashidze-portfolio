
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { portfolioItems, type PortfolioItem } from '@/lib/data.tsx';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useContext, useEffect, useRef } from 'react';
import VideoModal from '@/components/VideoModal';
import AudioModalV2 from '@/components/AudioModalV2';
import { Button } from '@/components/ui/button';
import { cn, resolveImageUrl } from '@/lib/utils';
import { AudioPlayerContext } from '@/context/AudioPlayerContext';

const CompositionCard = ({ item, onCardClick }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void }) => {
  const { currentlyPlaying, isPlaying, playAudio, pauseAudio } = useContext(AudioPlayerContext);

  const isCurrentTrack = currentlyPlaying?.id === item.id;
  const isThisTrackPlaying = isCurrentTrack && isPlaying;

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisTrackPlaying) {
      pauseAudio();
    } else {
      playAudio(item);
    }
  };

  return (
    <Card 
      onClick={() => onCardClick(item)}
      className={cn(
        "overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent cursor-pointer flex flex-col h-full",
        isThisTrackPlaying ? "border-primary shadow-2xl shadow-primary/20" : "hover:border-primary hover:shadow-2xl hover:shadow-primary/20",
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={resolveImageUrl(item.thumbnailUrl)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4 bg-background flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-sm font-bold text-foreground md:text-base">{item.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 md:text-sm">{item.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {item.url && (
                <button
                    onClick={togglePlay}
                    className="p-2 bg-primary text-primary-foreground rounded-full z-10 flex-shrink-0 hover:bg-primary/80 transition-colors"
                    aria-label={isThisTrackPlaying ? "Pause" : "Play"}
                    >
                    {isThisTrackPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
            )}
            <div className="flex items-end gap-1 h-4 w-full">
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-1.2s] [animation-duration:1.5s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-1s] [animation-duration:1.2s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.8s] [animation-duration:1.4s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.6s] [animation-duration:1s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.4s] [animation-duration:1.3s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.2s] [animation-duration:1.1s]" : "h-1")}></span>
              <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0s] [animation-duration:1.5s]" : "h-1")}></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const VideoCard = ({ item, onCardClick }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void }) => {
  return (
    <Card 
      onClick={() => onCardClick(item)}
      className="overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={resolveImageUrl(item.thumbnailUrl)}
          alt={item.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <Play className="h-12 w-12 text-white" />
        </div>
      </div>
      <CardContent className="p-4 bg-background flex-grow">
          <h3 className="text-sm font-bold text-foreground md:text-base">{item.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 md:text-sm">{item.description}</p>
      </CardContent>
    </Card>
  );
};

const PortfolioGrid = ({ items, onCardClick, type }: { items: PortfolioItem[], onCardClick: (item: PortfolioItem) => void, type: 'audio' | 'video' }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:gap-6">
      {items.map((item) => (
        <div key={item.id}>
          {type === 'audio' ? <CompositionCard item={item} onCardClick={onCardClick} /> : <VideoCard item={item} onCardClick={onCardClick} />}
        </div>
      ))}
    </div>
  );
};

type FilterType = 'All' | 'Linear Audio' | 'Guitar Performance' | 'Music' | 'Game Audio';

const PortfolioInner = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  const { pauseAudio, getAudioElement } = useContext(AudioPlayerContext);

  const musicItems = portfolioItems.filter(i => i.category === 'Music');
  const performanceItems = portfolioItems.filter(i => i.category === 'Guitar Performance');
  const linearAudioItems = portfolioItems.filter(i => i.category === 'Linear Audio');
  const gameAudioItems = portfolioItems.filter(i => i.category === 'Game Audio');
  
  const filters: FilterType[] = ['All', 'Linear Audio', 'Guitar Performance', 'Music', 'Game Audio'];

  const openVideoModal = (item: PortfolioItem) => {
    const audio = getAudioElement();
    if(audio && !audio.paused) pauseAudio();
    setSelectedVideo(item);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };
  
  const openAudioModal = (item: PortfolioItem) => {
    setSelectedAudio(item);
  };

  const closeAudioModal = () => {
    setSelectedAudio(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my projects, showcasing my skills in composition, performance, and sound design.
            </p>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mt-8">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                  "transition-all duration-200",
                  activeFilter === filter && "bg-primary text-primary-foreground"
              )}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="space-y-12 md:space-y-16 mt-8 md:mt-12">
            {(activeFilter === 'All' || activeFilter === 'Linear Audio') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4 max-w-4xl mx-auto">Linear Audio</h3>
                 <PortfolioGrid items={linearAudioItems} onCardClick={openVideoModal} type="video" />
              </div>
            )}
            
            {(activeFilter === 'All' || activeFilter === 'Game Audio') && gameAudioItems.length > 0 && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4 max-w-4xl mx-auto">Game Audio</h3>
                 <PortfolioGrid items={gameAudioItems} onCardClick={openVideoModal} type="video" />
              </div>
            )}

            {(activeFilter === 'All' || activeFilter === 'Guitar Performance') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4 max-w-4xl mx-auto">Guitar Performance</h3>
                 <PortfolioGrid items={performanceItems} onCardClick={openVideoModal} type="video" />
              </div>
            )}

            {(activeFilter === 'All' || activeFilter === 'Music') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center border-b pb-4 max-w-4xl mx-auto">Music</h3>
                 <PortfolioGrid items={musicItems} onCardClick={openAudioModal} type="audio" />
              </div>
            )}
        </div>

      </div>

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideoModal}
          item={selectedVideo}
        />
      )}
      
      {selectedAudio && (
        <AudioModalV2
          isOpen={!!selectedAudio}
          onClose={closeAudioModal}
          item={selectedAudio}
        />
      )}
    </section>
  );
}


export default function Portfolio() {
    return (
        <PortfolioInner />
    )
}
