// @flow

import ReactDOM from "react-dom";
import * as React from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";
import { WizardFormComplete } from "./components/reduxRegisterForm/WizardFormComplete";
import { EventMapComponent, IssueMapComponent } from './components/map/Map';
import { NavbarMenu } from "./components/navbarMenu/NavbarMenu";
import { login } from "./views/login/login";
import { Alert } from "./widgets";
import store from "./components/reduxRegisterForm/store";
import { accountOverview } from "./views/myPage/accountOverview/accountOverview";
import { countySubscription } from "./components/countySubscription/countySubscription";
import createHashHistory from "history/createHashHistory";
import { myIssues } from "./views/myPage/myIssues/myIssues";
import { Provider } from "react-redux";
import { adminAddCategory } from "./components/adminAddCategory/adminAddCategory";
import { RegisterCompany } from "./components/registercompany/registercompany.js";
import { RegisterUser } from "./components/registeruser/registeruser";
import { ChooseCategory } from "./components/chooseCategory/ChooseCategory.js";
import { welcomePage } from "./views/welcomePage/welcomePage";
import { ChangeCounty } from "./views/changeCounty/changeCounty";
import { editAccountInformation } from "./views/myPage/accountOverview/editAccountInformation";
import { notificationSettings } from "./views/notificationSettings/notificationSettings";
import { Component } from "react-simplified";
import { EventWizardFormComplete } from "./components/registerEventForm/EventWizardFormComplete";
import { issueOverview } from "./views/issueOverview/issueOverview";
import { myIssuesCompany } from "./views/myPage/myIssues/myIssuesCompany";
import { events } from "./views/events/events";
import { adminPanel } from "./views/admin/adminPanel/adminPanel";
import { SendTextMailWindow } from "./components/mail/SendMail";
import { Footer } from "./components/footer/Footer";
import { RegisterAdmin } from "./components/registeradmin/registeradmin";
import { ForgottenPassword } from "./views/login/forgottenPassword";
import { RegNew } from "./components/regNew/RegNew";
import { manageUsers } from "./views/admin/mangeUsers/manageUsers";
import { CreateAdminsOrEmployees } from "./views/admin/createAdminOrEmployees/createAdminsOrEmployees";
import { Statistics } from "./components/statistics/Statistics";
import { adminIssues } from "./views/admin/adminIssues/adminIssues";
import { EditIssue } from "./views/myPage/myIssues/editIssue";
import { Footer2 } from './components/footer/Footer2';
import { eventView } from './views/events/eventView';

import {adminEvents} from "./views/admin/adminEvents/adminEvents";
import {SetCategoryInactive, setCategoryInactive} from "./components/setCategoryInactive/SetCategoryInactive";
import { splitScreen } from './views/welcomePage/splitScreen';

// Reload application when not in production environment
if (process.env.NODE_ENV !== "production") {
  let script = document.createElement("script");
  script.src = "/reload/reload.js";
  if (document.body) document.body.appendChild(script);
}

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById("root");
if (root)
  ReactDOM.render(
    <HashRouter>
      <div className="route-container">
        <NavbarMenu />
        <Route exact path="/" component={welcomePage} />
        <Route path="/endreKommune" component={ChangeCounty} />
        <Route path="/wizardForm" component={WizardFormComplete} />
        <Route path="/min_side/kontooversikt" component={accountOverview} />

        <Route
          path="/min_side/editAccountInformation"
          component={editAccountInformation}
        />
        <Route path="/login" component={login}/>
        <Route path="/map" component={IssueMapComponent}/>
        <Route path="/min_side/mine_saker" component={myIssues}/>
        <Route
          path="/min_side/mine_sakerBedrift"
          component={myIssuesCompany}
        />
        <Route path="/addCategory" component={adminAddCategory} />
        <Route path="/registrer/admin" component={RegisterAdmin} />
        <Route exact path="/registrer/privat" component={RegisterUser} />
        <Route exact path="/registrer/bedrift" component={RegisterCompany} />
        <Route
          path="/min_side/varselinstillinger"
          component={notificationSettings}
        />
        <Route
          path="/min_side/sakoversikt/:issueId"
          component={issueOverview}
        />
        <Route
          exact
          path="/registerEvent"
          component={EventWizardFormComplete}
        />
        <Route exact path="/hendelser/:countyId" component={events}/>
        <Route exact path="/admin" component={adminPanel}/>
        <Route path="/admin/sendMailTilBruker" component={SendTextMailWindow}/>
        <Route path="/handlinger/brukerbehandling" component={manageUsers}/>
        <Route path="/forgotPassword" component={ForgottenPassword}/>
        <Route
          path="/admin/createAdminsOrEmployees"
          component={CreateAdminsOrEmployees}
        />
        <Route path="/statistics" component={Statistics} />
          <Route path="/admin/endreKategorier" component={SetCategoryInactive}/>
        <Route path="/admin/adminSaker" component={adminIssues} />
        <Route path="/admin/adminHendelser" component={adminEvents} />
        <Route
          path="/min_side/mine_saker/rediger/:issueId"
          component={EditIssue}
        />
        <Route exact path="/hendelse/:eventId" component={eventView}/>
        <Route path="/registreringsvalg" component={splitScreen}/>
        <Footer2/>
      </div>
    </HashRouter>,
    root
  );
