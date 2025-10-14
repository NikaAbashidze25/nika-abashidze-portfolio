
"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import type { Skill } from "@/components/sections/About";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill;
}

const getImageForSkill = (skillId: string) => {
    return PlaceHolderImages.find((img) => img.id === skillId);
}

export default function SkillModal({ isOpen, onClose, skill }: SkillModalProps) {
  if (!isOpen || !skill) return null;

  const image = getImageForSkill(skill.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col md:flex-row p-0 gap-0">
          <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black flex items-center justify-center relative">
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                />
            )}
          </div>
          <div className="w-full md:w-1/3 h-1/2 md:h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2">{skill.title}</h2>
              <p className="text-base text-foreground mb-6">{skill.longDescription}</p>
          </div>
      </DialogContent>
    </Dialog>
  );
}
