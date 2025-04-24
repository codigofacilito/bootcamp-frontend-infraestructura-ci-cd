import Image from "next/image";
import { Job } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Briefcase, DollarSign } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="relative mb-4 mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md sm:mb-0">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:text-primary">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
          
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(job.posted)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end">
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-1 text-xs font-medium",
              experienceBadgeColors(job.experience)
            )}
          >
            {job.experience}
          </span>
          <button className="mt-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Apply Now
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job.description}
        </p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((requirement, index) => (
          <span
            key={index}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
          >
            {requirement.split(" ")[0]}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            +{job.requirements.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

function experienceBadgeColors(experience: string): string {
  switch (experience) {
    case "Entry Level":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "Mid Level":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "Senior Level":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
    case "Executive":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}