// @flow

import React from 'react';
import jwt from 'jsonwebtoken';
import {Grid, Row, Col, ListGroup, ListGroupItem, Tabs, Tab} from 'react-bootstrap';
import {User} from "../../classTypes";
import Button from "react-bootstrap/es/Button";
import {MyIssuesNotificationSettingsForm} from "../../components/MyIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";
import {NotificationSettingsForm} from "../../components/NotificationSettingsForm/NotificationSettingsForm";
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