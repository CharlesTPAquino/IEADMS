// Lightweight shims to replace a few firebase/firestore helpers used across the app.
// These do not perform any network operations — they only provide a compatible
// shape so the rest of the codebase can run without the Firebase SDK.

export function doc(firestoreOrPath: any, collectionName?: string, id?: string) {
  // Return a lightweight ref-like object used by updateDocumentNonBlocking
  if (typeof firestoreOrPath === 'string') {
    return { path: firestoreOrPath };
  }
  if (collectionName && id) {
    return { path: `${collectionName}/${id}` };
  }
  return { path: 'unknown' };
}

export function collection(firestoreOrPath: any, name?: string) {
  if (typeof firestoreOrPath === 'string') {
    return { path: firestoreOrPath };
  }
  if (name) return { path: name };
  return { path: 'unknown' };
}

export function increment(n: number) {
  // Represent as a marker object; shims won't attempt arithmetic on it.
  return { __op: 'increment', by: n };
}

export function serverTimestamp() {
  return { __op: 'serverTimestamp' };
}

export function query(ref: any, ...args: any[]) {
  return { __memo: true, ref, args };
}

export function orderBy(field: string, dir: 'asc' | 'desc' = 'asc') {
  return { __op: 'orderBy', field, dir };
}
