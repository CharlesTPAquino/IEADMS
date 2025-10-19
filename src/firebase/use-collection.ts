'use client';

import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  queryEqual,
  refEqual,
  type DocumentData,
  type Query,
  type QuerySnapshot,
} from 'firebase/firestore';

export function useCollection<T extends DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const queryRef = useRef<Query<T> | null>(null);

  useEffect(() => {
    if (query === null) {
      setData(null);
      setLoading(false);
      return;
    }
    
    // Check if the query has changed
    if (queryRef.current && queryEqual(queryRef.current, query)) {
      return;
    }
    queryRef.current = query;

    setLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const docs = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
