import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CIS - Compensation Intelligence System',
  description: 'Structured, comparable compensation data for informed career decisions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
