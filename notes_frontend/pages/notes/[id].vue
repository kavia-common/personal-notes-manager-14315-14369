<template>
  <div class="container">
    <div class="card" style="padding: 16px; display: grid; gap: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <NuxtLink class="btn btn-ghost" to="/notes">← Back</NuxtLink>
          <span class="badge" v-if="note">Updated {{ formatRelative(note.updatedAt) }}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-ghost" style="color:#b91c1c" @click="removeNote">Delete</button>
          <button class="btn btn-primary" @click="save" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
        </div>
      </div>

      <div v-if="note" class="form">
        <input v-model="noteForm.title" placeholder="Title" />
        <textarea v-model="noteForm.content" rows="16" placeholder="Write your note here…"></textarea>
      </div>
      <div v-else>
        <p>Loading…</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import { useNotesService, type Note } from '@/services/notesService';

const route = useRoute();
const router = useRouter();
const service = useNotesService();

const id = computed(() => String(route.params.id || ''));
const note = ref<Note | null>(null);
const noteForm = reactive({ title: '', content: '' });
const saving = ref(false);

onMounted(async () => {
  await load();
});

async function load() {
  note.value = await service.getNote(id.value);
  if (!note.value) return;
  noteForm.title = note.value.title;
  noteForm.content = note.value.content;
}

async function save() {
  if (!note.value) return;
  saving.value = true;
  const updated = await service.updateNote(note.value.id, { title: noteForm.title, content: noteForm.content });
  saving.value = false;
  if (updated) {
    note.value = updated;
  }
}

async function removeNote() {
  if (!note.value) return;
  const ok = confirm('Delete this note? This cannot be undone.');
  if (!ok) return;
  const success = await service.deleteNote(note.value.id);
  if (success) router.push('/notes');
}

function formatRelative(iso: string) {
  const dt = new Date(iso);
  const diff = (Date.now() - dt.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} h ago`;
  return dt.toLocaleString();
}
</script>

<style scoped>
.form {
  display: grid;
  gap: 10px;
}
textarea {
  resize: vertical;
}
</style>
