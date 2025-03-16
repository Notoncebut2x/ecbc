import { z } from 'zod';

export const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().optional(),
  location: z.string(),
  description: z.string().optional(),
  link: z.string().url().optional(),
  frequency: z.enum(['annual', 'monthly', 'weekly']),
  recurringPattern: z.object({
    dayOfWeek: z.number().min(0).max(6),
    weekOfMonth: z.enum(['first', 'second', 'third', 'fourth', 'last']).optional(),
  }).optional(),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

export type WeekOfMonth = 'first' | 'second' | 'third' | 'fourth' | 'last';
export type Frequency = 'annual' | 'monthly' | 'weekly';

export interface RecurringPattern {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  weekOfMonth?: WeekOfMonth;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  link?: string;
  frequency: Frequency;
  recurringPattern?: RecurringPattern;
}

export interface ProcessedEvent extends CalendarEvent {
  displayDate: Date;
  isRecurring: boolean;
  occurrenceType?: 'previous' | 'current' | 'next';
}

export type CalendarEvents = CalendarEvent[]; 