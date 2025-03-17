'use client';

import { events } from '@/data/events';
import Calendar from '@/components/Calendar';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function MonthlyEvents() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const monthlyEvents = events.filter(event => event.frequency === 'monthly');
  const locations = Array.from(new Set(monthlyEvents.map(event => event.location))).sort();
  
  return (
    <Layout
      selectedFrequency="monthly"
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
    >
      <Calendar 
        events={events}
        selectedLocation={selectedLocation}
        selectedFrequency="monthly"
        onReset={() => setSelectedLocation(null)}
      />
    </Layout>
  );
}