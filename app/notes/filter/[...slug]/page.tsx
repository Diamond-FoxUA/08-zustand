import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const urlPath = (await params).slug?.join('/');
  const filter = (await params).slug?.join(' / ');

  const title = `Notes filtered by ${filter}`;
  const description = `Browse notes filtered by ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/filter/${urlPath}`,
      images: [
        {
          url: 'https://08-zustand-kappa-opal.vercel.app/notehub-og-meta.jpg',
          alt: "NoteHub – modern note-taking app",
          width: 1200,
          height: 630
        }
      ]
    },
  };
}

export default async function Notes({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.[0] ?? 'all';
  const tag = slug === 'all' ? null : slug;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () => fetchNotes({ query: '', page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} key={tag ?? 'all'} />
    </HydrationBoundary>
  );
}
