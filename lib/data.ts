import {
  ExperienceLevel,
  Job,
  JobsResponse,
  JobType,
  SearchParams,
} from './types';

// Mock data
const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    experience: 'Mid Level',
    description:
      'We are looking for a skilled Frontend Developer to join our team. The ideal candidate will have experience with React and modern JavaScript frameworks.',
    requirements: [
      'Proficient in React, Next.js',
      '3+ years of frontend development experience',
      'Strong understanding of HTML, CSS, and JavaScript',
      'Experience with responsive design',
    ],
    posted: '2023-04-15',
    logo: 'https://images.pexels.com/photos/15013622/pexels-photo-15013622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    experience: 'Senior Level',
    description:
      'Join our backend team to build scalable APIs and services. You will work on high-performance systems that handle millions of users.',
    requirements: [
      'Proficient in Node.js, Python, or Java',
      '5+ years of backend development experience',
      'Experience with database design and optimization',
      'Understanding of cloud services (AWS, GCP)',
    ],
    posted: '2023-04-12',
    logo: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'CreativeHub',
    location: 'Remote',
    type: 'Contract',
    salary: '$70,000 - $90,000',
    experience: 'Mid Level',
    description:
      'We are seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our web and mobile applications.',
    requirements: [
      'Portfolio demonstrating UI/UX skills',
      '3+ years of design experience',
      'Proficiency with Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles',
    ],
    posted: '2023-04-10',
    logo: 'https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    experience: 'Senior Level',
    description:
      'Join our data science team to build predictive models and extract insights from large datasets.',
    requirements: [
      'Advanced degree in Computer Science, Statistics, or related field',
      'Experience with machine learning algorithms',
      'Proficiency in Python, R, or similar',
      'Knowledge of data visualization techniques',
    ],
    posted: '2023-04-08',
    logo: 'https://images.pexels.com/photos/7367419/pexels-photo-7367419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$95,000 - $125,000',
    experience: 'Mid Level',
    description:
      'We are looking for a DevOps Engineer to help us automate our infrastructure and deployment processes.',
    requirements: [
      'Experience with CI/CD pipelines',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Familiarity with infrastructure as code (Terraform, CloudFormation)',
      'Strong scripting skills (Bash, Python)',
    ],
    posted: '2023-04-05',
    logo: 'https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    experience: 'Senior Level',
    description:
      'Lead product development and strategy for our flagship software product.',
    requirements: [
      '5+ years of product management experience',
      'Strong understanding of software development lifecycle',
      'Excellent communication and stakeholder management skills',
      'Experience with agile methodologies',
    ],
    posted: '2023-04-03',
    logo: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    title: 'QA Engineer',
    company: 'QualitySoft',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    experience: 'Mid Level',
    description:
      'Join our QA team to ensure the quality and reliability of our software products.',
    requirements: [
      'Experience with manual and automated testing',
      'Knowledge of testing methodologies',
      'Familiarity with testing tools (Selenium, Jest, Cypress)',
      'Strong attention to detail',
    ],
    posted: '2023-04-01',
    logo: 'https://images.pexels.com/photos/7948016/pexels-photo-7948016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    experience: 'Mid Level',
    description:
      'Build native mobile applications for iOS and Android platforms.',
    requirements: [
      'Experience with Swift, Kotlin, or React Native',
      '3+ years of mobile development experience',
      'Understanding of mobile app architecture',
      'Familiarity with app store submission processes',
    ],
    posted: '2023-03-28',
    logo: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '9',
    title: 'Technical Writer',
    company: 'DocuTech',
    location: 'Remote',
    type: 'Part-time',
    salary: '$40 - $60 per hour',
    experience: 'Entry Level',
    description:
      'Create clear and concise technical documentation for our software products.',
    requirements: [
      'Strong writing and editing skills',
      'Ability to explain complex technical concepts',
      'Familiarity with documentation tools',
      'Basic understanding of software development',
    ],
    posted: '2023-03-25',
    logo: 'https://images.pexels.com/photos/4064839/pexels-photo-4064839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '10',
    title: 'Security Analyst',
    company: 'SecureNet',
    location: 'Washington, DC',
    type: 'Full-time',
    salary: '$95,000 - $125,000',
    experience: 'Mid Level',
    description:
      'Help protect our systems and data from security threats and vulnerabilities.',
    requirements: [
      'Knowledge of security protocols and best practices',
      'Experience with security tools and technologies',
      'Understanding of network security',
      'Familiarity with compliance requirements',
    ],
    posted: '2023-03-22',
    logo: 'https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '11',
    title: 'Full Stack Developer',
    company: 'OmniTech',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    experience: 'Senior Level',
    description:
      'Develop both frontend and backend components for our web applications.',
    requirements: [
      'Proficiency in both frontend and backend technologies',
      '5+ years of full stack development experience',
      'Experience with modern JavaScript frameworks',
      'Knowledge of database design and optimization',
    ],
    posted: '2023-03-20',
    logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '12',
    title: 'Machine Learning Engineer',
    company: 'AIInnovate',
    location: 'San Jose, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    experience: 'Senior Level',
    description:
      'Design and implement machine learning models to solve complex business problems.',
    requirements: [
      'Advanced degree in Computer Science or related field',
      'Experience with machine learning frameworks (TensorFlow, PyTorch)',
      'Strong programming skills in Python',
      'Understanding of deep learning techniques',
    ],
    posted: '2023-03-18',
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Function to filter and search jobs
export function searchJobs({
  query,
  type,
  location,
  experience,
  page = 1,
  limit = 6,
}: SearchParams): JobsResponse {
  let filteredJobs = [...jobs];

  // Search by query (title, company, or description)
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter by job type
  if (type && type.length > 0) {
    filteredJobs = filteredJobs.filter((job) => type.includes(job.type));
  }

  // Filter by location
  if (location) {
    const lowerLocation = location.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(lowerLocation)
    );
  }

  // Filter by experience level
  if (experience && experience.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      experience.includes(job.experience)
    );
  }

  // Calculate pagination
  const total = filteredJobs.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedJobs = filteredJobs.slice(start, end);

  return {
    jobs: paginatedJobs,
    total,
  };
}

// Get all job types
export function getJobTypes(): JobType[] {
  return ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
}

// Get all experience levels
export function getExperienceLevels(): ExperienceLevel[] {
  return ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
}

// Get all locations (unique)
export function getLocations(): string[] {
  const locations = new Set(jobs.map((job) => job.location));
  return Array.from(locations);
}
