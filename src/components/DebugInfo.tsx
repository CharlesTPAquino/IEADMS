'use client';

import { useEffect, useState } from 'react';

export function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<{
    localStorage: boolean;
    sessionStorage: boolean;
    cookies: boolean;
    userAgent: string;
  } | null>(null);

  useEffect(() => {
    try {
      setDebugInfo({
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        cookies: typeof document !== 'undefined' && document.cookie !== undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
      });
    } catch (error) {
      console.error('Error checking storage availability:', error);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Storage Debug:</div>
      <div>localStorage: {debugInfo?.localStorage ? '✅' : '❌'}</div>
      <div>sessionStorage: {debugInfo?.sessionStorage ? '✅' : '❌'}</div>
      <div>Cookies: {debugInfo?.cookies ? '✅' : '❌'}</div>
    </div>
  );
}
