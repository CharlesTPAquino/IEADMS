'use client';

import { Cross, BookOpen, Heart, Sparkles } from 'lucide-react';

interface SubtitleProps {
  text: string;
  className?: string;
}

export function Subtitle({ text, className = "" }: SubtitleProps) {
  console.log('Subtitle component rendering with text:', text);
  return (
    <div className={`flex items-center justify-center gap-3 mt-3 ${className}`}>
      {/* Left decorative elements */}
      <div className="flex items-center gap-2 opacity-80">
        <Cross className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        <Heart className="w-3 h-3 text-red-400 fill-current" />
      </div>
      
      {/* Main subtitle text */}
      <div className="relative">
        <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent tracking-wide uppercase">
          {text}
        </span>
        
        {/* Decorative underline */}
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
      </div>
      
      {/* Right decorative elements */}
      <div className="flex items-center gap-2 opacity-80">
        <Heart className="w-3 h-3 text-red-400 fill-current" />
        <BookOpen className="w-4 h-4 text-amber-500 dark:text-amber-400" />
      </div>
    </div>
  );
}
