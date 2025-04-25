'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-sm backdrop-blur-md bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-primary transition-colors duration-200 hover:text-primary/80"
          >
            JobBoard
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="hidden md:flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              aria-label="Search jobs"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
            <Link
              href="#"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
