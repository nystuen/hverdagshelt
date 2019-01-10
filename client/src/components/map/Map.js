// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import Search from './Search'

type State = {
  hasLocation: boolean,
  latlng: {
    lat: number,
    lng: number,
  },
}

export class MapComponent extends Component<{}, State> {

  state = {
    hasLocation: false,
    latlng: {
        lat: 63.43075,
        lng: 10.394906
    },
  }

  componentDidMount() {
    const map = this.mapRef.current
    if(map != null) {
      map.leafletElement.locate()
    }
  }

  mapRef = createRef<Map>()

  handleMapClick = (e: Object) => {
    console.log('MapClick')
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    })
  }

  handleSearchClick = (e: Object) => {
    e.stopPropagation()
    console.log('SearchClick')
  }

  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    })
  }

  render() {

    let styles = {
      height: '100%'
    }

    let marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
      </Marker>
    ): null

    const GeoSearch = withLeaflet(Search)

    return (
      <div className="test" onClick={this.handleSearchClick} style={styles}>
        <Map
          center={this.state.latlng}
          length={12}
          onClick={this.handleMapClick}
          onLocationFound={this.handleLocationFound}
          ref={this.mapRef}
          minZoom={8}
          maxZoom={19}
          zoom={15}
        >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoSearch
              onClick={this.handleSearchClick}
            />
            {marker}
          </Map>
      </div>
    )
  }
}
