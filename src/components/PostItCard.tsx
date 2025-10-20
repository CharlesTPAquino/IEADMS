'use client';

import { useState, useEffect } from 'react';
import { doc, increment } from '@/lib/firebase-shims';
import { useFirestore } from '@/firebase';
import type { PostIt, ReactionEmoji } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

interface PostItCardProps {
  post: PostIt;
}

const reactionEmojis: { emoji: ReactionEmoji; label: string }[] = [
  { emoji: '❤️', label: 'Amor' },
  { emoji: '🙏', label: 'Oração' },
  { emoji: '🙌', label: 'Louvor' },
  { emoji: '🕊️', label: 'Paz' },
];

export function PostItCard({ post }: PostItCardProps) {
  const firestore = useFirestore();
  const [timeAgo, setTimeAgo] = useState<string | null>(null);

  useEffect(() => {
    // Support different createdAt shapes: Date, object with toDate(), or ISO string
    let postDate: Date | null = null;
  if (!post.createdAt) return;
    if (typeof post.createdAt === 'string') {
      postDate = new Date(post.createdAt);
    } else if (post.createdAt instanceof Date) {
      postDate = post.createdAt;
    } else if (typeof (post.createdAt as any).toDate === 'function') {
      postDate = (post.createdAt as any).toDate();
    }
    if (!postDate) return;

    const updateDate = () => {
      setTimeAgo(formatDistanceToNow(postDate as Date, { addSuffix: true, locale: ptBR }));
    };

    // Run on mount to set initial value on client
    updateDate();

    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, [post.createdAt]);

  const handleReaction = (emoji: ReactionEmoji) => {
    if (!firestore || !post.id) return;
    const postRef = doc(firestore, 'postits', post.id);
    updateDocumentNonBlocking(postRef, {
      [`reactions.${emoji}`]: increment(1),
    });
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full break-inside-avoid-column shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:rotate-1 animate-in fade-in slide-in-from-bottom-4",
        "border-0 backdrop-blur-sm bg-opacity-90",
        post.backgroundColor
      )}
      style={{
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: '0.8s'
      }}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base font-bold text-black/90">{post.authorName}</CardTitle>
        {timeAgo ? <p className="text-xs text-black/70">{timeAgo}</p> : <div className="h-3" />}
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-black/80 whitespace-pre-wrap">{post.text}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-1 w-full border-t border-black/10 p-2">
        {reactionEmojis.map(({ emoji, label }) => (
          <Button
            key={emoji}
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(emoji)}
            className="flex flex-1 items-center justify-center gap-1.5 px-2 py-1 h-auto text-black/70 hover:bg-black/10 transition-transform active:scale-110"
            aria-label={`Reagir com ${label}`}
            title={label}
          >
            <span className="text-lg">{emoji}</span>
            <span className="text-xs font-mono">{post.reactions[emoji] || 0}</span>
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}
