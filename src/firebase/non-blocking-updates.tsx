"use client";

// No-op shims for non-blocking updates. They keep the same exported
// function names so components can import them without the Firebase SDK.
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(_docRef: any, _data: any, _options?: any) {
  // no-op: in the absence of Firestore, we simply do nothing.
  // Optionally emit a permission-error for visibility in the app.
  try {
    // noop
  } catch (e) {
    errorEmitter.emit('permission-error', new FirestorePermissionError({ path: 'unknown', operation: 'write', requestResourceData: _data }));
  }
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(_colRef: any, data: any) {
  // Return a resolved promise to mimic addDoc behavior without the SDK.
  return Promise.resolve({ id: 'shim-id', data });
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(_docRef: any, _data: any) {
  // no-op
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(_docRef: any) {
  // no-op
}