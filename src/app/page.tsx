'use client';

import { useState } from 'react';
import Calendar from '@/components/Calendar';
import Layout from '@/components/Layout';
import { events } from '@/data/events';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const locations = Array.from(new Set(events.map(event => event.location))).sort();

  return (
    <Layout
      selectedFrequency="all"
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
    >
      <Calendar 
        events={events}
        selectedLocation={selectedLocation}
        selectedFrequency={null}
        onReset={() => setSelectedLocation(null)}
      />
    </Layout>
  );
} 