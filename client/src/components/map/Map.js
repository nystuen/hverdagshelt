// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import L from 'leaflet'

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
          lat: 63.43075,
          lng: 10.394906
      },
      zoom: 12
    };

      this.handleMapClick = this.handleMapClick.bind(this);

  }


  componentDidMount() {
    const map = this.mapRef.current.leafletElement;

    if(map != null) {
      map.locate()
    }

    var geocodeService = new ELG.geocodeService();
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map)

    searchControl.on('results', (data) => {
      results.clearLayers()
      this.setState({
        latlng: data.results[0].latlng,
        zoom: 17
      })
    })
  }

  mapRef = createRef<Map>()

  handleMapClick = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
      zoom: 17
    })


    const map = this.mapRef.current.leafletElement;
    var markers = new L.LayerGroup().addTo(map)
    var markerLatLng
    var markerAdress
    console.log(this.state)
    var geocodeService = new ELG.geocodeService();
    geocodeService.reverse().latlng(e.latlng).run((error, result) => {
      this.setState({
        latlng: result.latlng,
        address: result.address.LongLabel
      })
      //L.marker(result.latlng).addTo(map).bindPopup(result.address.LongLabel).openPopup();
    });
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
        <Popup open={true}>{this.state.address}</Popup>
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
