// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';
import { WizardFormComplete } from "./components/ReduxRegisterForm/WizardFormComplete";
import store from "./components/ReduxRegisterForm/store";
import { Provider } from "react-redux";
import { MapComponent } from "./components/map/Map"
import { NavbarMenu } from "./components/NavbarMenu/NavbarMenu";
import { Login } from "./views/login/login";
import { KontoOversikt } from "./views/MinSide/KontoOversikt/kontoOversikt";
import { countySubscription } from "./views/countySubscription/countySubscription";
import {RegisterIssue} from "./components/RegisterIssue.js";
import createHashHistory from 'history/createHashHistory';
import {MineSaker} from "./views/MinSide/mineSaker/mineSaker";
import {MinSide} from "./views/MinSide/MinSide";


// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div className="route-container">
                <NavbarMenu/>
                <Route path="/wizardForm" component={WizardFormComplete} />
                <Route path="/min_side/kommuner" component={ countySubscription }/>
                <Route path="/min_side/kontooversikt" component={KontoOversikt}/>
                <Route path="/map" component={ MapComponent } />
                <Route path="/login" component={Login} />
            </div>
        </HashRouter>,
        root
    );
