import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note in your personal notes collection',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note in your personal notes collection',
    url: 'https://08-zustand-kappa-opal.vercel.app/notes/action/create',
    images: [{
      url: 'https://08-zustand-kappa-opal.vercel.app/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'Create note page'
    }]
  }
}


function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
        <Toaster />
      </div>
    </main>
  );
}

export default CreateNote;
