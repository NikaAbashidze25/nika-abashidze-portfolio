"use client";

import { Card, CardContent } from '@/components/ui/card';
import { portfolioItems, type PortfolioItem } from '@/lib/data';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import VideoModal from '@/components/VideoModal';
import AudioModal from '@/components/AudioModal';

const CompositionCard = ({ item, onCardClick }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleAudioPlay = (e: Event) => {
      if (activeAudio && activeAudio !== e.target) {
        activeAudio.pause();
      }
      setActiveAudio(e.target as HTMLAudioElement);
    };
  
    document.addEventListener('play', handleAudioPlay, true);
  
    return () => {
      document.removeEventListener('play', handleAudioPlay, true);
    };
  }, [activeAudio]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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
  };

  return (
    <Card 
      onClick={() => onCardClick(item)}
      className="overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up cursor-pointer"
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
           <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <button
                  onClick={togglePlay}
                  className="p-2 bg-primary text-primary-foreground rounded-full z-10"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
             </div>
          </div>
        </div>
        <audio 
          ref={audioRef} 
          src={item.url} 
          onEnded={handleAudioEnd} 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="hidden"
          preload="metadata"
        />
      </CardContent>
    </Card>
  );
}

const VideoCard = ({ item, onCardClick }: { item: PortfolioItem, onCardClick: (item: PortfolioItem) => void }) => {
  return (
    <Card 
      onClick={() => onCardClick(item)}
      className="overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up cursor-pointer"
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

const PortfolioGrid = ({ items, onCardClick, type }: { items: PortfolioItem[], onCardClick: (item: PortfolioItem) => void, type: 'audio' | 'video' }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    {items.map((item) => (
      type === 'audio' ? <CompositionCard key={item.id} item={item} onCardClick={onCardClick} /> : <VideoCard key={item.id} item={item} onCardClick={onCardClick} />
    ))}
  </div>
);

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<PortfolioItem | null>(null);

  const compositions = portfolioItems.filter(i => i.type === 'audio');
  const guitars = portfolioItems.filter(i => i.category === 'Guitar');
  const linearAudios = portfolioItems.filter(i => i.category === 'Linear Audio');

  const openVideoModal = (item: PortfolioItem) => {
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


  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my projects, showcasing my skills in composition, performance, and sound design.
            </p>
          </div>
        </div>

        <div className="space-y-16 mt-12 animate-fade-in-up [animation-delay:0.2s]">
            <div>
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Compositions</h3>
               <PortfolioGrid items={compositions} onCardClick={openAudioModal} type="audio" />
            </div>

            <div>
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Performance</h3>
               <PortfolioGrid items={guitars} onCardClick={openVideoModal} type="video" />
            </div>
            
            <div>
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Sound Design</h3>
               <PortfolioGrid items={linearAudios} onCardClick={openVideoModal} type="video" />
            </div>
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
        <AudioModal
          isOpen={!!selectedAudio}
          onClose={closeAudioModal}
          item={selectedAudio}
        />
      )}
    </section>
  );
}
