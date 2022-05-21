import React from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { useState } from 'react';
import { JourneyDetail } from '../JourneyDetail';

export const Home = ({ onJourneyChange, data }) => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (data) => setJourney(data);

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? <JourneyDetail journey={journey} /> : null}
    </main>
  );
};
