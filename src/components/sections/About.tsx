import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Download, Music, Music2, Film, Layers } from 'lucide-react';

const skills = [
  { icon: Music, text: 'Musical Compositions' },
  { icon: Music2, text: 'Guitar Performances' },
  { icon: Film, text: 'Audio for Animations & Videos' },
  { icon: Layers, text: 'Sound Design & Mixing' },
];

export default function About() {
  const portraitImage = PlaceHolderImages.find((img) => img.id === 'portrait-nika');

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex items-center justify-center lg:order-last">
            {portraitImage && (
              <Card className="overflow-hidden rounded-xl shadow-2xl w-full max-w-sm">
                <CardContent className="p-0">
                  <Image
                    src={portraitImage.imageUrl}
                    alt={portraitImage.description}
                    width={600}
                    height={600}
                    className="object-cover aspect-square"
                    data-ai-hint={portraitImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What I Do</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I am a passionate composer, guitarist, and sound designer with a love for telling stories through audio. My work focuses on creating immersive soundscapes that elevate animations, multimedia projects, and musical pieces to new emotional heights.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-accent/20 p-2 rounded-full">
                    <skill.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium">{skill.text}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
