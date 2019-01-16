import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import EventWizardForm from "./EventWizardForm";

export class EventWizardFormComplete extends React.Component {
  render() {
    let styles = {
      height: "100%",
      padding: "0px"
    };
    return (
      <Provider store={store}>
        <div className="container" style={styles}>
          <div style={styles}>
            <EventWizardForm onSubmit={showResults} />
          </div>
        </div>
      </Provider>
    );
  }
}
