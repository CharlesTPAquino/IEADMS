'use client';

// No-op auth shims. These preserve the function names so consumers don't break.
export function initiateAnonymousSignIn(_authInstance: any): void {
  // no-op: authentication disabled in this build
}

export function initiateEmailSignUp(_authInstance: any, _email: string, _password: string): void {
  // no-op
}

export function initiateEmailSignIn(_authInstance: any, _email: string, _password: string): void {
  // no-op
}
