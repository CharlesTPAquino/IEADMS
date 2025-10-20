'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from '@/lib/firebase-shims';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { PostIt } from '@/lib/types';
import { PostItCard } from '@/components/PostItCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AddPostItDialog } from '@/components/AddPostItDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';
import { Users, StickyNote, HeartHandshake, Cross, BookOpen, Heart } from 'lucide-react';

export function PostItBoard() {
  const firestore = useFirestore();
  
  const postitsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "postits"), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: posts, isLoading, error } = useCollection<PostIt>(postitsQuery);

  const totalPosts = posts?.length ?? 0;
  const totalReactions = useMemo(() => {
    if (!posts) return 0;
    return posts.reduce((acc, post) => {
      return acc + Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
    }, 0);
  }, [posts]);
  const totalParticipants = useMemo(() => {
    if (!posts) return 0;
    const authors = new Set(posts.map(p => p.authorName));
    return authors.size;
  }, [posts]);


  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] -z-10" />
      
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 py-8 sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 shadow-lg">
        <div className="flex items-center gap-4">
           <div className="hidden sm:flex items-center gap-8 text-lg">
            <div className="flex items-center gap-2 transition-all duration-300 hover:scale-110 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-full" title="Participantes">
              <Users className="w-5 h-5" />
              <span className="font-semibold text-sm">{totalParticipants}</span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:scale-110 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-full" title="Total de Notas">
              <StickyNote className="w-5 h-5" />
              <span className="font-semibold text-sm">{totalPosts}</span>
            </div>
            <div className="flex items-center gap-2 transition-all duration-300 hover:scale-110 text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-3 py-2 rounded-full" title="Total de Reações">
              <HeartHandshake className="w-5 h-5" />
              <span className="font-semibold text-sm">{totalReactions}</span>
            </div>
          </div>
        </div>
        <div className="text-center px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
              <Logo className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                IEADMS
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="flex items-center gap-2 opacity-80">
                <Cross className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <Heart className="w-3 h-3 text-red-400 fill-current" />
              </div>
              <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent tracking-wide uppercase">
                MATURIDADE CRISTÃ
              </span>
              <div className="flex items-center gap-2 opacity-80">
                <Heart className="w-3 h-3 text-red-400 fill-current" />
                <BookOpen className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <ThemeToggle />
          <AddPostItDialog />
        </div>
      </header>
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <Skeleton className="h-[170px] w-full rounded-xl bg-white/50 dark:bg-slate-800/50" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5 bg-white/50 dark:bg-slate-800/50" />
                  <Skeleton className="h-4 w-1/2 bg-white/50 dark:bg-slate-800/50" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
           <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-red-500/50 bg-red-50/20 dark:bg-red-900/20 text-center text-red-700 dark:text-red-400 p-12 h-full backdrop-blur-sm">
            <div className="max-w-md">
              <h2 className="text-xl font-bold mb-2">Erro de Permissão</h2>
              <p className="mb-4">As regras de segurança do Firestore estão bloqueando o acesso.</p>
              <p className="text-sm">Por favor, verifique as regras no seu projeto Firebase.</p>
            </div>
          </div>
        ) : posts && posts.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 text-center text-muted-foreground p-12 h-full backdrop-blur-sm">
            <div className="max-w-md">
              <p className="text-lg font-medium">Nenhuma nota ainda</p>
              <p className="text-sm mt-2">Seja o primeiro a criar uma mensagem de fé!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {(posts || []).map((post, index) => (
              <div 
                key={post.id} 
                className="animate-in fade-in slide-in-from-bottom-4 card-animation-delay"
                style={{
                  '--animation-delay': `${index * 0.1}s`,
                  animationDuration: '0.6s'
                } as React.CSSProperties}
              >
                <PostItCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
