import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section id="home" className="relative h-[calc(100vh-3.5rem)] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Hello, I’m Nika Abashidze
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-neutral-300 sm:text-xl md:text-2xl">
          Composer | Guitarist | Sound Designer for Animations & Media
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="#portfolio">
            View My Work <ArrowDown className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
