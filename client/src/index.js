// @flow

import ReactDOM from "react-dom";
import * as React from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";
import { WizardFormComplete } from "./components/ReduxRegisterForm/WizardFormComplete";
import { MapComponent } from "./components/map/Map";
import { NavbarMenu } from "./components/NavbarMenu/NavbarMenu";
import { Login } from "./views/login/login";
import { Component } from "react-simplified";
import { Alert } from "./widgets";
import store from "./components/ReduxRegisterForm/store";
import { KontoOversikt } from "./views/MinSide/KontoOversikt/kontoOversikt";
import { countySubscription } from "./views/MinSide/countySubscription/countySubscription";
import createHashHistory from "history/createHashHistory";
import { MineSaker } from "./views/MinSide/mineSaker/mineSaker";
import { MinSide } from "./views/MinSide/MinSide";
import { Provider } from "react-redux";
import { adminAddCategory } from "./components/AdminAddCategory/adminAddCategory";
import {RegisterCompany} from "./components/registercompany/registercompany.js";
import {RegisterUser} from './components/registeruser/registeruser';
import { ChooseCategory } from "./components/ChooseCategory/ChooseCategory.js";


// Reload application when not in production environment
if (process.env.NODE_ENV !== "production") {
  let script = document.createElement("script");
  script.src = "/reload/reload.js";
  if (document.body) document.body.appendChild(script);
}

const root = document.getElementById("root");
if (root)
  ReactDOM.render(
    <HashRouter>
      <div className="route-container">
        <NavbarMenu />
        <Route path="/wizardForm" component={WizardFormComplete} />
        <Route path="/min_side/kommuner" component={countySubscription} />
        <Route path="/min_side/kontooversikt" component={KontoOversikt} />
        <Route
          path="/countySubscription/:userMail"
          component={countySubscription}
        />
        <Route path="/login" component={Login} />
        <Route path="/map" component={MapComponent} />
        <Route path="/min_side/mine_saker" component={MineSaker} />
        <Route path="/addCategory" component={adminAddCategory} />
        <Route exact path="/register" component={RegisterUser}/>
        <Route exact path="/register/company" component={RegisterCompany}/>
      </div>
    </HashRouter>,
    root
  );
