import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import AuthManager from '@/components/AuthManager';

export const metadata: Metadata = {
  title: 'Templo do Espirito Santo',
  description: 'A virtual prayer and reflection board.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background text-foreground" suppressHydrationWarning={true}>
        <FirebaseClientProvider>
          <AuthManager>
            {children}
          </AuthManager>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
