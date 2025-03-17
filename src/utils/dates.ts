import { CalendarEvent, MonthlyPattern, WeekOfMonth } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  addDays, 
  subDays, 
  getDay,
  addMonths,
  getDaysInMonth,
  subMonths
} from 'date-fns';

export function getCurrentOccurrence(event: CalendarEvent, today: Date): Date | null {
  if (event.frequency === 'annual') {
    return new Date(event.date);
  }

  const currentDate = new Date(today);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (event.frequency === 'monthly' && event.recurringPattern) {
    const targetDayOfWeek = event.recurringPattern.dayOfWeek;
    const monthlyPattern = event.recurringPattern as MonthlyPattern;
    const weekOfMonth = monthlyPattern.weekOfMonth;
    
    let date = startOfMonth(new Date(currentYear, currentMonth));
    
    while (getDay(date) !== targetDayOfWeek) {
      date = addDays(date, 1);
    }

    if (weekOfMonth) {
      if (weekOfMonth === 'last') {
        date = endOfMonth(new Date(currentYear, currentMonth));
        while (getDay(date) !== targetDayOfWeek) {
          date = subDays(date, 1);
        }
      } else {
        const weekMap: Record<Exclude<WeekOfMonth, 'last'>, number> = {
          first: 0,
          second: 1,
          third: 2,
          fourth: 3
        };
        if (weekOfMonth in weekMap) {
          date = addDays(date, weekMap[weekOfMonth as Exclude<WeekOfMonth, 'last'>] * 7);
        }
      }
    }

    return date;
  } else if (event.frequency === 'weekly' && event.recurringPattern) {
    let date = new Date(currentYear, currentMonth, currentDate.getDate());
    const targetDayOfWeek = event.recurringPattern.dayOfWeek;
    
    const currentDayOfWeek = getDay(date);
    const diff = targetDayOfWeek - currentDayOfWeek;
    date = addDays(date, diff);
    
    if (date < today) {
      date = addDays(date, 7);
    }

    return date;
  }

  return null;
}

export function getPreviousOccurrence(event: CalendarEvent, today: Date): Date | null {
  const currentOccurrence = getCurrentOccurrence(event, today);
  if (!currentOccurrence) return null;

  if (event.frequency === 'monthly') {
    return subMonths(currentOccurrence, 1);
  } else if (event.frequency === 'weekly') {
    return subDays(currentOccurrence, 7);
  }

  return null;
}

export function getNextOccurrence(event: CalendarEvent, today: Date): Date | null {
  const currentOccurrence = getCurrentOccurrence(event, today);
  if (!currentOccurrence) return null;

  if (event.frequency === 'monthly') {
    return addMonths(currentOccurrence, 1);
  } else if (event.frequency === 'weekly') {
    return addDays(currentOccurrence, 7);
  }

  return null;
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