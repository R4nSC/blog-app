import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "A blog about web development, programming, and technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-foreground text-background p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              My Tech Blog
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-foreground text-background p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} My Tech Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
