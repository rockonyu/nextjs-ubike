import React, { useState } from 'react';
import UbikeMap from './components/UbikeMap';

type PositionStates = {
  lat: number;
  lng: number;
  heading: number | null;
};

const App: React.FC = () => {
  const [position, setPosition] = useState<PositionStates>({
    lat: 25.049845,
    lng: 121.571885,
    heading: null,
  });

  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const onSuccess = (pos: Position) => {
      const crd = pos.coords;
      setPosition({
        lat: crd.latitude,
        lng: crd.longitude,
        heading: crd.heading,
      });
    };
    const onError = (err: PositionError) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }
  return (
    <div className="App">
      <UbikeMap pos={position} />
      <p style={{ padding: '5px 15px' }}>
        {`latitude: ${position.lat.toFixed(
          5
        )}, longitude: ${position.lng.toFixed(5)}, heading: ${
          position.heading
        }`}
      </p>
    </div>
  );
};

export default App;
