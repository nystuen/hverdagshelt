// @flow

import React, { Component, createRef } from 'react'
import { Map, TileLayer, Marker, Circle, Popup, withLeaflet } from 'react-leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import L from 'leaflet'
import { Button, Col, Row, Nav, NavItem } from 'react-bootstrap';
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

  componentWillReceiveProps(e: Object){
    this.setState({
      latlng: {
        lat: e.markers[0],
        lng: e.markers[1]
      }
    })
  }

  render() {
    let markers = this.props.markers

    let marker = this.state.hasLocation ? (
      <Circle center={this.state.latlng} radius={100}>
      </Circle>
    ): null


    let mapStyle = {
      height: '100vh',
      width: '90%'
    }


    return (
      <div>
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

export class OneIssueMapComponent extends Component<{markers: string[]}> {
  constructor (props){
    super(props);

    this.state = {
      hasLocation: true,
      address: "",
      latlng: {
          lat: this.props.markers[0],
          lng: this.props.markers[1]
      },
      zoom: 16
    };
  }

  componentWillReceiveProps(e: Object){
    this.setState({
      latlng: {
        lat: e.markers[0],
        lng: e.markers[1]
      }
    })
  }

  mapRef = createRef<Map>()

  render() {

    let marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
      </Marker>
    ): null


    let mapStyle = {
      height: '60vh',
      width: '100%'
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
      zoom: 5,
      issues: []
    };

    this.popupClick = this.popupClick.bind(this);
  }

  mapRef = createRef<Map>()

  componentDidMount(){
    userService.getCurrentUser().then(res => {
      if(res[0].companyMail != undefined){
        userService.getCompanyIssuesWithCat(res[0].companyMail).then(res => {
          this.setState({
            issues: res
          });
        });
      } else {
        userService.getAllIssuesWithCat().then(response => {
            this.setState({issues: response});
        }).catch((error: Error) => console.log("Insert alert here Magnus"));
      }
    })

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
