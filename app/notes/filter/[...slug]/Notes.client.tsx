'use client';
import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

import css from './Notes.module.css';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';

type Props = {
  tag: string | null;
};

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const updateDebouncedQuery = useDebouncedCallback(() => {
    setDebouncedQuery(query);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    updateDebouncedQuery();
  }, [query, updateDebouncedQuery]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', tag, debouncedQuery, currentPage],
    queryFn: () =>
      fetchNotes({ query: debouncedQuery, page: currentPage, tag }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (
      isSuccess &&
      data?.notes.length === 0 &&
      debouncedQuery.trim().length > 0
    ) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data?.notes.length, debouncedQuery]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox searchQuery={query} onChange={handleChange} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {
            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          }
        </header>
        {isLoading && <Loader />}
        {isError && <p>Something went wrong. Please try again.</p>}
        {data && data.notes.length === 0 && <p>No notes found.</p>}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
      <Toaster />
    </>
  );
}
