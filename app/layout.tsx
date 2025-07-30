import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ieee.bitmesra.ac.in'),
  title: "IEEE - Student Branch BIT Mesra",
  description: "IEEE Student Branch BIT Mesra - Advancing Technology for Humanity through innovation, education, and collaboration. Join our community of tech enthusiasts.",
  keywords: "IEEE, BIT Mesra, Student Branch, Technology, Engineering, Innovation, Workshops, Events, Hackathons",
  authors: [{ name: "IEEE Student Branch BIT Mesra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieee.bitmesra.ac.in",
    title: "IEEE - Student Branch BIT Mesra",
    description: "IEEE Student Branch BIT Mesra - Advancing Technology for Humanity through innovation, education, and collaboration.",
    siteName: "IEEE BIT Mesra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IEEE BIT Mesra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE - Student Branch BIT Mesra",
    description: "IEEE Student Branch BIT Mesra - Advancing Technology for Humanity",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
