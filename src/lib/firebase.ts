// This file is deprecated and will be removed in a future version.
// Please use the hooks and providers from '@/firebase' instead.
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { clientConfig } from "./firebase-client-config";

const app = !getApps().length ? initializeApp(clientConfig) : getApp();
const db = getFirestore(app);

export { db };
