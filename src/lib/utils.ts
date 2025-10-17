import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToEmbedUrl(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&.*t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)(?:&.*t=(\d+))?/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)(?:\?.*t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)(?:\?.*start=(\d+))?/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      const timestamp = match[2]; // Captured timestamp in seconds
      
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      // If a timestamp was found, append it as a 'start' parameter
      if (timestamp) {
        embedUrl += `?start=${timestamp}`;
      }
      
      // If it's the last pattern (already an embed), and it had a timestamp, we've already constructed the correct URL.
      // If it didn't have one originally, we check the original URL for other params.
      // For all others, we check the original URL for params to carry over.
      const originalUrl = new URL(url);
      const searchParams = new URLSearchParams(originalUrl.search);

      // Carry over 'si' parameter if it exists and it's from a youtu.be link
      if (url.includes('youtu.be') && searchParams.has('si')) {
         if (embedUrl.includes('?')) {
            embedUrl += `&si=${searchParams.get('si')}`;
         } else {
            embedUrl += `?si=${searchParams.get('si')}`;
         }
      }

      return embedUrl;
    }
  }

  // If no YouTube pattern matches, return the original URL
  // This allows the component to fallback to a regular <video> tag for non-YouTube sources
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
