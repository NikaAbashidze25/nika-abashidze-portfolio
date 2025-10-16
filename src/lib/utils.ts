import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Standard YouTube watch URL
  let watchRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  let watchMatch = url.match(watchRegex);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // YouTube Shorts URL
  let shortRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
  let shortMatch = url.match(shortRegex);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // YouTube youtu.be shortened URL
  let youtuBeRegex = /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/;
  let youtuBeMatch = url.match(youtuBeRegex);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }

  // Already an embed URL
  let embedRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
  if (embedRegex.test(url)) {
    return url;
  }
  
  // Return the original URL if it's not a recognizable YouTube URL
  // This allows the component to fallback to a regular <video> tag
  return url;
}

export function resolveImageUrl(url: string | undefined | null): string {
    if (!url) return '';
    // If it's a full URL or an absolute path, return it as is.
    if (url.startsWith('http') || url.startsWith('/')) {
        return url;
    }
    // Otherwise, assume it's a local image in the public/images directory.
    return `/images/${url}`;
}
