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
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
        notificationCategories: [],
        chosenNotifications: [],
        chosenCatString: [],
        catString: [],
        user: null
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
        console.log(this.state.chosenCatString);

    };

    componentDidMount() {
        let chosenCatString = [];
        let catString = [];
        let chosenCat = [];
        let categories = [];

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

        notificationSettingsService.getNotificationSettings(this.state.decoded.email)
            .then(resources => {
                resources.map(e => (
                    chosenCat.push(e)
                ));
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



        userService.getUser(this.state.decoded.email)
            .then(resource => {
                this.setState({
                    user: resource[0]
                })
            })
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
                    <Button onClick={() => {
                        this.save()
                    }}>Lagre</Button>
                </Grid>
            </form>
        );
    }

    save = () => {
        // delete existing settings
        notificationSettingsService.deleteNotificationSettings(this.state.decoded.email)
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
                        categoryId: e.categoryId,
                        userMail: this.state.decoded.email
                    };
                    array.push(newChoice);
                }
            })
        });

        // add new settings
        console.log(array);
        array.map(e => {
            let elem = new NotificationSetting(e.countyId, e.categoryId, e.userMail);
            notificationSettingsService.addNotificationSettings(elem)
                .catch(error => {
                    console.log('Error when adding: ' + e + 'n\ ' + 'error: ' + error.message)
                })
        });
        // update state

        this.setState({
            chosenNotifications: array
        });
        console.log(array);
    }
}