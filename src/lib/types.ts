import type { Timestamp } from 'firebase/firestore';

export type Reactions = {
  '❤️': number;
  '🙏': number;
  '🙌': number;
  '🕊️': number;
};

export type ReactionEmoji = keyof Reactions;

export interface PostIt {
  id: string;
  text: string;
  authorName: string;
  backgroundColor: string;
  reactions: Reactions;
  createdAt: Timestamp;
}
