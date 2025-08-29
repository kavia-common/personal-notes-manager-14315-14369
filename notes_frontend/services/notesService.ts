import { useRuntimeConfig } from '#imports';

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string; // ISO string
  createdAt: string; // ISO string
};

const NOTES_KEY = 'notes.data.v1';

function nowISO() {
  return new Date().toISOString();
}

// PUBLIC_INTERFACE
export function useNotesService() {
  /** Provides CRUD for notes. If public.apiBase is set, uses remote endpoints instead of localStorage. */
  const config = useRuntimeConfig();
  const apiBase = (config.public?.apiBase || '').trim();

  // PUBLIC_INTERFACE
  async function listNotes(): Promise<Note[]> {
    if (apiBase) {
      return await $fetch<Note[]>(`${apiBase}/notes`);
    }
    if (process.client) {
      const raw = localStorage.getItem(NOTES_KEY);
      if (!raw) return [];
      try {
        const arr = JSON.parse(raw) as Note[];
        return arr.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
      } catch {
        return [];
      }
    }
    return [];
  }

  // PUBLIC_INTERFACE
  async function getNote(id: string): Promise<Note | null> {
    if (apiBase) {
      try {
        return await $fetch<Note>(`${apiBase}/notes/${id}`);
      } catch {
        return null;
      }
    }
    const all = await listNotes();
    return all.find(n => n.id === id) || null;
  }

  // PUBLIC_INTERFACE
  async function createNote(data: { title: string; content: string }): Promise<Note> {
    if (apiBase) {
      return await $fetch<Note>(`${apiBase}/notes`, {
        method: 'POST',
        body: data,
      });
    }
    const note: Note = {
      id: crypto.randomUUID(),
      title: data.title || 'Untitled',
      content: data.content || '',
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    const all = await listNotes();
    all.unshift(note);
    if (process.client) localStorage.setItem(NOTES_KEY, JSON.stringify(all));
    return note;
  }

  // PUBLIC_INTERFACE
  async function updateNote(id: string, data: { title: string; content: string }): Promise<Note | null> {
    if (apiBase) {
      try {
        return await $fetch<Note>(`${apiBase}/notes/${id}`, {
          method: 'PUT',
          body: data,
        });
      } catch {
        return null;
      }
    }
    const all = await listNotes();
    const idx = all.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const updated: Note = {
      ...all[idx],
      title: data.title,
      content: data.content,
      updatedAt: nowISO(),
    };
    all[idx] = updated;
    if (process.client) localStorage.setItem(NOTES_KEY, JSON.stringify(all));
    return updated;
  }

  // PUBLIC_INTERFACE
  async function deleteNote(id: string): Promise<boolean> {
    if (apiBase) {
      try {
        await $fetch(`${apiBase}/notes/${id}`, { method: 'DELETE' });
        return true;
      } catch {
        return false;
      }
    }
    const all = await listNotes();
    const filtered = all.filter(n => n.id !== id);
    if (process.client) localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    return all.length !== filtered.length;
  }

  return { listNotes, getNote, createNote, updateNote, deleteNote };
}
