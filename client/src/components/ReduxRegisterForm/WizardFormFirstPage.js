// @flow
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderCategoryField from "./renderCategoryField";
import React, { Component, createRef } from "react";
import { Map, TileLayer, Marker, Popup, withLeaflet } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
import L from "leaflet";
import { Button, ProgressBar, Glyphicon } from "react-bootstrap";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDVZREoJuiobrxWVmBFhemEk1VdRB0MsSI");

type State = {
  hasLocation: boolean,
  address: string,
  latlng: {
    lat: number,
    lng: number
  },
  zoom: number,
  correct_county: boolean
};

export class WizardFormFirstPage extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      hasLocation: false,
      address: "",
      latlng: {
        lat: 65.107877,
        lng: 12.074429
      },
      zoom: 5,
      correct_county: false
    };

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  }

  mapRef = createRef<Map>();

  handleMapClick = (e: Object) => {
    if (e === undefined) e = { latlng: {} };
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
      zoom: 17
    });

    this.props.change("latitude", e.latlng.lat);
    this.props.change("longitude", e.latlng.lng);

    Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
      response => {
        console.log(response.results[0])
        let county_found
        (response.results[0].address_components[3] != undefined ) ? county_found = response.results[0].address_components[2].long_name: county_found=""
        if(window.sessionStorage.getItem('countyName') == county_found){
          this.props.change("countyId", window.sessionStorage.getItem('countyId'))
          this.setState({
            correct_county: true
          })
        } else {
          this.setState({
            correct_county: false
          })
        }
        const address_found = response.results[0].formatted_address;
        this.props.change("address", address_found);
        this.setState({
          hasLocation: true,
          latlng: e.latlng,
          address: address_found
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  handleLocationFound = (e: Object) => {
    this.props.change("latitude", e.latlng.lat);
    this.props.change("longitude", e.latlng.lng);
    Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
      response => {
        let county_found
        (response.results[0].address_components[3] != undefined ) ? county_found = response.results[0].address_components[2].long_name: county_found=""
        if(window.sessionStorage.getItem('countyName') == county_found){
          this.props.change("countyId", window.sessionStorage.getItem('countyId'))
          this.setState({
            correct_county: true
          })
        } else {
          this.setState({
            correct_county: false
          })
        }
        const address_found = response.results[0].formatted_address;
        (response.results[0].address_components[3] != undefined ) ? county_found = response.results[0].address_components[2].long_name: county_found=""
        this.props.change("address", address_found);
        this.setState({
          hasLocation: true,
          latlng: e.latlng,
          address: address_found,
          zoom: 15
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  onChange = (e: Object) => {
    this.setState({
      address: e.target.value
    });
  };

  handleClick = (e: Object) => {
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        Geocode.fromLatLng(lat, lng).then(response => {
          const address_found = response.results[0].formatted_address;
          let county_found
          (response.results[0].address_components[3] != undefined ) ? county_found = response.results[0].address_components[2].long_name: county_found=""
          if(window.sessionStorage.getItem('countyName') == county_found){
            this.props.change("countyId", window.sessionStorage.getItem('countyId'))
            this.setState({
              correct_county: true
            })
          } else {
            this.setState({
              correct_county: false
            })
          }
          this.props.change("address", address_found);
          this.setState({
            hasLocation: true,
            latlng: {
              lat: lat,
              lng: lng
            },
            address: address_found,
            zoom: 17
          });
      });
    },
    error => {
      console.error(error);
      }
    );
  };

  render() {
    const { handleSubmit, previousPage } = this.props;

    let styles = {
      height: "100%"
    };



    let centerStyle = {
      alignItems: "center",
      justifyContent: "center"
    };

    let marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>{this.state.address}</Popup>
      </Marker>
    ) : null;

    return (
      <div style={styles}>
        <div className="formDiv" />
        <Map
          center={this.state.latlng}
          length={12}
          onClick={this.handleMapClick}
          onLocationFound={this.handleLocationFound}
          ref={this.mapRef}
          zoom={this.state.zoom}
          doubleClickZoom={true}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker}
        </Map>
        <div className="choice-map-container">
          <div className="choice-map">
            <input
              className="input-map"
              placeholder="Adresse, by"
              onChange={this.onChange.bind(this)}
              value={this.state.address}
            />
            <Button bsStyle="primary" onClick={this.handleClick}>
              Finn addresse
            </Button>
          </div>
          <div className="choice-map">
            <form onSubmit={handleSubmit} style={centerStyle}>
              <Field
                name="lat"
                type="hidden"
                label="latitude"
                component={renderCategoryField}
              />
              <Field
                name="lng"
                type="hidden"
                label="longitude"
                component={renderCategoryField}
              />
              <Button
                id="submitButton"
                bsStyle="primary"
                type="submit"
                className="next + ' ' + submitButton"
                disabled= {!this.state.correct_county}
                onClick={this.handleSubmit}
              >
                  Meld feil <Glyphicon glyph="glyphicon glyphicon-arrow-right"/>
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
