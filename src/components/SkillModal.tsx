
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Skill } from "@/components/sections/About";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/utils";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
}

const getImageForSkill = (skillId: string) => {
    return PlaceHolderImages.find((img) => img.id === skillId);
}

export default function SkillModal({ isOpen, onClose, skill }: SkillModalProps) {
  if (!isOpen || !skill) return null;

  const image = getImageForSkill(skill.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-full h-full sm:w-[calc(100%-4rem)] sm:h-[calc(100%-4rem)] flex flex-col sm:flex-row p-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <DialogTitle className="sr-only">{skill.title}</DialogTitle>
          <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-black flex items-center justify-center relative flex-shrink-0">
            {image && (
                <Image
                    src={resolveImageUrl(image.imageUrl)}
                    alt={image.description}
                    fill
                    className="object-cover"
                />
            )}
          </div>
          <div className="w-full sm:w-1/2 h-1/2 sm:h-full p-6 overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{skill.title}</h2>
              <p className="text-sm sm:text-base text-foreground">{skill.longDescription}</p>
          </div>
      </DialogContent>
    </Dialog>
  );
}
