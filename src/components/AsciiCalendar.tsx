'use client';

import React, { useMemo, useState } from 'react';
import { CalendarEvent, ProcessedEvent } from '@/types/calendar';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  isSameDay,
  getDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfDay
} from 'date-fns';

interface AsciiCalendarProps {
  events: CalendarEvent[];
  selectedLocation: string | null;
  selectedFrequency: CalendarEvent['frequency'] | null;
}

type ViewMode = 'month' | 'week';

export default function AsciiCalendar({ events, selectedLocation, selectedFrequency }: AsciiCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  // Process events similar to main Calendar component
  const processedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

        // For recurring events, we'll show them for the current period
        const results = [];
        const currentDate = new Date();
        
        if (event.frequency === 'monthly' && event.recurringPattern) {
          const targetDayOfWeek = event.recurringPattern.dayOfWeek;
          const weekOfMonth = event.recurringPattern.weekOfMonth;
          
          // Calculate for current month
          let date = startOfMonth(currentDate);
          while (getDay(date) !== targetDayOfWeek) {
            date = addDays(date, 1);
          }

          if (weekOfMonth) {
            if (weekOfMonth === 'last') {
              date = endOfMonth(currentDate);
              while (getDay(date) !== targetDayOfWeek) {
                date = addDays(date, -1);
              }
            } else {
              const weekMap: Record<Exclude<typeof weekOfMonth, 'last'>, number> = {
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

          results.push({
            ...event,
            displayDate: date,
            isRecurring: true
          });
        } else if (event.frequency === 'weekly' && event.recurringPattern) {
          const targetDayOfWeek = event.recurringPattern.dayOfWeek;
          const currentDayOfWeek = getDay(currentDate);
          const diff = targetDayOfWeek - currentDayOfWeek;
          let date = addDays(currentDate, diff);
          
          if (date < today) {
            date = addDays(date, 7);
          }

          results.push({
            ...event,
            displayDate: date,
            isRecurring: true
          });
        }

        return results;
      });
  }, [events, selectedLocation, selectedFrequency]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return processedEvents.filter(event => 
      isSameDay(event.displayDate, date)
    );
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const start = viewMode === 'month' 
      ? startOfWeek(startOfMonth(currentDate))
      : startOfWeek(currentDate);
    const end = viewMode === 'month'
      ? endOfWeek(endOfMonth(currentDate))
      : endOfWeek(currentDate);

    const days = [];
    let day = start;

    while (day <= end) {
      const dayEvents = getEventsForDate(day);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const isToday = isSameDay(day, new Date());
      
      days.push({
        date: day,
        events: dayEvents,
        isCurrentMonth,
        isToday
      });
      
      day = addDays(day, 1);
    }

    return days;
  };

  const calendarDays = generateCalendarGrid();

  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      setCurrentDate(direction === 'prev' 
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1)
      );
    } else {
      setCurrentDate(direction === 'prev'
        ? subWeeks(currentDate, 1)
        : addWeeks(currentDate, 1)
      );
    }
  };

  const formatHeader = () => {
    if (viewMode === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-sm font-['Courier_New']">
      {/* Header with navigation and view toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateCalendar('prev')}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            ←
          </button>
          <h2 className="text-lg font-bold">{formatHeader()}</h2>
          <button
            onClick={() => navigateCalendar('next')}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            →
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 text-xs border ${
              viewMode === 'week' 
                ? 'bg-red-500 text-white border-red-500' 
                : 'border-gray-300 hover:border-red-500'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 text-xs border ${
              viewMode === 'month' 
                ? 'bg-red-500 text-white border-red-500' 
                : 'border-gray-300 hover:border-red-500'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-300">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-300">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-bold bg-gray-50 border-r border-gray-300 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-300 last:border-r-0 ${
                !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
              } ${day.isToday ? 'bg-red-50' : ''}`}
            >
              <div className={`text-sm font-bold mb-1 ${
                day.isToday ? 'text-red-600' : day.isCurrentMonth ? 'text-black' : 'text-gray-400'
              }`}>
                {format(day.date, 'd')}
              </div>
              
              {day.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="text-xs text-red-500 font-bold leading-tight mb-1 truncate"
                  title={`${event.title} - ${event.location}`}
                >
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => {
                        // Track the click for analytics
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'click', {
                            event_category: 'Event',
                            event_label: event.title,
                            value: event.location
                          });
                        }
                      }}
                    >
                      {event.title}
                    </a>
                  ) : (
                    event.title
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ASCII Art Footer */}
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
