import React from "react";

export class StepOne extends React.Component {
  constructor() {
    super();
    this.state = {
      longitude: "",
      latitude: ""
    };
    this.handleLongitudeChanged = this.handleLongitudeChanged.bind(this);
    this.handleLatitudeChanged = this.handleLatitudeChanged.bind(this);
  }

  handleLongitudeChanged(event) {
    this.setState({ longitude: event.target.value });
  }

  handleLatitudeChanged(event) {
    this.setState({ latitude: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="six columns">
            <label>Longitude</label>
            <input
              className="u-full-width"
              placeholder="Longitude"
              type="text"
              onChange={this.handleLongitudeChanged}
              value={this.state.longitude}
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Latitude</label>
            <input
              className="u-full-width"
              placeholder="Latitude"
              type="text"
              onChange={this.handleLatitudeChanged}
              value={this.state.latitude}
            />
          </div>
        </div>
      </div>
    );
  }
}
