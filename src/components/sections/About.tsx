import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Skill = {
  id: string;
  title: string;
  description: string;
};

const skills: Skill[] = [
  {
    id: 'compositions-image',
    title: 'Musical Compositions',
    description: 'Crafting original scores for film, games, and media that tell a story and evoke emotion.',
  },
  {
    id: 'guitar-image',
    title: 'Guitar Performances',
    description: 'Versatile session guitarist specializing in a range of styles from delicate acoustic to powerful rock.',
  },
  {
    id: 'animations-audio-image',
    title: 'Audio for Animations & Videos',
    description: 'Enhancing visual narratives with perfectly synchronized sound design and music.',
  },
  {
    id: 'sound-design-image',
    title: 'Sound Design & Mixing',
    description: 'Building immersive worlds with custom sound effects, foley, and professional post-production.',
  },
  {
    id: 'acapella-image',
    title: 'University Acapella',
    description: 'Arranging and performing complex vocal pieces as a member of a premier university ensemble.',
  },
];

const getImageForSkill = (skillId: string) => {
  return PlaceHolderImages.find((img) => img.id === skillId);
}

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-center">
            <div className="space-y-4 lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I am a passionate composer, guitarist, and sound designer with a love for telling stories through audio. My work focuses on creating immersive soundscapes that elevate animations, multimedia projects, and musical pieces to new emotional heights. I also had the pleasure of being part of my university's acapella group.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.slice(0, 3).map((skill) => {
                      const image = getImageForSkill(skill.id);
                      return (
                          <div key={skill.title} className="flex flex-col items-start space-y-2">
                              {image && <Image src={image.imageUrl} alt={image.description} width={400} height={400} className="rounded-lg object-cover aspect-square" data-ai-hint={image.imageHint} />}
                              <h3 className="text-lg font-bold pt-2">{skill.title}</h3>
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                      )
                  })}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {skills.slice(3).map((skill) => {
                      const image = getImageForSkill(skill.id);
                      return (
                          <div key={skill.title} className="flex flex-col items-start space-y-2">
                              {image && <Image src={image.imageUrl} alt={image.description} width={400} height={400} className="rounded-lg object-cover aspect-square" data-ai-hint={image.imageHint} />}
                              <h3 className="text-lg font-bold pt-2">{skill.title}</h3>
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                      )
                  })}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
