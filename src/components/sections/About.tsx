
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';
import SkillModal from '@/components/SkillModal';

export type Skill = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
};

const skills: Skill[] = [
  {
    id: 'compositions-image',
    title: 'Producing Music',
    description: 'Crafting original scores for film, games, and media that tell a story and evoke emotion.',
    longDescription: 'From sweeping orchestral arrangements to subtle electronic textures, my compositions are built to serve the narrative. I specialize in creating memorable themes and adaptive scores that respond to on-screen action, enhancing the emotional impact of any project.'
  },
  {
    id: 'guitar-image',
    title: 'Classical Guitar',
    description: 'More than 11 years of Experience playing the Classical Guitar (2012 - Present) ',
    longDescription: 'As a session guitarist, I offer a wide palette of tones and techniques. Whether a project needs intricate fingerstyle melodies, soulful electric solos, or heavy rock riffs, I bring a deep understanding of harmony and a commitment to finding the perfect part.'
  },
  {
    id: 'animations-audio-image',
    title: 'Audio Design for Animations & Games',
    description: 'Enhancing visual narratives with perfectly synchronized sound design and music.',
    longDescription: 'I bring animations and videos to life by creating a complete audio experience. This includes custom sound design, foley, and musical scoring that is perfectly timed to the visuals, adding a layer of professionalism and immersion.'
  },
  {
    id: 'sound-design-image',
    title: 'Sound Design & Mixing',
    description: 'Building immersive worlds with custom sound effects, foley, and professional post-production.',
    longDescription: 'I build sonic worlds from the ground up. My process involves recording and designing custom sound effects, performing foley, and meticulously mixing all audio elements to create a balanced and immersive soundscape that captivates the audience.'
  },
  {
    id: 'acapella-image',
    title: 'KIU Capella',
    description: '2025 - a member of my university\'s (KIU) capella choir - over the last year',
    longDescription: 'My time in my university\'s (KIU) capella group this year (2025) definitely improved my skills in vocal arrangement. I developed relative pitch and improved my perception of harmony, which I will always try to carry into my work. For now I am more concentrated on Sound Design and capella became an amazing helper for it. I am so grateful for my fellow capella members for their support (P.S Special Thanks to Zura for the opportunity!).'
  },
];

const getImageForSkill = (skillId: string) => {
  return PlaceHolderImages.find((img) => img.id === skillId);
}

export default function About() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const openSkillModal = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const closeSkillModal = () => {
    setSelectedSkill(null);
  };

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-center">
            <div className="space-y-4 lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in-up [animation-delay:0.2s]">About Me</h2>
              <div className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in-up [animation-delay:0.3s] space-y-4 mx-auto">
                  <p>
                      Hello! I'm a 19-year-old sound enthusiast exploring Audio Post-production, with a strong foundation in Classical Guitar and Music.
                  </p>
                  <p>
                      I am motivated to grow professionally in this field, learn new tools, and collaborate with other passionate people on future projects.
                  </p>
                  <p>
                      Here is my musical journey over the past years (2025)...
                  </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.slice(0, 3).map((skill, index) => {
                      const image = getImageForSkill(skill.id);
                      return (
                          <div 
                              key={skill.title} 
                              className="group animate-fade-in-up cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20" 
                              style={{animationDelay: `${0.4 + index * 0.1}s`}} 
                              onClick={() => openSkillModal(skill)}
                          >
                            <div className="relative aspect-square w-full overflow-hidden bg-black/10">
                              {image && <Image src={image.imageUrl} alt={image.description} fill className="object-contain transition-transform duration-500 group-hover:scale-105" data-ai-hint={image.imageHint} />}
                            </div>
                            <div className="p-4 bg-background">
                              <h3 className="text-lg font-bold">{skill.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                            </div>
                          </div>
                      )
                  })}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {skills.slice(3).map((skill, index) => {
                      const image = getImageForSkill(skill.id);
                      return (
                          <div 
                              key={skill.title} 
                              className="group animate-fade-in-up cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20" 
                              style={{animationDelay: `${0.7 + index * 0.1}s`}} 
                              onClick={() => openSkillModal(skill)}
                          >
                            <div className="relative aspect-square w-full overflow-hidden bg-black/10">
                              {image && <Image src={image.imageUrl} alt={image.description} fill className="object-contain transition-transform duration-500 group-hover:scale-105" data-ai-hint={image.imageHint} />}
                            </div>
                            <div className="p-4 bg-background">
                              <h3 className="text-lg font-bold">{skill.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                            </div>
                          </div>
                      )
                  })}
              </div>
            </div>
        </div>
      </div>
       {selectedSkill && (
        <SkillModal
          isOpen={!!selectedSkill}
          onClose={closeSkillModal}
          skill={selectedSkill}
        />
      )}
    </section>
  );
}
