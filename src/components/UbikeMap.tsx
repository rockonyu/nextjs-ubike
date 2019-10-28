import React, { useState, useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

type Props = {
  pos: { lat: number; lng: number };
};

type MarkerStates = {
  sno: string;
  lat: string;
  lng: string;
};

const DEFAULT_CENTER = { lat: 25.049845, lng: 121.571885 };

const UbikeMap = compose<Props, Props>(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [markers, setMarkers] = useState<MarkerStates[]>([]);
  const fetchData = async () => {
    const res = await fetch(
      'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json'
    );
    const json = await res.json();
    if (json.retCode === 1) {
      setMarkers(Object.values(json.retVal));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={DEFAULT_CENTER}
      center={{ lat: props.pos.lat, lng: props.pos.lng }}
    >
      {markers.map(item => (
        <Marker key={item.sno} position={{ lat: +item.lat, lng: +item.lng }} />
      ))}
    </GoogleMap>
  );
});

export default UbikeMap;
