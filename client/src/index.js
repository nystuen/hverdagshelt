// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { WizardFormComplete } from './components/ReduxRegisterForm/WizardFormComplete';
import { MapComponent } from './components/map/Map';
import { NavbarMenu } from './components/NavbarMenu/NavbarMenu';
import { Login } from './views/login/login';
import { Alert } from './widgets';
import store from './components/ReduxRegisterForm/store';
import { countySubscription } from './views/MinSide/countySubscription/countySubscription';
import createHashHistory from 'history/createHashHistory';
import { MineSaker } from './views/MinSide/mineSaker/mineSaker';
import { Provider } from 'react-redux';
import { adminAddCategory } from './components/AdminAddCategory/adminAddCategory';
import { RegisterCompany } from './components/registercompany/registercompany.js';
import { RegisterUser } from './components/registeruser/registeruser';
import { ChooseCategory } from './components/ChooseCategory/ChooseCategory.js';
import { forside } from './views/forside/forside';
import { Frontpage } from './views/frontpage/frontpage';
import { editAccountInformation } from './views/MinSide/KontoOversikt/editAccountInformation';
import { NotificationSettings } from './components/NotificationSettings/NotificationSettings';
import { Component } from 'react-simplified';
import { MinSide } from './views/MinSide/MinSide';
import { EventWizardFormComplete } from './components/RegisterEventForm/EventWizardFormComplete';
import { OversiktOverSak } from './views/oversiktOverSak/oversiktOverSak';
import { mineSakerBedrift } from './views/MinSide/mineSaker/mineSakerBedrift';
import { events } from './views/events/events';
import {KontoOversikt} from './views/MinSide/KontoOversikt/kontoOversikt';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div className="route-container">
        <NavbarMenu/>
        <Route exact path="/" component={Frontpage}/>
        <Route path="/forside/:countyId" component={forside}/>
        <Route path="/wizardForm" component={WizardFormComplete}/>
        <Route path="/min_side/kommuner" component={countySubscription}/>
        <Route path="/min_side/kontooversikt" component={KontoOversikt}/>
        <Route path="/countySubscription/:userMail" component={countySubscription}/>
        <Route path="/min_side/editAccountInformation" component={editAccountInformation}/>
        <Route path="/login" component={Login}/>
        <Route path="/map" component={MapComponent}/>
        <Route path="/min_side/mine_saker" component={MineSaker}/>
        <Route path="/min_side/mine_sakerBedrift" component={mineSakerBedrift}/>
        <Route path="/addCategory" component={adminAddCategory}/>
        <Route exact path="/register" component={RegisterUser}/>
        <Route exact path="/register/company" component={RegisterCompany}/>
        <Route path="/min_side/varselinstillinger" component={NotificationSettings}/>
        <Route path="/min_side/sakoversikt/:email/:issueId" component={OversiktOverSak}/>
        <Route exact path="/registerEvent" component={EventWizardFormComplete}/>
        <Route exact path="/events/:countyId" component={events}/>
      </div>
    </HashRouter>,
    root
  );
