'use client';

import { useEffect, useState } from 'react';
import { JobType, Job, ExperienceLevel } from '@/lib/types';
import { searchJobs } from '@/lib/data';
import JobCard from './JobCard';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useSearchParams, useRouter } from 'next/navigation';

export default function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const location = searchParams.get('location') || '';
  const type = searchParams.getAll('type') as JobType[];
  const experience = searchParams.getAll('experience') as ExperienceLevel[];

  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const JOBS_PER_PAGE = 6;

  useEffect(() => {
    const fetchJobs = () => {
      setIsLoading(true);
      const result = searchJobs({
        query,
        type: type.length > 0 ? type : undefined,
        location: location || undefined,
        experience: experience.length > 0 ? experience : undefined,
        page,
        limit: JOBS_PER_PAGE,
      });

      setJobs(result.jobs);
      setTotalJobs(result.total);
      setIsLoading(false);
    };

    fetchJobs();
  }, [query, type, location, experience, page]);

  const updateSearchParams = (
    updates: Record<string, string | string[] | number | null>
  ) => {
    const newParams = new URLSearchParams();

    // Copy current params
    searchParams.forEach((value, key) => {
      if (!Object.keys(updates).includes(key)) {
        newParams.append(key, value);
      }
    });

    // Add/update with new values
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        // Skip this key (remove it)
      } else if (Array.isArray(value)) {
        // For arrays like type and experience
        value.forEach((v) => newParams.append(key, v));
      } else {
        newParams.set(key, String(value));
      }
    });

    // Reset to page 1 if filters change
    if (!updates.hasOwnProperty('page')) {
      newParams.set('page', '1');
    }

    const newSearch = newParams.toString();
    router.push(newSearch ? `/?${newSearch}` : '/');
  };

  const handleSearch = (newQuery: string) => {
    updateSearchParams({ query: newQuery || null });
  };

  const handleFilterChange = (
    filterType: 'jobType' | 'experience' | 'location',
    value: any
  ) => {
    if (filterType === 'jobType') {
      updateSearchParams({ type: value.length > 0 ? value : null });
    } else if (filterType === 'experience') {
      updateSearchParams({ experience: value.length > 0 ? value : null });
    } else if (filterType === 'location') {
      updateSearchParams({ location: value || null });
    }
  };

  const handleClearFilters = () => {
    updateSearchParams({
      type: null,
      experience: null,
      location: null,
    });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage });

    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
          Find Your Dream Job
        </h1>
        <p className="mb-8 text-center text-lg text-muted-foreground">
          Discover opportunities that match your skills and career goals
        </p>
        <SearchBar initialQuery={query} onSearch={handleSearch} />
      </div>

      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
          <div className="sticky top-24">
            <FilterSidebar
              selectedJobTypes={type}
              selectedExperience={experience}
              selectedLocation={location}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        <div className="md:w-3/4 lg:w-4/5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isLoading ? 'Searching jobs...' : `${totalJobs} jobs found`}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-48 animate-pulse rounded-lg bg-muted"
                ></div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
              <h3 className="mb-2 text-lg font-semibold">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear filters
              </button>
            </div>
          )}

          {totalJobs > JOBS_PER_PAGE && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalJobs / JOBS_PER_PAGE)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
