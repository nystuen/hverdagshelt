// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import L from 'leaflet'
import { Button } from 'react-bootstrap';
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

export class MapComponent extends Component<{}, State> {

  constructor (props){
    super(props);

    this.state = {
      hasLocation: false,
      address: "",
      latlng: {
          lat: 65.107877,
          lng: 12.074429
      },
      zoom: 5
    };

      this.handleMapClick = this.handleMapClick.bind(this);
      this.handleClick = this.handleClick.bind(this);

  }

  mapRef = createRef<Map>();

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;

    if(map != null) {
      map.locate()
    }
  }



  handleMapClick = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
      zoom: 17
    });

    Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
      response => {
        const address_found = response.results[0].formatted_address;
        this.setState({
          hasLocation: true,
          latlng: e.latlng,
          address: address_found
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  handleLocationFound = (e: Object) => {
    Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
      response => {
        const address_found = response.results[0].formatted_address;
        this.setState({
          hasLocation: true,
          latlng: e.latlng,
          address: address_found,
          zoom: 15
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  onChange = (e: Object) => {
    this.setState({
      address: e.target.value
    });
  }

  handleClick = (e: Object) => {
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latlng: {lat,lng},
          zoom: 17,
          hasLocation: true
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {

    let styles = {
      height: '100%'
    }

    let mapStyle = {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
    }

    let marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>{this.state.address}</Popup>
      </Marker>
    ): null

    return (
      <div style={styles}>
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
        <div className="choice-map-container">
          <div className="choice-map">
            <input className="input-map" placeholder="Adresse, by" onChange={this.onChange.bind(this)} value={this.state.address}></input>
            <Button bsStyle="success" onClick={this.handleClick}>Meld feil</Button>
          </div>
        </div>
      </div>
    )
  }
}
