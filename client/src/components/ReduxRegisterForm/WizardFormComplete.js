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
          <div style={{ marginLeft: "200px", marginRight: "200px" }}>
            <WizardForm onSubmit={showResults} />
          </div>
        </div>
      </Provider>
    );
  }
}
