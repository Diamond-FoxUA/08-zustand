'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return <Modal onClose={handleClose}>Loading, please wait...</Modal>;
  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong.</p>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <button
        className={css.backBtn}
        type="button"
        onClick={handleClose}
        aria-label="Close modal"
      >
        Go back
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString('uk-UA')}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;