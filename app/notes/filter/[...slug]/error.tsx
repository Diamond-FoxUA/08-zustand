'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function NotesFilteredError({ error, reset }: Props) {
  console.log(error);

  return (
    <div>
      <h2>Something went wrong while loading filtered notes.</h2>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
