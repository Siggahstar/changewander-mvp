import { Change, Comment, Reaction, User } from './types';

// In-memory mock store for MVP scaffolding
const mockUsers: Record<string, User> = Object.create(null);
const mockChanges: Record<string, Change> = Object.create(null);
const mockComments: Record<string, Comment[]> = Object.create(null);
const mockReactions: Record<string, Record<string, Reaction>> = Object.create(null); // changeId -> userId -> reaction

function nowIso() {
  return new Date().toISOString();
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const Api = {
  async listChanges(params: {
    lat?: number;
    lon?: number;
    radiusKm?: number;
    search?: string;
    tags?: string[];
    after?: string;
  }): Promise<Change[]> {
    const all = Object.values(mockChanges).filter((c) => c.status === 'active');
    // naive filter for demo
    const filteredSearch = all.filter((c) =>
      params.search ? (c.title + ' ' + c.description + ' ' + c.tags.join(' ')).toLowerCase().includes(params.search.toLowerCase()) : true
    );
    const filteredTags = params.tags && params.tags.length
      ? filteredSearch.filter((c) => params.tags!.every((t) => c.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())))
      : filteredSearch;
    const filteredGeo = params.lat != null && params.lon != null && params.radiusKm != null
      ? filteredTags.filter((c) => {
          const d = haversineKm(params.lat!, params.lon!, c.lat, c.lon);
          return d <= (params.radiusKm as number);
        })
      : filteredTags;
    return filteredGeo.slice(0, 50);
  },

  async getChange(id: string): Promise<Change | null> {
    return mockChanges[id] ?? null;
  },

  async deleteChange(id: string, requesterId: string): Promise<boolean> {
    const item = mockChanges[id];
    if (!item) return false;
    if (item.userId !== requesterId) return false;
    delete mockChanges[id];
    delete mockComments[id];
    delete mockReactions[id];
    return true;
  },

  async createChange(input: Omit<Change, 'id' | 'createdAt' | 'updatedAt' | 'reactionsCount' | 'commentsCount' | 'status'>): Promise<Change> {
    const id = generateId('chg');
    const created: Change = {
      ...input,
      id,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      reactionsCount: 0,
      commentsCount: 0,
      status: 'active',
    };
    mockChanges[id] = created;
    return created;
  },

  async react(changeId: string, userId: string, type: Reaction['type']): Promise<void> {
    if (!mockReactions[changeId]) mockReactions[changeId] = Object.create(null);
    const previous = mockReactions[changeId][userId];
    if (!previous) {
      mockReactions[changeId][userId] = {
        id: generateId('rxn'),
        changeId,
        userId,
        type,
        createdAt: nowIso(),
      };
      if (mockChanges[changeId]) mockChanges[changeId].reactionsCount += 1;
    } else if (previous.type !== type) {
      mockReactions[changeId][userId] = { ...previous, type };
    }
  },

  async unreact(changeId: string, userId: string): Promise<void> {
    const userRxns = mockReactions[changeId];
    if (userRxns && userRxns[userId]) {
      delete userRxns[userId];
      if (mockChanges[changeId]) mockChanges[changeId].reactionsCount = Math.max(0, mockChanges[changeId].reactionsCount - 1);
    }
  },

  async listComments(changeId: string): Promise<Comment[]> {
    return mockComments[changeId] ?? [];
  },

  async addComment(changeId: string, userId: string, text: string): Promise<Comment> {
    const c: Comment = { id: generateId('cmt'), changeId, userId, text, createdAt: nowIso() };
    if (!mockComments[changeId]) mockComments[changeId] = [];
    mockComments[changeId].push(c);
    if (mockChanges[changeId]) mockChanges[changeId].commentsCount += 1;
    return c;
  },
  async getUserReaction(changeId: string, userId: string): Promise<Reaction | null> {
    const byUser = mockReactions[changeId];
    return byUser ? byUser[userId] ?? null : null;
  },
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// seed a little data for demo
(() => {
  const u: User = { id: 'u_demo', displayName: 'Demo User', createdAt: nowIso() };
  mockUsers[u.id] = u;
  const ch: Change = {
    id: 'chg_demo',
    userId: u.id,
    title: 'New Community Garden',
    description: 'Neighbors converted a vacant lot into a shared garden.',
    tags: ['garden', 'community'],
    lat: 37.7749,
    lon: -122.4194,
    address: 'San Francisco, CA',
    photos: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
    reactionsCount: 1,
    commentsCount: 1,
    status: 'active',
  };
  mockChanges[ch.id] = ch;
  mockReactions[ch.id] = {
    [u.id]: { id: 'rxn_demo', changeId: ch.id, userId: u.id, type: 'like', createdAt: nowIso() },
  };
  mockComments[ch.id] = [
    { id: 'cmt_demo', changeId: ch.id, userId: u.id, text: 'Love this!', createdAt: nowIso() },
  ];
})();


