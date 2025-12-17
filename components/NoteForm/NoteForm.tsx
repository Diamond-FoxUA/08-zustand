'use client';
import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { NewNote } from '@/types/note';
import { createNote } from '@/lib/api';
import { useNoteDraft } from '@/lib/store/noteStore';

export default function NoteForm() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { draft, saveDraft, clearDraft } = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    saveDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNote;

    if (!values.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!values.content.trim()) {
      toast.error('Content is required');
      return;
    }

    mutate(values);
  };

  return (
    <form
      className={css.form}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          className={css.input}
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          className={css.textarea}
          name="content"
          id="content"
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          className={css.select}
          name="tag"
          id="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className={css.submitButton} type="submit" disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
