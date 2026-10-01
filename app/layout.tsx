import type {Metadata} from 'next';
import './globals.css';
import {TablePlanProvider} from '@/lib/tablePlanContext';

export const metadata: Metadata = {
  title: 'Upper Deck Sky Lounge | Rooftop Lounge & Restaurant Navi Mumbai',
  description:
    'Experience luxury rooftop dining at Upper Deck Sky Lounge, Centurion Mall, Nerul/Seawoods, Navi Mumbai. Panoramic city views, craft cocktails, multi-cuisine gourmet dining & live evenings.',
  keywords: [
    'Upper Deck Sky Lounge',
    'Rooftop restaurant Nerul',
    'Seawoods sky lounge',
    'Centurion Mall restaurant Navi Mumbai',
    'Romantic rooftop dining Navi Mumbai',
    'Navi Mumbai lounge',
  ],
  openGraph: {
    title: 'Upper Deck Sky Lounge | Rooftop Restaurant & Lounge',
    description:
      'Centurion Mall, Nerul/Seawoods, Navi Mumbai. All days 12 PM - 12 AM. Rooftop ambiance, cocktails, and fine cuisine.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Deck Sky Lounge | Rooftop Restaurant & Lounge',
    description: 'Centurion Mall, Nerul/Seawoods, Navi Mumbai. All days 12 PM - 12 AM.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-stone-900 antialiased selection:bg-[#c5a059]/20 selection:text-[#936e27]" suppressHydrationWarning>
        <TablePlanProvider>{children}</TablePlanProvider>
      </body>
    </html>
  );
}
