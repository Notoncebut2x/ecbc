import { CalendarEvent } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  addDays, 
  subDays, 
  getDay,
  addMonths,
  getDaysInMonth 
} from 'date-fns';

export function getCurrentOccurrence(event: CalendarEvent, today: Date): Date | null {
  // ... existing getCurrentOccurrence logic ...
}

export function getPreviousOccurrence(event: CalendarEvent, today: Date): Date | null {
  // ... existing getPreviousOccurrence logic ...
}

export function getNextOccurrence(event: CalendarEvent, today: Date): Date | null {
  // ... existing getNextOccurrence logic ...
}

export function getFilteredEvents(
  events: CalendarEvent[],
  frequency: CalendarEvent['frequency'] | null,
  location: string | null
) {
  return events.filter(event => {
    const matchesLocation = !location || event.location === location;
    const matchesFrequency = !frequency || event.frequency === frequency;
    return matchesLocation && matchesFrequency;
  });
} 