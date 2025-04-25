'use client';

import { useState } from 'react';
import { ExperienceLevel, JobType } from '@/lib/types';
import { getExperienceLevels, getJobTypes, getLocations } from '@/lib/data';
import { CheckSquare, ChevronsUpDown, X } from 'lucide-react';

interface FilterSidebarProps {
  selectedJobTypes: JobType[];
  selectedExperience: ExperienceLevel[];
  selectedLocation: string;
  onFilterChange: (
    type: 'jobType' | 'experience' | 'location',
    value: any
  ) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  selectedJobTypes,
  selectedExperience,
  selectedLocation,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const jobTypes = getJobTypes();
  const experienceLevels = getExperienceLevels();
  const locations = getLocations();

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    experience: true,
    location: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleJobTypeChange = (type: JobType) => {
    const newSelected = selectedJobTypes.includes(type)
      ? selectedJobTypes.filter((t) => t !== type)
      : [...selectedJobTypes, type];
    onFilterChange('jobType', newSelected);
  };

  const handleExperienceChange = (level: ExperienceLevel) => {
    const newSelected = selectedExperience.includes(level)
      ? selectedExperience.filter((e) => e !== level)
      : [...selectedExperience, level];
    onFilterChange('experience', newSelected);
  };

  const handleLocationChange = (location: string) => {
    onFilterChange('location', location === selectedLocation ? '' : location);
  };

  const hasActiveFilters =
    selectedJobTypes.length > 0 ||
    selectedExperience.length > 0 ||
    selectedLocation;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Job Type Filter */}
        <div className="border-t border-border pt-4">
          <button
            className="mb-2 flex w-full items-center justify-between text-sm font-medium"
            onClick={() => toggleSection('jobType')}
          >
            Job Type
            <ChevronsUpDown
              className={`h-4 w-4 transition-transform ${
                expandedSections.jobType ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.jobType && (
            <div className="mt-2 space-y-2">
              {jobTypes.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded border border-input">
                    {selectedJobTypes.includes(type) && (
                      <CheckSquare className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <span>{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level Filter */}
        <div className="border-t border-border pt-4">
          <button
            className="mb-2 flex w-full items-center justify-between text-sm font-medium"
            onClick={() => toggleSection('experience')}
          >
            Experience Level
            <ChevronsUpDown
              className={`h-4 w-4 transition-transform ${
                expandedSections.experience ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.experience && (
            <div className="mt-2 space-y-2">
              {experienceLevels.map((level) => (
                <label
                  key={level}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => handleExperienceChange(level)}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded border border-input">
                    {selectedExperience.includes(level) && (
                      <CheckSquare className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <span>{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="border-t border-border pt-4">
          <button
            className="mb-2 flex w-full items-center justify-between text-sm font-medium"
            onClick={() => toggleSection('location')}
          >
            Location
            <ChevronsUpDown
              className={`h-4 w-4 transition-transform ${
                expandedSections.location ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.location && (
            <div className="mt-2 space-y-2">
              {locations.map((location) => (
                <label
                  key={location}
                  className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => handleLocationChange(location)}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded border border-input">
                    {selectedLocation === location && (
                      <CheckSquare className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <span>{location}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
