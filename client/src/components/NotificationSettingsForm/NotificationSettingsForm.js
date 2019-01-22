// @flow

import React from 'react';
import {CategoryService, NotificationSettingsService} from "../../services";
import jwt from "jsonwebtoken";
import FormGroup from "react-bootstrap/es/FormGroup";
import Checkbox from "react-bootstrap/es/Checkbox";
import Button from "react-bootstrap/es/Button";
import Grid from "react-bootstrap/es/Grid";
import {NotificationSetting, User} from "../../classTypes";
import {UserService} from "../../services";


let notificationSettingsService = new NotificationSettingsService();
let categoryService = new CategoryService();
let userService = new UserService();

interface State {
    decoded: Object,
    notificationCategories: Object[],
    chosenNotifications: Object[],
    chosenCatString: string[],
    catString: string[],
    user: User
}

export class NotificationSettingsForm extends React.Component <State> {
    state = {
        notificationCategories: [],
        chosenNotifications: [],
        chosenCatString: [],
        catString: [],
        user: new User('', '', '', '', '', -1, -1, -1)
    };

    onChangeHandler = (e) => {
        return undefined;
    };

    onclickHandler = (e) => {

        if (this.state.chosenCatString.indexOf(e) > -1) {
            let array = this.state.chosenCatString;
            array.splice(array.indexOf(e), 1);
            this.setState({
                chosenCatString: array
            });
        } else {
            let array = this.state.chosenCatString;
            array.push(e);
            this.setState({
                chosenCatString: array
            });
        }

    };

    componentDidMount() {
        let chosenCatString = [];
        let catString = [];
        let chosenCat = [];
        let categories = [];
        let user = null;

        userService.getCurrentUser()
            .then(resource => {
                user = resource[0];
                this.setState({
                    user: user
                })
            });

        categoryService.getCategory1()
            .then(resources => {
                resources.map(e => (
                    categories.push(e)
                ));
                this.setState({
                    notificationCategories: categories
                });
            })
            .then(() => {this.state.notificationCategories.map(e => {
                catString.push(e.name);
            });
                this.setState({
                    catString: catString
                })
            });

        notificationSettingsService.getNotificationSettings()
            .then(resources => {
                console.log(resources);
                resources.map(e => {
                    if (e.countyId === this.state.user.countyId) {
                        chosenCat.push(e)
                    }
                });
                this.setState({
                    chosenNotifications: chosenCat
                });
            })
            .then(() => {this.state.chosenNotifications.map(e => {
                chosenCatString.push(e.name);
            });
                this.setState({
                    chosenCatString: chosenCatString
                })
            });

    }

    render() {
        return (
            <form>
                <Grid>
                    <h3>Velg kategorier du vil har varselmeldinger på:</h3>
                    {
                        this.state.catString.map(e =>
                            <div key={e}>
                                <FormGroup id={e}>
                                    <Checkbox checked={(this.state.chosenCatString.indexOf(e) > -1)}
                                              onChange={() => {
                                                  this.onChangeHandler(e)
                                              }}
                                              onClick={() => {
                                                  this.onclickHandler(e)
                                              }}>{e}</Checkbox>
                                </FormGroup>
                            </div>
                        )
                    }
                    <Button bsStyle="primary" onClick={() => {
                        this.save()
                    }}>Lagre</Button>
                </Grid>
            </form>
        );
    }

    save = () => {
        // delete existing settings
        notificationSettingsService.deleteNotificationSettings()
            .catch(error => {
                console.log('Noe gikk galt ved sletting av notificationsettings: ' + 'n\ ' + error.message)
            });


        //look for new settings
        let array = [];

        this.state.notificationCategories.map(e => {
            let name = e.name;
            this.state.chosenCatString.map(elem => {
                if (name === elem) {
                    let newChoice = {
                        countyId: this.state.user.countyId,
                        categoryId: e.categoryId
                    };
                    array.push(newChoice);
                }
            })
        });

        // add new settings
        array.map(e => {
            let elem = {
                countyId: e.countyId,
                categoryId: e.categoryId
            };
            notificationSettingsService.addNotificationSettings(elem)
                .catch(error => {
                    console.log('Error when adding: ' + e + 'n\ ' + 'error: ' + error.message)
                })
        });
        // update state

        this.setState({
            chosenNotifications: array
        });
    }
}