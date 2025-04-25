'use client';

import RootLayout from '@/components/layout/RootLayout';
import JobList from '@/components/jobs/JobList';

export default function Home() {
  return (
    <RootLayout>
      <JobList />
    </RootLayout>
  );
}
