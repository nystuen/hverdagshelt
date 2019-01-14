import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import WizardForm from "./WizardForm";

export class WizardFormComplete extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div>
            <WizardForm onSubmit={showResults} />
          </div>
          <div className="container">
            <h6>Test</h6>
          </div>
        </div>
      </Provider>
    );
  }
}
