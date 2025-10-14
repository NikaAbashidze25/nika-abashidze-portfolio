"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioItems, type PortfolioItem } from '@/lib/data';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';
import VideoModal from '@/components/VideoModal';

const categories = ['All', 'Compositions', 'Performance', 'Sound Design'];

const CompositionCard = ({ item }: { item: PortfolioItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <Card className="overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up">
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
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors z-10"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
             </div>
             <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 cursor-pointer" onClick={handleSeek}>
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
          </div>
        </div>
      </CardContent>
      <audio 
        ref={audioRef} 
        src={item.url} 
        onEnded={handleAudioEnd} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata" 
      />
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
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end p-4">
             <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PortfolioGrid = ({ items, onCardClick }: { items: PortfolioItem[], onCardClick: (item: PortfolioItem) => void }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    {items.map((item) => (
       <VideoCard key={item.id} item={item} onCardClick={onCardClick} />
    ))}
  </div>
);

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  const compositions = portfolioItems.filter(i => i.category === 'Composition');
  const guitars = portfolioItems.filter(i => i.category === 'Guitar');
  const linearAudios = portfolioItems.filter(i => i.category === 'Linear Audio');

  const openModal = (item: PortfolioItem) => {
    setSelectedVideo(item);
  };

  const closeModal = () => {
    setSelectedVideo(null);
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
        <Tabs defaultValue="All" className="mt-12 animate-fade-in-up [animation-delay:0.2s]">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mx-auto max-w-lg">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="All">
            <div className="space-y-16">
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Compositions</h3>
               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                  {compositions.map((item) => <CompositionCard key={item.id} item={item} />)}
               </div>

               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Performance</h3>
               <PortfolioGrid items={guitars} onCardClick={openModal} />
               
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Sound Design</h3>
               <PortfolioGrid items={linearAudios} onCardClick={openModal} />
            </div>
          </TabsContent>

          <TabsContent value="Compositions">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {compositions.map((item) => <CompositionCard key={item.id} item={item} />)}
            </div>
          </TabsContent>

          <TabsContent value="Performance">
            <PortfolioGrid items={guitars} onCardClick={openModal} />
          </TabsContent>

          <TabsContent value="Sound Design">
            <PortfolioGrid items={linearAudios} onCardClick={openModal} />
          </TabsContent>
        </Tabs>
      </div>
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeModal}
          item={selectedVideo}
        />
      )}
    </section>
  );
}