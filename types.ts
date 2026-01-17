import gsap from 'gsap';

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface AnimationContextProps {
  timeline: gsap.core.Timeline | null;
}
