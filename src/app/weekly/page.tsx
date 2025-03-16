'use client';

import { events } from '@/data/events';
import Calendar from '@/components/Calendar';
import { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';

export default function WeeklyEvents() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const weeklyEvents = events.filter(event => event.frequency === 'weekly');
  const locations = Array.from(new Set(weeklyEvents.map(event => event.location))).sort();
  
  return (
    <main className="min-h-screen p-8">
      <div className="w-full max-w-2xl mx-auto text-lg font-['Courier_New']">
        <h1 className="text-center mb-4 text-[1.75rem] font-bold">
          <a href="/" className="cursor-pointer hover:opacity-80">
            East Coast ⚡ Bike Calendar
          </a>
        </h1>

        <div className="text-center space-y-2 mb-4">
          <div className="space-x-4">
            <a href="/" className="px-2">All</a>
            <a href="/annual" className="px-2">Annual</a>
            <a href="/monthly" className="px-2">Monthly</a>
            <a href="/weekly" className="px-2 font-bold underline">Weekly</a>
          </div>

          <div className="space-x-4">
            {locations.map(location => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location === selectedLocation ? null : location)}
                className={`px-2 ${selectedLocation === location ? 'font-bold underline' : ''}`}
              >
                {location.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <pre className="text-center mb-8 select-none text-[0.5rem] leading-[0.5rem]">{'   \\  /   \\  /   \\  /   \\  /   \\  /  \n---///----///----///----///----///---\n  /  \\   /  \\   /  \\   /  \\   /  \\  '}</pre>
        </div>

        <Calendar 
          events={events}
          selectedLocation={selectedLocation}
          selectedFrequency="weekly"
          onReset={() => setSelectedLocation(null)}
        />
      </div>
    </main>
  );
}