import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a modern note-taking web app built with Next.js.',
  icons: {
    icon: '/favicon.svg',
  },
  authors: [{ name: 'Dmytro Farbun' }],
  openGraph: {
    title: 'NoteHub',
    description:
      'Create, tag, search, and save drafts of your notes with NoteHub.',
    url: 'https://08-zustand-kappa-opal.vercel.app/',
    images: [
      {
        url: 'https://08-zustand-kappa-opal.vercel.app/notehub-og-meta.jpg',
        alt: 'NoteHub – modern note-taking app',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const roboto = Roboto({
  weight: ['400','600', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
