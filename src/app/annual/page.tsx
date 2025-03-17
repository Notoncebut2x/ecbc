'use client';

import { events } from '@/data/events';
import Calendar from '@/components/Calendar';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function AnnualEvents() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const annualEvents = events.filter(event => event.frequency === 'annual');
  const locations = Array.from(new Set(annualEvents.map(event => event.location))).sort();
  
  return (
    <Layout
      selectedFrequency="annual"
      locations={locations}
      selectedLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
    >
      <Calendar 
        events={events}
        selectedLocation={selectedLocation}
        selectedFrequency="annual"
        onReset={() => setSelectedLocation(null)}
      />
    </Layout>
  );
} 