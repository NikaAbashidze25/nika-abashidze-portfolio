"use client";

import { Card, CardContent } from '@/components/ui/card';
import { portfolioItems, type PortfolioItem } from '@/lib/data';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useContext, useEffect, useRef } from 'react';
import VideoModal from '@/components/VideoModal';
import AudioModalV2 from '@/components/AudioModalV2';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AudioPlayerContext, AudioPlayerProvider } from '@/context/AudioPlayerContext';

const CompositionCard = ({ item, onCardClick, isVisible }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void, isVisible: boolean }) => {
  const { currentlyPlaying, isPlaying, playAudio, pauseAudio, setCurrentlyPlaying, getAudioElement, setAudioElement } = useContext(AudioPlayerContext);

  const isCurrentTrack = currentlyPlaying?.id === item.id;
  const isThisTrackPlaying = isCurrentTrack && isPlaying;

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisTrackPlaying) {
      pauseAudio();
    } else {
      if (!isCurrentTrack && item.url) {
        const audio = getAudioElement();
        if(audio) audio.pause();
        
        const newAudio = new Audio(item.url);
        setAudioElement(newAudio);
        setCurrentlyPlaying(item);
        playAudio(newAudio);
      } else {
         const audio = getAudioElement();
         if(audio) playAudio(audio);
      }
    }
  };

  return (
    <Card 
      onClick={() => onCardClick(item)}
      className={cn(
        "overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent cursor-pointer",
        isThisTrackPlaying ? "border-primary shadow-2xl shadow-primary/20" : "hover:border-primary hover:shadow-2xl hover:shadow-primary/20",
        isVisible ? "animate-fade-in-up" : "opacity-0"
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
           <div className="absolute inset-x-0 bottom-0 p-4">
             <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">{item.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-end gap-1 h-4 w-16">
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-1.2s] [animation-duration:0.8s]" : "h-1")}></span>
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-1s]" : "h-1")}></span>
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.8s] [animation-duration:0.9s]" : "h-1")}></span>
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.6s] [animation-duration:0.7s]" : "h-1")}></span>
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.4s] [animation-duration:0.8s]" : "h-1")}></span>
                         <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0.2s] [animation-duration:0.6s]" : "h-1")}></span>
                        <span className={cn("w-1 bg-primary/70 transition-all", isThisTrackPlaying ? "animate-[wave] [animation-delay:-0s] [animation-duration:0.9s]" : "h-1")}></span>
                    </div>
                    {item.url && (
                        <button
                            onClick={togglePlay}
                            className="p-2 bg-primary text-primary-foreground rounded-full z-10 flex-shrink-0"
                            aria-label={isThisTrackPlaying ? "Pause" : "Play"}
                            >
                            {isThisTrackPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                    )}
                </div>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const VideoCard = ({ item, onCardClick, isVisible }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void, isVisible: boolean }) => {
  return (
    <Card 
      onClick={() => onCardClick(item)}
      className={cn(
        "overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 cursor-pointer",
        isVisible ? "animate-fade-in-up" : "opacity-0"
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
             <Play className="h-12 w-12 text-white" />
          </div>
          <div className="absolute inset-0 flex items-end p-4">
             <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PortfolioGrid = ({ items, onCardClick, type, hasAnimated }: { items: PortfolioItem[], onCardClick: (item: PortfolioItem) => void, type: 'audio' | 'video', hasAnimated: boolean }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set(prev).add(entry.target.getAttribute('data-id')));
          observer.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      {items.map((item, index) => {
        const isVisible = hasAnimated || visibleItems.has(String(item.id));
        return (
          <div 
            key={item.id} 
            ref={el => {
                if (el && !hasAnimated && !visibleItems.has(String(item.id))) {
                    observer.current?.observe(el);
                }
            }}
            data-id={item.id}
            style={{ animationDelay: `${index * 100}ms` }} 
            className="fill-mode-forwards"
          >
            {type === 'audio' ? <CompositionCard item={item} onCardClick={onCardClick} isVisible={isVisible} /> : <VideoCard item={item} onCardClick={onCardClick} isVisible={isVisible} />}
          </div>
        )
      })}
    </div>
  );
};

type FilterType = 'All' | 'Compositions' | 'Performance' | 'Sound Design';

const PortfolioInner = () => {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  const { pauseAudio, getAudioElement } = useContext(AudioPlayerContext);

  const compositions = portfolioItems.filter(i => i.type === 'audio');
  const guitars = portfolioItems.filter(i => i.category === 'Guitar');
  const linearAudios = portfolioItems.filter(i => i.category === 'Linear Audio');
  
  const filters: FilterType[] = ['All', 'Compositions', 'Performance', 'Sound Design'];

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

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section id="portfolio" ref={sectionRef} className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className={cn("space-y-2", hasAnimated && "animate-fade-in-up")}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my projects, showcasing my skills in composition, performance, and sound design.
            </p>
          </div>
        </div>

        <div className={cn("flex justify-center space-x-2 md:space-x-4 mt-8", hasAnimated && "animate-fade-in-up [animation-delay:0.1s]")}>
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

        <div className="space-y-16 mt-12">
            {(activeFilter === 'All' || activeFilter === 'Compositions') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Compositions</h3>
                 <PortfolioGrid items={compositions} onCardClick={openAudioModal} type="audio" hasAnimated={hasAnimated} />
              </div>
            )}

            {(activeFilter === 'All' || activeFilter === 'Performance') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Performance</h3>
                 <PortfolioGrid items={guitars} onCardClick={openVideoModal} type="video" hasAnimated={hasAnimated} />
              </div>
            )}
            
            {(activeFilter === 'All' || activeFilter === 'Sound Design') && (
              <div>
                 <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Sound Design</h3>
                 <PortfolioGrid items={linearAudios} onCardClick={openVideoModal} type="video" hasAnimated={hasAnimated} />
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
        <AudioPlayerProvider>
            <PortfolioInner />
        </AudioPlayerProvider>
    )
}
