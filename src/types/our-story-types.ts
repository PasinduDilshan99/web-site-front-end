// Icon types and data interfaces
import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  storyId: number;
  yearLabel: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  orderNo: number;
}

export interface CoreValue {
  valueId: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  orderNo: number;
}

export interface OurStoryData {
  timelines: TimelineItem[];
  coreValues: CoreValue[];
}

export interface OurStoryApiResponse {
  code: number;
  status: string;
  message: string;
  data: OurStoryData;
  timestamp: string;
}

// Color mapping type for Tailwind CSS classes
export interface ColorClasses {
  bg: string;
  text: string;
  border?: string;
  bgLight: string;
  gradient?: string;
}

export type ColorMap = Record<string, ColorClasses>;