'use client';
import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { NewNote, NoteTag } from '@/types/note';
import { createNote } from '@/lib/api';

export default function NoteForm() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    if (!title || !content || !tag) {
      toast.error('All field are required.');
      return;
    }

    const newNote: NewNote = {
      title,
      content,
      tag,
    };

    mutate(newNote);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          className={css.input}
          type="text"
          name="title"
          placeholder="Title"
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          className={css.textarea}
          name="content"
          id="content"
          rows={8}
        ></textarea>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select className={css.select} name="tag" id="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <Link className={css.cancelButton} href='/notes/filter/all'>Cancel</Link>
        <button className={css.submitButton} type="submit" disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
