// @flow

import React from 'react';
import {Grid, Tabs, Tab} from 'react-bootstrap';
import {User} from "../../classTypes";
import {MyIssuesNotificationSettingsForm} from "../../components/MyIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";
import {NotificationSettingsMyCountiesForm} from "../../components/NotificationSettingsMyCountiesForm/NotificationSettingsMyCountiesForm";

import css from './NotificationSettings.css';

interface State {
    decoded: Object,
    user: User,
    categoryChoises: number[],

}

export class NotificationSettings extends React.Component <State> {

    state = {
        categoryChoises: []
    };

    render() {
        return(
            <Grid className="notifications bottomFooter">
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Mine kommuner">
                    <NotificationSettingsMyCountiesForm />
                </Tab>
                <Tab eventKey={2} title="Mine saker">
                    <MyIssuesNotificationSettingsForm />
                </Tab>
            </Tabs>
            </Grid>
        );
    }
}