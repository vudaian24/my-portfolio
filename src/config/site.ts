import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  PhoneCall,
  User,
} from "lucide-react";

export const SECTION_IDS = {
  home: "home",
  about: "about",
  projects: "projects",
  resume: "resume",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS = [
  { href: `#${SECTION_IDS.home}`, labelKey: "home" as const, icon: Home },
  { href: `#${SECTION_IDS.about}`, labelKey: "about" as const, icon: User },
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

export const SKILL_KEYS = [
  "react",
  "nextjs",
  "typescript",
  "node",
  "tailwind",
  "framer",
  "git",
] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];

export const PROJECT_IDS = ["portfolio", "taskApp"] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export type ProjectConfig = {
  id: ProjectId;
  href: string;
  external?: boolean;
};

/** Update href when demo/repo URLs are ready */
export const PROJECTS: readonly ProjectConfig[] = [
  { id: "portfolio", href: "#", external: false },
  { id: "taskApp", href: "#", external: false },
] as const;

export const CV_PATH = "/cv.pdf";

export const CONTACT_API_PATH = "/web-api/contact";
