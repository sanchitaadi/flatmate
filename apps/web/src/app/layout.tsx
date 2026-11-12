import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth/authContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'NestMate — Find Your People. Share Your Space.',
  description:
    'Integrated flatmate matching engine and rental property marketplace across India. Find verified flatmates, private rooms, shared flats, and PGs in Bangalore, Mumbai, Delhi NCR, Pune, and Hyderabad.',
  keywords: [
    'flatmates india',
    'roommates bangalore',
    'flat for rent mumbai',
    'pg in gurgaon',
    'flatmate finder',
    'zero brokerage flatmates',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
