export type User = {
  id: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string; // ISO timestamp
};

export type Change = {
  id: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  lat: number;
  lon: number;
  address?: string;
  photos: string[]; // urls
  createdAt: string;
  updatedAt: string;
  reactionsCount: number;
  commentsCount: number;
  status: 'active' | 'flagged' | 'removed';
};

export type Reaction = {
  id: string;
  changeId: string;
  userId: string;
  type: 'like' | 'seed';
  createdAt: string;
};

export type Comment = {
  id: string;
  changeId: string;
  userId: string;
  text: string;
  createdAt: string;
};


