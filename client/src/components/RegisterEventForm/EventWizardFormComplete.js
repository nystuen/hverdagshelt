import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import EventWizardForm from "./EventWizardForm";

export class EventWizardFormComplete extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div>
            <EventWizardForm onSubmit={showResults} />
          </div>
        </div>
      </Provider>
    );
  }
}
