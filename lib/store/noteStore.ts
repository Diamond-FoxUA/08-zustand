import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { NewNote } from '@/types/note';

interface NoteDraftProps {
  draft: NewNote;
  saveDraft: (data: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraftProps>()(
  persist(
    set => ({
      draft: initialDraft,
      saveDraft: data => set({ draft: data }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft', partialize: state => ({ draft: state.draft }) }
  )
);
