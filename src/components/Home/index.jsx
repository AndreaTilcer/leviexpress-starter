import React from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { useState } from 'react';

export const Home = ({ onJourneyChange, data }) => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (data) => setJourney(data);

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? (
        <p>Nalezeno spojení s id {journey.journeyId}.</p>
      ) : (
        true
      )}
    </main>
  );
};
