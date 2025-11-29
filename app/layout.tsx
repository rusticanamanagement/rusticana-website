import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rusticana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bona+Nova+SC:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="m-0">{children}</body>
    </html>
  );
}
