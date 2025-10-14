"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioItems, type PortfolioItem } from '@/lib/data';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

const categories = ['All', 'Composition', 'Guitar', 'Linear Audio'];

const CompositionCard = ({ item }: { item: PortfolioItem }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
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
    <Card className="overflow-hidden transition-all duration-300 group bg-card border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full overflow-hidden">
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
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex-grow">
          <CardTitle className="text-base">{item.title}</CardTitle>
          <CardDescription className="text-xs mt-1 line-clamp-2">{item.description}</CardDescription>
        </div>
        <button
          onClick={togglePlay}
          className="ml-4 flex-shrink-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <audio ref={audioRef} src={item.url} onEnded={handleAudioEnd} preload="metadata" />
      </CardHeader>
    </Card>
  );
}


const VideoCard = ({ item }: { item: PortfolioItem }) => {
  const isYoutube = item.url.includes('youtube.com');
  
  return (
      <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card animate-fade-in-up">
        <CardContent className="p-0">
          <div className="aspect-video w-full overflow-hidden">
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
                <source src={item.url} type={item.url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
  )
};

const PortfolioGrid = ({ items, type }: { items: PortfolioItem[], type: 'audio' | 'video' }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    {items.map((item, index) => (
       type === 'audio' ? <CompositionCard key={item.id} item={item} /> : <VideoCard key={item.id} item={item} />
    ))}
  </div>
);

export default function Portfolio() {
  const compositions = portfolioItems.filter(i => i.category === 'Composition');
  const guitars = portfolioItems.filter(i => i.category === 'Guitar');
  const linearAudios = portfolioItems.filter(i => i.category === 'Linear Audio');

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
               <PortfolioGrid items={compositions} type="audio" />
               <h3 className="text-2xl font-bold tracking-tighter text-center mt-8 border-b pb-4">Performance & Sound Design</h3>
               <PortfolioGrid items={[...guitars, ...linearAudios]} type="video" />
            </div>
          </TabsContent>

          <TabsContent value="Composition">
            <PortfolioGrid items={compositions} type="audio" />
          </TabsContent>

          <TabsContent value="Guitar">
            <PortfolioGrid items={guitars} type="video" />
          </TabsContent>

          <TabsContent value="Linear Audio">
            <PortfolioGrid items={linearAudios} type="video" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}