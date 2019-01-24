// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Circle, Popup, withLeaflet } from 'react-leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import L from 'leaflet'
import { Button, Col, Row } from 'react-bootstrap';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDVZREoJuiobrxWVmBFhemEk1VdRB0MsSI");

type State = {
  hasLocation: boolean,
  address: string,
  latlng: {
    lat: number,
    lng: number,
  },
  zoom: number
}

export class EventMapComponent extends Component<{markers: string[]}> {
  constructor (props){
    super(props);

    this.state = {
      hasLocation: true,
      address: "",
      latlng: {
          lat: this.props.markers[0],
          lng: this.props.markers[1]
      },
      zoom: 14
    };
  }

  mapRef = createRef<Map>()

  render() {
    let markers = this.props.markers
    console.log("Hello", markers)

    let marker = this.state.hasLocation ? (
      <Circle center={this.state.latlng} radius={200}>
        <Popup>{this.state.address}</Popup>
      </Circle>
    ): null


    let mapStyle = {
      height: '50vh',
      width: '80%'
    }


    return (
      <div id="containme">
        <Map
          center={this.state.latlng}
          length={12}
          onClick={this.handleMapClick}
          onLocationFound={this.handleLocationFound}
          ref={this.mapRef}
          zoom={this.state.zoom}
          doubleClickZoom= {true}
          style={mapStyle}
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
