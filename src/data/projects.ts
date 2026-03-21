/**
 * projects.ts — project data for Evidence Board section
 *
 * File: src/data/projects.ts
 */

export type ProjectStatus   = "CLASSIFIED" | "ACTIVE" | "ARCHIVED" | "REDACTED";
export type ProjectCategory = "WEB" | "MOBILE" | "3D" | "FULLSTACK" | "DESIGN" | "EXPERIMENT";

export interface Project {
  id:          string;
  codename:    string;
  title:       string;
  description: string;
  category:    ProjectCategory;
  status:      ProjectStatus;
  year:        number;
  stack:       string[];
  url?:        string;
  github?:     string;
  thumbnail?:  string;  // path to image in /public, e.g. "/projects/thumb1.jpg"
  featured:    boolean;
}

export const projects: Project[] = [
  {
    id:          "fleet-management",
    codename:    "OPERATION-FLEET",
    title:       "The Fleet Management",
    description: "Real-time intelligence and tracking visualization platform. Designed for high scalability and complex logistics oversight.",
    category:    "FULLSTACK",
    status:      "ACTIVE",
    year:        2026,
    stack:       ["Next.js", "TypeScript", "PostgreSQL"],
    url:         "https://www.thefleetfly.xyz/login",
    thumbnail:   "/projects/thumb1.jpg",
    featured:    true,
  },
  {
    id:          "exam-authenticator",
    codename:    "OPERATION-EXAM",
    title:       "Exam Authenticator",
    description: "Secure examination identity verification system.",
    category:    "WEB",
    status:      "ACTIVE",
    year:        2024,
    stack:       ["React", "Node.js", "Express", "MongoDB"],
    url:         "https://github.com/Ayush9924/exam.git",
    github:      "https://github.com/Ayush9924/exam.git",
    thumbnail:   "/projects/thumb2.jpg",
    featured:    true,
  },
  {
    id:          "my-portfolio",
    codename:    "OPERATION-PORTFOLIO",
    title:       "My Portfolio",
    description: "Interactive cyber-investigation themed personal portfolio.",
    category:    "WEB",
    status:      "ACTIVE",
    year:        2026,
    stack:       ["Next.js", "React", "Tailwind CSS"],
    url:         "#",
    github:      "https://github.com/Ayush9924",
    thumbnail:   "/projects/thumb3.jpg",
    featured:    false,
  },
  {
    id:          "cpu-scheduler",
    codename:    "OPERATION-SCHEDULER",
    title:       "Cpu Scheduler",
    description: "Operating system CPU scheduling algorithm visualizer and simulator.",
    category:    "FULLSTACK",
    status:      "ACTIVE",
    year:        2023,
    stack:       ["React", "Node"],
    url:         "https://github.com/Ayush9924/CPUSheduling.git",
    github:      "https://github.com/Ayush9924/CPUSheduling.git",
    thumbnail:   "/projects/thumb4.jpg",
    featured:    false,
  },
  {
    id:          "edtech-system",
    codename:    "OPERATION-EDTECH",
    title:       "EDtech System",
    description: "Comprehensive educational technology platform for remote learning and student management.",
    category:    "FULLSTACK",
    status:      "ACTIVE",
    year:        2025,
    stack:       ["React", "Node.js", "Database"],
    url:         "https://www.etechniketan.com/",
    thumbnail:   "/projects/thumb5.jpg",
    featured:    true,
  },
  {
    id:          "acebank",
    codename:    "OPERATION-ACEBANK",
    title:       "AceBank",
    description: "Secure digital banking application clone.",
    category:    "WEB",
    status:      "ACTIVE",
    year:        2024,
    stack:       ["React", "Tailwind CSS"],
    url:         "https://github.com/Ayush9924/AceBank.git",
    github:      "https://github.com/Ayush9924/AceBank.git",
    thumbnail:   "/projects/thumb6.jpg",
    featured:    false,
  },
];
