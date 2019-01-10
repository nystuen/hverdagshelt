import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import MultiStep from "./MultiStep";
import { steps } from "./components/Steps";

export class MultiStepForm extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <MultiStep steps={steps} />
        </div>
        <div className="container">
          <h6>Test</h6>
        </div>
      </div>
    );
  }
}
