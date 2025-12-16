import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes, fetchNoteById } from '@/lib/api';
// import NotesClient from '../filter/[...slug]/Notes.client';
import NoteDetailsClient from './NoteDetails.client';

type MetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `Note: ${note.title}`;
  const description = note.content.slice(0, 30);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://08-zustand-kappa-opal.vercel.app/notehub-og-meta.jpg',
          alt: 'NoteHub – modern note-taking app',
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes({ query: '', page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
