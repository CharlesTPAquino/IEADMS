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
  /**
   * `createdAt` originally used Firebase Timestamp. To avoid coupling with
   * the Firebase SDK this project now accepts a simple serializable type.
   * Code that used `createdAt.toDate()` should guard for that shape.
   */
  createdAt: Date | { toDate?: () => Date } | string | null;
}
