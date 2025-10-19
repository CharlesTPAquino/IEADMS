'use client';

import { useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { Skeleton } from './ui/skeleton';

export default function AuthManager({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (auth && !isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth, user, isUserLoading]);

  // If user is loading OR if there's no user yet (anonymous sign-in is in progress)
  // show the skeleton loader.
  if (isUserLoading || !user) {
    return (
      <div className="flex flex-col w-full h-screen p-4 sm:p-6 md:p-8 gap-4">
        <div className="flex justify-between items-start">
            <Skeleton className="h-24 w-1/4" />
            <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[170px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Only render children when we have an authenticated user.
  return <>{children}</>;
}
