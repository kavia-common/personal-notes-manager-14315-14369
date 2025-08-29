<template>
  <div class="container" style="display: grid; gap: 18px;">
    <section class="card" style="padding: 16px;">
      <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <h2 style="margin: 0;">My Notes</h2>
          <span class="badge">{{ filteredNotes.length }} notes</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <input v-model="q" placeholder="Search notes…" />
          <button class="btn btn-primary" @click="startCreate">+ New</button>
        </div>
      </div>
    </section>

    <section v-if="createMode" class="card" style="padding: 16px;">
      <h3 style="margin-top: 0;">Create Note</h3>
      <form @submit.prevent="create" style="display: grid; gap: 10px;">
        <input v-model="form.title" placeholder="Note title" required />
        <textarea v-model="form.content" rows="5" placeholder="Write your note…"></textarea>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn btn-ghost" type="button" @click="cancelCreate">Cancel</button>
          <button class="btn btn-primary" type="submit">Create</button>
        </div>
      </form>
    </section>

    <section class="grid">
      <article v-for="n in filteredNotes" :key="n.id" class="card note-card" @click="openNote(n.id)">
        <header class="note-head">
          <h3 class="title">{{ n.title || 'Untitled' }}</h3>
          <time class="time" :datetime="n.updatedAt">Updated {{ formatRelative(n.updatedAt) }}</time>
        </header>
        <p class="preview">{{ n.content || 'No content' }}</p>
        <footer class="actions">
          <button class="btn btn-ghost" @click.stop="openNote(n.id)">Open</button>
          <button class="btn btn-ghost" style="color:#b91c1c" @click.stop="remove(n.id)">Delete</button>
        </footer>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import { useRoute, useRouter } from 'vue-router';
import { useNotesService, type Note } from '@/services/notesService';

const service = useNotesService();
const router = useRouter();
const route = useRoute();

const notes = ref<Note[]>([]);
const q = ref('');
const createMode = ref(false);
const form = reactive({ title: '', content: '' });

onMounted(async () => {
  await load();
  if (route.query.create === '1') {
    startCreate();
  }
});

async function load() {
  notes.value = await service.listNotes();
}

const filteredNotes = computed(() => {
  if (!q.value) return notes.value;
  const s = q.value.toLowerCase();
  return notes.value.filter(n =>
    (n.title || '').toLowerCase().includes(s) ||
    (n.content || '').toLowerCase().includes(s)
  );
});

function startCreate() {
  createMode.value = true;
  form.title = '';
  form.content = '';
}
function cancelCreate() {
  createMode.value = false;
}

async function create() {
  const n = await service.createNote({ title: form.title, content: form.content });
  createMode.value = false;
  router.push(`/notes/${n.id}`);
}

function openNote(id: string) {
  router.push(`/notes/${id}`);
}

async function remove(id: string) {
  const ok = confirm('Delete this note? This cannot be undone.');
  if (!ok) return;
  const success = await service.deleteNote(id);
  if (success) {
    await load();
  }
}

function formatRelative(iso: string) {
  const dt = new Date(iso);
  const diff = (Date.now() - dt.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} h ago`;
  return dt.toLocaleDateString();
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.note-card {
  padding: 14px;
  display: grid;
  gap: 10px;
  cursor: pointer;
  transition: transform .06s ease, box-shadow .2s;
}
.note-card:hover { transform: translateY(-1px); box-shadow: 0 12px 36px rgba(2,6,23,.08); }
.note-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.title { margin: 0; font-size: 18px; }
.time { color: var(--muted); font-size: 12px; }
.preview {
  color: var(--muted);
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;
  margin: 0;
}
.actions { display: flex; gap: 8px; justify-content: flex-end; }
</style>
