// @flow

import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { HashRouter, Route, NavLink } from "react-router-dom";
import { Alert } from "./widgets";
import { RegisterIssue } from "./components/RegisterIssue.js";
<<<<<<< HEAD
import { MultiStepForm } from "./MultiStepForm";
=======
import { countySubscription } from "./components/countySubscription.js";
>>>>>>> eca7f26d31eb3edcbeeb9637956ef200c577224e

// Reload application when not in production environment
if (process.env.NODE_ENV !== "production") {
  let script = document.createElement("script");
  script.src = "/reload/reload.js";
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById("root");
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Route exact path="/registerIssue" component={RegisterIssue} />
<<<<<<< HEAD
        <Route exact path="/RegisterMultiStep" component={MultiStepForm} />
=======
          <Route exact path="/countySubscription" component={countySubscription} />
>>>>>>> eca7f26d31eb3edcbeeb9637956ef200c577224e
      </div>
    </HashRouter>,
    root
  );
