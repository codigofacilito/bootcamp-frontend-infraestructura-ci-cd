"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full" data-testid="search-container">
      <form
        onSubmit={handleSubmit}
        className="relative rounded-lg shadow-sm"
        role="search"
      >
        <div
          className={`relative rounded-lg border transition-all duration-200 ${
            isFocused
              ? "border-primary shadow-sm ring-1 ring-primary"
              : "border-input"
          }`}
        >
          <div className="flex h-14 items-center">
            <div className="flex items-center pl-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              className="h-full w-full border-0 bg-transparent px-3 py-3 focus:outline-none focus:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="submit"
              className="mx-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}