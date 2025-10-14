"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioItems, type PortfolioItem } from '@/lib/data';
import Image from 'next/image';

const categories = ['All', 'Composition', 'Guitar', 'Linear Audio'];

const PortfolioGrid = ({ items }: { items: typeof portfolioItems }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    {items.map((item, index) => (
      <Card key={item.id} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
        <CardContent className="p-0">
          <div className="aspect-video w-full overflow-hidden">
            {item.type === 'video' ? (
              <video controls className="w-full h-full object-cover" poster={item.thumbnailUrl}>
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                  <audio controls className="w-full">
                    <source src={item.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
);

export default function Portfolio() {
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
            <PortfolioGrid items={portfolioItems} />
          </TabsContent>
          <TabsContent value="Composition">
            <PortfolioGrid items={portfolioItems.filter(i => i.category === 'Composition')} />
          </TabsContent>
          <TabsContent value="Guitar">
            <PortfolioGrid items={portfolioItems.filter(i => i.category === 'Guitar')} />
          </TabsContent>
          <TabsContent value="Linear Audio">
            <PortfolioGrid items={portfolioItems.filter(i => i.category === 'Linear Audio')} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
