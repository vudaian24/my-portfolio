import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FileText,
  Github,
  History,
  Home,
  Linkedin,
  Mail,
  PhoneCall,
  User,
} from "lucide-react";

export const SECTION_IDS = {
  home: "home",
  about: "about",
  experience: "experience",
  projects: "projects",
  resume: "resume",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS = [
  { href: `#${SECTION_IDS.home}`, labelKey: "home" as const, icon: Home },
  { href: `#${SECTION_IDS.about}`, labelKey: "about" as const, icon: User },
  {
    href: `#${SECTION_IDS.experience}`,
    labelKey: "experience" as const,
    icon: History,
  },
  {
    href: `#${SECTION_IDS.projects}`,
    labelKey: "projects" as const,
    icon: Briefcase,
  },
  {
    href: `#${SECTION_IDS.resume}`,
    labelKey: "resume" as const,
    icon: FileText,
  },
  { href: `#${SECTION_IDS.contact}`, labelKey: "contact" as const, icon: Mail },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/vudaian24",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/v%C5%A9-%C4%91%E1%BA%A1i-an-75110137b/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://zalo.me/0398270233",
    icon: PhoneCall,
    label: "Zalo",
  },
] as const satisfies ReadonlyArray<{
  href: string;
  icon: LucideIcon;
  label: string;
}>;

/** Ordered language -> frontend -> backend -> data -> cloud & devops */
export const SKILL_KEYS = [
  "typescript",
  "javascript",
  "python",
  "nextjs",
  "react",
  "vue",
  "tailwind",
  "nestjs",
  "node",
  "langchain",
  "postgresql",
  "mongodb",
  "redis",
  "aws",
  "terraform",
  "docker",
  "kubernetes",
  "githubActions",
  "linux",
] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];

export const PROJECT_IDS = [
  "kotae",
  "starlive",
  "ercBooking",
  "portfolio",
  "hrm",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export type ProjectConfig = {
  id: ProjectId;
  /** Omit for client/internal work with no public URL — the card renders non-interactive */
  href?: string;
  external?: boolean;
  tags?: readonly string[];
};

export const PROJECTS: readonly ProjectConfig[] = [
  {
    id: "kotae",
    href: "https://kotae.ai/",
    external: true,
    tags: [
      "Next.js",
      "Nest.js",
      "TypeScript",
      "MongoDB",
      "LangChain",
      "OpenAI",
      "AWS",
    ],
  },
  {
    id: "starlive",
    tags: [
      "Next.js",
      "Nest.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Tencent RTC",
      "AWS",
    ],
  },
  {
    id: "ercBooking",
    tags: [
      "React",
      "Nest.js",
      "TypeScript",
      "Terraform",
      "AWS",
      "PostgreSQL",
      "GitHub Actions",
    ],
  },
  {
    id: "portfolio",
    href: "https://github.com/vudaian24/my-portfolio",
    external: true,
    tags: [
      "Next.js",
      "TypeScript",
      "Docker",
      "Nginx",
      "GitHub Actions",
      "Telegram",
    ],
  },
  {
    id: "hrm",
    tags: ["Vue 3", "TypeScript", "Nest.js", "MySQL"],
  },
] as const;

export const CV_PATH = "/cv.pdf";

export const CONTACT_API_PATH = "/web-api/contact";

export const EXPERIENCE_IDS = ["softwareEngineer", "softwareIntern"] as const;

export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export type ExperienceConfig = {
  id: ExperienceId;
  current?: boolean;
  tags?: readonly string[];
};

/** Reverse-chronological work timeline */
export const EXPERIENCE_ITEMS: readonly ExperienceConfig[] = [
  {
    id: "softwareEngineer",
    current: true,
    tags: [
      "Next.js",
      "Nest.js",
      "TypeScript",
      "AWS",
      "Terraform",
      "GitHub Actions",
    ],
  },
  {
    id: "softwareIntern",
    tags: ["Vue 3", "TypeScript", "Nest.js", "MongoDB"],
  },
] as const;
