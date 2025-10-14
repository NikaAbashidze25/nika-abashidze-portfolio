import { Music, Guitar, Film, Waves } from 'lucide-react';

const skills = [
    {
        icon: Music,
        title: "Musical Compositions",
        description: "Crafting original scores for film, games, and media that tell a story and evoke emotion."
    },
    {
        icon: Guitar,
        title: "Guitar Performances",
        description: "Versatile session guitarist specializing in a range of styles from delicate acoustic to powerful rock."
    },
    {
        icon: Film,
        title: "Audio for Animations & Videos",
        description: "Enhancing visual narratives with perfectly synchronized sound design and music."
    },
    {
        icon: Waves,
        title: "Sound Design & Mixing",
        description: "Building immersive worlds with custom sound effects, foley, and professional post-production."
    }
]

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I am a passionate composer, guitarist, and sound designer with a love for telling stories through audio. My work focuses on creating immersive soundscapes that elevate animations, multimedia projects, and musical pieces to new emotional heights.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                {skills.map((skill) => (
                    <div key={skill.title} className="flex flex-col items-start space-y-2 p-4 rounded-lg bg-secondary/50">
                        <skill.icon className="h-8 w-8 text-accent" />
                        <h3 className="text-lg font-bold">{skill.title}</h3>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
