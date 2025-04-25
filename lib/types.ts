export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  experience: ExperienceLevel;
  description: string;
  requirements: string[];
  posted: string;
  logo: string;
}

export type JobType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Freelance'
  | 'Internship';
export type ExperienceLevel =
  | 'Entry Level'
  | 'Mid Level'
  | 'Senior Level'
  | 'Executive';

export interface JobsResponse {
  jobs: Job[];
  total: number;
}

export interface SearchParams {
  query: string;
  type?: JobType[];
  location?: string;
  experience?: ExperienceLevel[];
  page: number;
  limit: number;
}
