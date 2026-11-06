export type StepState = 0 | 1 | 2;

export interface BlobConfig {
  id: string;
  color1: string;
  color2: string;
  duration?: string;
  delay?: string;
  size?: string; 
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface BlobProps {
  color1: string;
  color2: string;
  $duration?: string;
  style?: React.CSSProperties;
}

export interface BlobConfig {
  id: string;
  color1: string;
  color2: string;
  duration?: string;   // e.g., '18s'
  delay?: string;      // e.g., '-4s'
  size?: string;       // e.g., '400px' or 'clamp(...)'
  blur?: string;       // e.g., '60px'
}

export interface BlobProps {
  color1: string;
  color2: string;
  $duration?: string;
  $blur?: string;
  style?: React.CSSProperties;
}