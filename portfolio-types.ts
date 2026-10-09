/**
 * Type definitions for portfolio configuration
 * Keep in sync with portfolio-config.json
 */

export interface PersonalInfo {
  fullName: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  profilePicture: string;
  tagline: string;
}

export interface SocialLink {
  github?: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;
}

export interface MarqueeItem {
  label: string;
}

export interface Project {
  number: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  accent: string;
  liveDemo: string;
  github: string;
  screenshots?: string[];
}

export interface ExperienceEntry {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
  institutionFull: string;
  achievement: string;
}

export interface SkillsGroup {
  intelligence: string[];
  interfaces: string[];
  infrastructure: string[];
}

export interface ContactInfo {
  preferredEmail: string;
  resumePath: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  socialLinks: SocialLink;
  marquee: MarqueeItem[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillsGroup;
  certifications: any[];
  contact: ContactInfo;
}