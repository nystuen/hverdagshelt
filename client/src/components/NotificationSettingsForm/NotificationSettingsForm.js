// @flow

import React from 'react';
import {CategoryService, NotificationSettingsService} from "../../services";
import jwt from "jsonwebtoken";
import FormGroup from "react-bootstrap/es/FormGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import Checkbox from "react-bootstrap/es/Checkbox";
import Button from "react-bootstrap/es/Button";

let notificationSettingsService = new NotificationSettingsService();
let categoryService = new CategoryService();


interface State {
    decoded: Object,
    notificationCategories: Object[],
    chosenNotifications: Object[]
}

export class NotificationSettingsForm extends React.Component <State> {
    state = {
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
        notificationCategories: [],
        chosenNotifications: []
    };


    handleChange(e) {
        this.setState({value: e.target.value});
    }

    componentDidMount() {
        let chosenCat = [];
        let categories = [];

        notificationSettingsService.getNotificationSettings(this.state.decoded.email)
            .then(resources => {
                resources.map(e => (
                    chosenCat.push(e.name)
                ));
                this.setState({
                    chosenNotifications: chosenCat
                });
            });

        categoryService.getCategory1()
            .then(resources => {
                resources.map(e => (
                    categories.push(e.name)
                ));
                this.setState({
                    notificationCategories: categories
                });
            });

    }

    render() {
        return (
            <form>
                <h3>Velg kategorier du vil har varselmeldinger på:</h3>
                {
                    this.state.notificationCategories.map(e =>
                        this.state.chosenNotifications.includes(e) ? (
                            <div key={e}>
                                <FormGroup id={e}>
                                    <Checkbox checked>{e}</Checkbox>
                                </FormGroup>
                            </div>
                        ) : (
                            <div key={e}>
                                <FormGroup id={e}>
                                    <Checkbox>{e}</Checkbox>
                                </FormGroup>
                            </div>
                        )
                    )
                }
                <Button>Lagre</Button>
            </form>
        );
    }
}