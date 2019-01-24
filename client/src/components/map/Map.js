// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Circle, Popup, withLeaflet } from 'react-leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import L from 'leaflet'
import { Button, Col, Row } from 'react-bootstrap';
import NavLink from 'react-router-dom/es/NavLink';
import Nav from 'react-bootstrap/es/Nav';
import NavItem from 'react-bootstrap/es/NavItem';
import { UserService } from '../../services';
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

var greenIcon = new L.Icon({
	iconUrl: 'marker-icon-green.png',
  shadowUrl: 'marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'marker-icon-yellow.png',
	shadowUrl: 'marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});


var blueIcon = new L.Icon({
	iconUrl: 'marker-icon-blue.png',
	shadowUrl: 'marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});



let userService = new UserService();

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

export class IssueMapComponent extends Component {
  constructor (props){
    super(props);

    this.state = {
      hasLocation: true,
      address: "",
      latlng: {
        lat: 65.107877,
        lng: 12.074429
      },
      zoom: 11,
      issues: []
    };

    this.popupClick = this.popupClick.bind(this);
  }

  mapRef = createRef<Map>()

  componentDidMount(){

    userService.getMyIssuesWithCat().then(response => {
        this.setState({issues: response});
    }).catch((error: Error) => console.log("Insert alert here Magnus"));
    const map = this.mapRef.current.leafletElement;

    if (map != null) {
      map.locate();
    }
  }

  handleLocationFound = (e: Object) => {
    this.setState({
      latlng: e.latlng,
      zoom: 13
    });
  };

  popupClick = (e: Object) => {
    console.log("hello")
  }

  render() {

    let mapStyle = {
      height: '90vh',
      width: '100vw'
    }

    let btnStyle = {
      margin: '5px',
    }

    return (
      <div id="containme">
        {console.log('trigg', this.state.issues)}
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
          {this.state.issues.map((e, id) => {
            let color = e.statusName
            let status
            let icon_color
            if(color == 'Registered'){
              icon_color = yellowIcon
              status = "Registrert"
            } else if (color == 'In progress') {
              icon_color = blueIcon
              status = "Under behandling"
            } else {
              icon_color = greenIcon
              status = "Fullført"
            }
            return (
              <Marker key={id} position={[e.latitude, e.longitude]} icon={icon_color}>
                <Popup>
                  <Nav bsStyle="pills">
                    <NavItem href={'/#min_side/sakoversikt/' + e.issueId}>
                      {"Kategori: " +e.name + ", Innsendt: "+ e.date + ", Status: " + status}
                    </NavItem>
                  </Nav>
                </Popup>
              </Marker>
            )}
          )};
        </Map>
      </div>
    )
  }
}
