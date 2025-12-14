import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Toaster } from 'react-hot-toast';
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
