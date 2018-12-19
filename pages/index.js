import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import MyMapComponent from '../components/MyMapComponent'
import fetch from 'isomorphic-unfetch'

const Home = props => {
  return (
    <div>
      <Head title="Home" />
      <Nav />
      <MyMapComponent
        current={{ lat: 25.049845, lng: 121.571885 }}
        markers={props.markers}
      />
    </div>
  )
}

Home.getInitialProps = async ({ req }) => {
  const res = await fetch('https://data.taipei/youbike')
  const json = await res.json()

  const markers =
    json.retCode === 1 ? Object.values(json.retVal).map(item => item) : []
  console.log(markers)
  return { markers }
}

export default Home
