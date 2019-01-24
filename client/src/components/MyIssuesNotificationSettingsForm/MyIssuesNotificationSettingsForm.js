// @flow

import React from 'react';
import {NotificationSettingsService, UserService} from "../../services";
import jwt from "jsonwebtoken";
import {FormGroup, Checkbox, Button, Grid} from "react-bootstrap";
import {IssueNotificationSetting, User} from "../../classTypes";

let notificationSettingsService = new NotificationSettingsService();
let userService = new UserService();

interface State {
    notifications: IssueNotificationSetting,
    createNew: boolean,
    registered: boolean,
    inProgress: boolean,
    completed: boolean
}

export class MyIssuesNotificationSettingsForm extends React.Component <State> {
    state = {
        notifications: new IssueNotificationSetting('', 0, 0, 0),
        createNew: false,
        registered: false,
        inProgress: false,
        completed: false
    };

    onChangeHandler = (e) => {
        return undefined;
    };

    onclickHandler = (e) => {
        let value = -1;
        let bool = false;
        let newSettings = null;

        if (e === 1) {
            if (this.state.registered) {
                value = 0;
                bool = false;
            } else {
                value = 1;
                bool = true;
            }
            newSettings = new IssueNotificationSetting(this.state.notifications.userMail, value, this.state.notifications.inProgress, this.state.notifications.completed);
            this.setState({
                notifications: newSettings,
                registered: bool
            });
        } else if (e === 2) {
            if (this.state.inProgress) {
                value = 0;
                bool = false;
            } else {
                value = 1;
                bool = true;
            }
            newSettings = new IssueNotificationSetting(this.state.notifications.userMail, this.state.notifications.registered, value, this.state.notifications.completed);

            this.setState({
                notifications: newSettings,
                inProgress: bool
            });
        } else if (e === 3) {
            if (this.state.completed) {
                value = 0;
                bool = false;
            } else {
                value = 1;
                bool = true;
            }
            newSettings = new IssueNotificationSetting(this.state.notifications.userMail, this.state.notifications.registered, this.state.notifications.inProgress, value);
            this.setState({
                notifications: newSettings,
                completed: bool
            });
        }
    };

    componentDidMount() {
        let notificationObj = undefined;
        let val = false;
        let reg = false;
        let inProg = false;
        let compl= false;

        notificationSettingsService.getIssueNotificationSettings()
            .then(resources => {
                notificationObj = resources[0];
                if (notificationObj === undefined) {
                    val = true;
                    /*
                    notificationObj = new IssueNotificationSetting(this.state.user.mail, 0, 0, 0)
                    * alle brukere skal få default notification settings ved registrering
                    */
                    notificationObj = {
                        registered: 0,
                        inProgress: 0,
                        completed: 0
                    }
                } else {
                    if (notificationObj.registered === 1) reg = true;
                    if (notificationObj.inProgress === 1) inProg = true;
                    if (notificationObj.completed === 1) compl = true;
                }
                this.setState({
                    notifications: notificationObj,
                    createNew: val,
                    registered: reg,
                    inProgress: inProg,
                    completed: compl
                });
            });
    }

    render() {
        return (
            <form>
                <Grid>
                    <h3>Varsle meg når mine innsendte saker er:</h3>

                    <FormGroup id={1}>
                        <Checkbox checked={(this.state.registered > 0)}
                                  onChange={() => {
                                      this.onChangeHandler(1)
                                  }}
                                  onClick={() => {
                                      this.onclickHandler(1)
                                  }}>Registrert</Checkbox>
                    </FormGroup>
                    <FormGroup id={2}>
                        <Checkbox checked={(this.state.inProgress > 0)}
                                  onChange={() => {
                                      this.onChangeHandler(2)
                                  }}
                                  onClick={() => {
                                      this.onclickHandler(2)
                                  }}>Under arbeid</Checkbox>
                    </FormGroup>
                    <FormGroup id={3}>
                        <Checkbox checked={(this.state.completed > 0)}
                                  onChange={() => {
                                      this.onChangeHandler(3)
                                  }}
                                  onClick={() => {
                                      this.onclickHandler(3)
                                  }}>Fullført</Checkbox>
                    </FormGroup>

                    <Button  onClick={() => {
                        this.save()
                    }}>Lagre</Button>
                </Grid>
            </form>
        );
    }

    save = () => {
        if (this.state.createNew) {
            notificationSettingsService.addIssueNotificationSettings(this.state.notifications)
                .catch(error => {
                    console.log('Error when adding: ' + 'n\ ' + 'error: ' + error.message)
                })
        } else {
            notificationSettingsService.updateIssueNotificationSettings(this.state.notifications)
                .catch(error => {
                    console.log('Error when updating: ' + 'n\ ' + 'error: ' + error.message)
                })
        }
    }
}