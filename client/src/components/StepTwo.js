"use strict";
import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

export class StepTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryId: ""
    };
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
  }

  handleCategoryChanged(event) {
    this.setState({ categoryId: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="six columns">
            <label>
              Velg kategori som passer til det du rapporterer (skriv inn
              kategori ID)
            </label>
            <input
              className="u-full-width required"
              placeholder="CategoryID"
              type="email"
              onChange={this.handleCategoryChanged}
              value={this.state.categoryId}
              autoFocus
            />
          </div>
        </div>
      </div>
    );
  }
}
