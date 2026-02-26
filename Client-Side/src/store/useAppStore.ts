import { create } from 'zustand';
import { CompanyList, Note, SavedSearch, EnrichmentData } from '@/types';

interface AppStore {
  // Lists
  lists: CompanyList[];
  createList: (name: string, description: string) => void;
  deleteList: (id: string) => void;
  addToList: (listId: string, companyId: string) => void;
  removeFromList: (listId: string, companyId: string) => void;

  // Notes
  notes: Note[];
  addNote: (companyId: string, content: string) => void;
  deleteNote: (noteId: string) => void;

  // Saved searches
  savedSearches: SavedSearch[];
  saveSearch: (search: Omit<SavedSearch, 'id' | 'createdAt'>) => void;
  deleteSavedSearch: (id: string) => void;

  // Enrichment cache
  enrichmentCache: Record<string, EnrichmentData>;
  setEnrichment: (companyId: string, data: EnrichmentData) => void;

  // Saved companies (quick save)
  savedCompanyIds: string[];
  toggleSavedCompany: (companyId: string) => void;
}

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch { return fallback; }
};

const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useAppStore = create<AppStore>((set, get) => ({
  lists: loadFromStorage<CompanyList[]>('vc-lists', []),
  createList: (name, description) => {
    const newList: CompanyList = {
      id: crypto.randomUUID(), name, description, companyIds: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    const lists = [...get().lists, newList];
    saveToStorage('vc-lists', lists);
    set({ lists });
  },
  deleteList: (id) => {
    const lists = get().lists.filter(l => l.id !== id);
    saveToStorage('vc-lists', lists);
    set({ lists });
  },
  addToList: (listId, companyId) => {
    const lists = get().lists.map(l =>
      l.id === listId && !l.companyIds.includes(companyId)
        ? { ...l, companyIds: [...l.companyIds, companyId], updatedAt: new Date().toISOString() }
        : l
    );
    saveToStorage('vc-lists', lists);
    set({ lists });
  },
  removeFromList: (listId, companyId) => {
    const lists = get().lists.map(l =>
      l.id === listId
        ? { ...l, companyIds: l.companyIds.filter(id => id !== companyId), updatedAt: new Date().toISOString() }
        : l
    );
    saveToStorage('vc-lists', lists);
    set({ lists });
  },

  notes: loadFromStorage<Note[]>('vc-notes', []),
  addNote: (companyId, content) => {
    const note: Note = { id: crypto.randomUUID(), companyId, content, createdAt: new Date().toISOString(), author: 'You' };
    const notes = [...get().notes, note];
    saveToStorage('vc-notes', notes);
    set({ notes });
  },
  deleteNote: (noteId) => {
    const notes = get().notes.filter(n => n.id !== noteId);
    saveToStorage('vc-notes', notes);
    set({ notes });
  },

  savedSearches: loadFromStorage<SavedSearch[]>('vc-saved-searches', []),
  saveSearch: (search) => {
    const saved: SavedSearch = { ...search, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const savedSearches = [...get().savedSearches, saved];
    saveToStorage('vc-saved-searches', savedSearches);
    set({ savedSearches });
  },
  deleteSavedSearch: (id) => {
    const savedSearches = get().savedSearches.filter(s => s.id !== id);
    saveToStorage('vc-saved-searches', savedSearches);
    set({ savedSearches });
  },

  enrichmentCache: loadFromStorage<Record<string, EnrichmentData>>('vc-enrichment', {}),
  setEnrichment: (companyId, data) => {
    const enrichmentCache = { ...get().enrichmentCache, [companyId]: data };
    saveToStorage('vc-enrichment', enrichmentCache);
    set({ enrichmentCache });
  },

  savedCompanyIds: loadFromStorage<string[]>('vc-saved-companies', []),
  toggleSavedCompany: (companyId) => {
    const current = get().savedCompanyIds;
    const savedCompanyIds = current.includes(companyId)
      ? current.filter(id => id !== companyId)
      : [...current, companyId];
    saveToStorage('vc-saved-companies', savedCompanyIds);
    set({ savedCompanyIds });
  },
}));
