import { PostItBoard } from '@/components/PostItBoard';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      <PostItBoard />
    </main>
  );
}
