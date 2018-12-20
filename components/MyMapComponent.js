import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

const DEFAULT_CENTER = { lat: 25.049845, lng: 121.571885 }

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={DEFAULT_CENTER}
    center={{ lat: props.pos.lat, lng: props.pos.lng }}
  >
    {props.markers.map(item => (
      <Marker key={item.sno} position={{ lat: +item.lat, lng: +item.lng }} />
    ))}
  </GoogleMap>
))

export default MyMapComponent
