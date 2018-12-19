import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.current.lat, lng: props.current.lng }}
  >
    {props.markers.map(item => (
      <Marker key={item.sno} position={{ lat: +item.lat, lng: +item.lng }} />
    ))}
  </GoogleMap>
))

export default MyMapComponent
