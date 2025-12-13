import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Notes({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.[0] ?? 'all';
  const tag = slug === 'all' ? null : slug;
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '',  1],
    queryFn: () => fetchNotes({ query: '', page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} key={tag ?? 'all'}/>
    </HydrationBoundary>
  );
}