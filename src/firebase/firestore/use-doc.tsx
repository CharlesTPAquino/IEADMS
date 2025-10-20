'use client';

import { useState, useEffect } from 'react';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

export interface UseDocResult<T> {
  data: WithId<T> | null;
  isLoading: boolean;
  error: Error | null;
}

export function useDoc<T = any>(memoizedDocRef: any | null | undefined): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Shim: no real subscription; return null data.
    setData(null);
    setIsLoading(false);
    setError(null);

    return () => {};
  }, [memoizedDocRef]);

  return { data, isLoading, error };
}