'use client';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 80 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#EF4444', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle 
          cx="40" 
          cy="40" 
          r="38" 
          fill="url(#bgGradient)" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="2"
        />
        
        {/* Heart shape */}
        <path 
          d="M40 25 C35 20, 25 20, 25 30 C25 40, 40 55, 40 55 C40 55, 55 40, 55 30 C55 20, 45 20, 40 25 Z" 
          fill="url(#heartGradient)" 
          opacity="0.9"
        />
        
        {/* Cross on top of heart */}
        <rect x="37" y="15" width="6" height="20" fill="white" opacity="0.9"/>
        <rect x="30" y="22" width="20" height="6" fill="white" opacity="0.9"/>
        
        {/* Decorative elements */}
        <circle cx="25" cy="25" r="2" fill="white" opacity="0.6"/>
        <circle cx="55" cy="25" r="2" fill="white" opacity="0.6"/>
        <circle cx="25" cy="55" r="2" fill="white" opacity="0.6"/>
        <circle cx="55" cy="55" r="2" fill="white" opacity="0.6"/>
      </svg>
    </div>
  );
}
