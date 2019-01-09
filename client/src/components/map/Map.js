// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

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

  handleClick = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    })
    //const map = this.mapRef.current
    //if(map != null) {
    //  map.leafletElement.locate()
    //}
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

    return (
      <div className="test" style={styles}>
        <Map
          center={this.state.latlng}
          length={12}
          onClick={this.handleClick}
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
          {marker}
        </Map>
      </div>
    )
  }
}
