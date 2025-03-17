'use client';

import React, { useMemo, memo } from 'react';
import { CalendarEvent, WeekOfMonth, ProcessedEvent } from '@/types/calendar';
import { 
  format, 
  addDays, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  setDay, 
  isBefore, 
  isAfter, 
  addMonths, 
  subMonths,
  getWeeksInMonth,
  getDay,
  getDaysInMonth
} from 'date-fns';

interface CalendarProps {
  events: CalendarEvent[];
  selectedLocation: string | null;
  selectedFrequency: CalendarEvent['frequency'] | null;
  onReset: () => void;
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

function getCurrentOccurrence(event: CalendarEvent, today: Date): Date | null {
  if (!isValidDate(today)) return null;
  
  if (event.frequency === 'annual') {
    return new Date(event.date);
  }

  const currentDate = new Date(today);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (event.frequency === 'monthly' && event.recurringPattern) {
    // Get the target day of week (0-6)
    const targetDayOfWeek = event.recurringPattern.dayOfWeek;
    const weekOfMonth = event.recurringPattern.weekOfMonth;
    
    // Start at the beginning of the month
    let date = startOfMonth(new Date(currentYear, currentMonth));
    
    // Move to the first occurrence of the target day
    while (getDay(date) !== targetDayOfWeek) {
      date = addDays(date, 1);
    }

    // For specific week of month
    if (weekOfMonth) {
      if (weekOfMonth === 'last') {
        // Start from the end of the month and work backwards
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
          date = addDays(date, weekMap[weekOfMonth as keyof typeof weekMap] * 7);
        }
      }
    }

    return date;
  } else if (event.frequency === 'weekly' && event.recurringPattern) {
    // Get current week's occurrence of the target day
    let date = new Date(currentYear, currentMonth, currentDate.getDate());
    const targetDayOfWeek = event.recurringPattern.dayOfWeek;
    
    // Adjust to the current week's occurrence
    const currentDayOfWeek = getDay(date);
    const diff = targetDayOfWeek - currentDayOfWeek;
    date = addDays(date, diff);
    
    // If we've moved to a past date, get next week's occurrence
    if (date < today) {
      date = addDays(date, 7);
    }

    return date;
  }

  return null;
}

function getPreviousOccurrence(event: CalendarEvent, today: Date): Date | null {
  const currentOccurrence = getCurrentOccurrence(event, today);
  if (!currentOccurrence) return null;

  if (event.frequency === 'monthly') {
    return subMonths(currentOccurrence, 1);
  } else if (event.frequency === 'weekly') {
    return subDays(currentOccurrence, 7);
  }

  return null;
}

function getNextOccurrence(event: CalendarEvent, today: Date): Date | null {
  const currentOccurrence = getCurrentOccurrence(event, today);
  if (!currentOccurrence) return null;

  if (event.frequency === 'monthly') {
    return addMonths(currentOccurrence, 1);
  } else if (event.frequency === 'weekly') {
    return addDays(currentOccurrence, 7);
  }

  return null;
}

export default function Calendar({ events, selectedLocation, selectedFrequency, onReset }: CalendarProps) {
  // Memoize the today date to prevent unnecessary recalculations
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // Memoize the filtered and processed events
  const processedEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesLocation = !selectedLocation || event.location === selectedLocation;
        const matchesFrequency = !selectedFrequency || event.frequency === selectedFrequency;
        return matchesLocation && matchesFrequency;
      })
      .flatMap(event => {
        if (event.frequency === 'annual') {
          return [{
            ...event,
            displayDate: new Date(event.date),
            isRecurring: false
          }];
        }

        const results = [];
        const currentOccurrence = getCurrentOccurrence(event, today);
        const prevOccurrence = getPreviousOccurrence(event, today);
        const nextOccurrence = getNextOccurrence(event, today);

        if (prevOccurrence) {
          results.push({
            ...event,
            displayDate: prevOccurrence,
            isRecurring: true,
            occurrenceType: 'previous'
          });
        }

        if (currentOccurrence) {
          results.push({
            ...event,
            displayDate: currentOccurrence,
            isRecurring: true,
            occurrenceType: 'current'
          });
        }

        if (nextOccurrence) {
          results.push({
            ...event,
            displayDate: nextOccurrence,
            isRecurring: true,
            occurrenceType: 'next'
          });
        }

        return results;
      });
  }, [events, selectedLocation, selectedFrequency, today]);

  // Memoize the sorted events
  const { sortedEvents, nextUpcomingEvent } = useMemo(() => {
    const [futureEvents, pastEvents] = processedEvents.reduce((acc, event) => {
      acc[event.displayDate >= today ? 0 : 1].push(event);
      return acc;
    }, [[], []] as [typeof processedEvents, typeof processedEvents]);

    return {
      sortedEvents: [
        ...futureEvents.sort((a: ProcessedEvent, b: ProcessedEvent) => b.displayDate.getTime() - a.displayDate.getTime()),
        ...pastEvents.sort((a: ProcessedEvent, b: ProcessedEvent) => b.displayDate.getTime() - a.displayDate.getTime())
      ],
      nextUpcomingEvent: futureEvents.sort((a, b) => a.displayDate.getTime() - b.displayDate.getTime())[0] || null
    };
  }, [processedEvents, today]);

  return (
    <div className="w-full max-w-2xl mx-auto text-lg font-['Courier_New']">
      <ul className="list-none p-0 space-y-4">
        {sortedEvents.map((event) => {
          const isPast = event.displayDate < today;
          const isNextUpcoming = nextUpcomingEvent && 
            event.displayDate.getTime() === nextUpcomingEvent.displayDate.getTime() &&
            event.id === nextUpcomingEvent.id;

          return (
            <EventItem 
              key={`${event.id}-${(event as ProcessedEvent).occurrenceType || 'single'}`}
              event={event}
              isPast={isPast}
              isNextUpcoming={isNextUpcoming}
            />
          );
        })}
      </ul>
      <div className="mt-8">
        <pre className="text-center select-none text-[0.5rem] leading-[0.5rem]">
          {'   \\  /   \\  /   \\  /   \\  /   \\  /  \n'}
          {'---///----///----///----///----///---\n'}
          {'  /  \\   /  \\   /  \\   /  \\   /  \\  '}
        </pre>
      </div>
    </div>
  );
}

// Memoize the EventItem component to prevent unnecessary re-renders
const EventItem = memo(function EventItem({ event, isPast, isNextUpcoming }: { event: ProcessedEvent, isPast: boolean, isNextUpcoming: boolean }) {
  return (
    <li 
      className={`transition-all duration-300 relative ${
        isPast ? 'text-gray-400' : 'text-black'
      } ${
        isNextUpcoming ? 'after:content-[""] after:absolute after:left-[20%] after:right-[20%] after:bottom-0 after:h-[3px] after:bg-red-500/80 after:rotate-[358deg] after:-z-10' : ''
      }`}
    >
      {format(event.displayDate, 'MMMM d, yyyy')}: {event.link ? (
        <a 
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`rotate-hover ${isPast ? 'text-red-300 hover:text-red-400' : 'text-red-500 hover:text-red-600'}`}
        >
          {event.title}
        </a>
      ) : (
        event.title
      )}
      <br />
      <span className="text-[0.75em]">{event.location}</span>
    </li>
  );
}); 