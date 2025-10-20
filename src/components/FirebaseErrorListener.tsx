'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

/**
 * Generic listener for permission-errors emitted by the shimmed firebase layer.
 * If an error is received, rethrow to be handled by the app's global error boundary.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (err: Error) => setError(err);
    errorEmitter.on('permission-error', handleError);
    return () => errorEmitter.off('permission-error', handleError);
  }, []);

  if (error) throw error;
  return null;
}
