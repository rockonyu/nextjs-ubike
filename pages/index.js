import React from 'react'
import fetch from 'isomorphic-unfetch'
import Head from '../components/Head'
import Nav from '../components/Nav'
import MyMapComponent from '../components/MyMapComponent'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pos: { lat: 25.049845, lng: 121.571885 } }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          this.setState({ pos })
        },
        function() {
          console.log('error!')
        },
      )
    } else {
      console.log('error!')
    }
  }

  static async getInitialProps({ req }) {
    const res = await fetch('https://data.taipei/youbike')
    const json = await res.json()

    const markers =
      json.retCode === 1 ? Object.values(json.retVal).map(item => item) : []
    console.log(markers)
    return { markers }
  }

  render() {
    return (
      <div>
        <Head title="Find Next Ubike" />
        <MyMapComponent pos={this.state.pos} markers={this.props.markers} />
        <Nav />
      </div>
    )
  }
}

export default Home
