"use client";

// Shimbed firebase index: exports safe, minimal APIs so the rest of the
// application doesn't need the real Firebase SDK. These stubs intentionally
// do nothing (or throw clear errors) and keep the same module surface so
// imports across the app stay valid.

export function initializeFirebase() {
  // No-op: real initialization removed.
  return null;
}

export function getSdks() {
  return {
    firebaseApp: null,
    auth: null,
    firestore: null,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
