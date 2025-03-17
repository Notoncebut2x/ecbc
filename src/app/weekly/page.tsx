'use client';

import { events } from '@/data/events';
import Calendar from '@/components/Calendar';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function WeeklyEvents() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const weeklyEvents = events.filter(event => event.frequency === 'weekly');
  const locations = Array.from(new Set(weeklyEvents.map(event => event.location))).sort();
  
  return (
    <Layout
      selectedFrequency="weekly"
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
    >
      <Calendar 
        events={events}
        selectedLocation={selectedLocation}
        selectedFrequency="weekly"
        onReset={() => setSelectedLocation(null)}
      />
    </Layout>
  );
}