// @flow

import React from 'react';
import {CategoryService, getAllCounties, getCounties, NotificationSettingsService} from "../../services";
import jwt from "jsonwebtoken";
import FormGroup from "react-bootstrap/es/FormGroup";
import Checkbox from "react-bootstrap/es/Checkbox";
import Button from "react-bootstrap/es/Button";
import Grid from "react-bootstrap/es/Grid";
import {Category, NotificationSetting, User} from "../../classTypes";
import {UserService} from "../../services";
import {getUsersCounties} from "../../services";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import {Collapse} from "react-bootstrap";
import ListGroup from "react-bootstrap/es/ListGroup";
import cloneDeep from "lodash/cloneDeep";


let notificationSettingsService = new NotificationSettingsService();
let categoryService = new CategoryService();
let userService = new UserService();

interface State {
    decoded: Object,
    notificationSettings: Object[],
    userCounties: Object[],
    categories: Object[],
    selectedCounty: number

}

export class NotificationSettingsMyCountiesForm extends React.Component <State> {
    state = {
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
        notificationSettings: [],
        userCounties: [],
        categories: [],
        selectedCounty: -1

    };

    onChangeHandler = (e) => {
        return undefined;
    };

    componentDidMount() {
        let notificationSettings = [];
        let userCounties = [];
        let categories = [];

        notificationSettingsService.getNotificationSettings(this.state.decoded.email)
            .then(resources => {
                console.log(resources);
                resources.map(e => {
                    notificationSettings.push(e)
                });
                this.setState({
                    notificationSettings: notificationSettings
                })
            });

        getUsersCounties(this.state.decoded.email)
            .then(resources => {
                resources.map(e => {
                    let userCountyObj = {
                        countyId: e.countyId,
                        countyName: e.name,
                        open: false
                    };
                    userCounties.push(userCountyObj);
                });
                this.setState({
                    userCounties: userCounties
                })
            });

        categoryService.getCategory1()
            .then(resources => {
                resources.map(e => {
                    let categoryObj = {
                        categoryId: e.categoryId,
                        categoryName: e.name,
                        checked: false
                    };
                    categories.push(categoryObj)
                });
                this.setState({
                    categories: categories
                })
            })
    }

    handleClick(county: Object) {
        let countyArr = cloneDeep(this.state.userCounties);
        let settingsArr = cloneDeep(this.state.notificationSettings);
        let catArr = cloneDeep(this.state.categories);

        let objectIndex = this.state.userCounties.indexOf(county);

        countyArr.map(e => {
            e.open = false;
        });

        catArr.map(e => {
            e.checked = false;
        });

        countyArr[objectIndex].open = !this.state.userCounties[objectIndex].open;

        this.state.userCounties[objectIndex].open = !this.state.userCounties[objectIndex].open;

        settingsArr.map(e => {
            if (e.countyId === county.countyId) {
                catArr.map(c => {
                    if (c.categoryId === e.categoryId) {
                        c.checked = true;
                    }
                })
            }
        });

        this.setState(
            {
                userCounties: countyArr,
                selectedCounty: county.countyId,
                categories: catArr
            }
        );
    }

    onClickHandler(category: Object) {
        let catArr = cloneDeep(this.state.categories);
        let settingsArr = cloneDeep(this.state.notificationSettings);

        // invert the selected category's checked status
        let catIndex = this.state.categories.indexOf(category);
        catArr[catIndex].checked = !this.state.categories[catIndex].checked;
        this.state.categories[catIndex].checked = !this.state.categories[catIndex].checked;

        // remove all settings for the selected county
        this.state.notificationSettings.map(e => {
            let settingIndex = this.state.notificationSettings.indexOf(e);
            if (e.countyId === this.state.selectedCounty) {
                settingsArr.splice(settingIndex, 1);
            }
        });

        // add all checked categories for the selected county
        catArr.map(e => {
            if (e.checked) {
                let settingObj = {
                    countyId: this.state.selectedCounty,
                    categoryId: e.categoryId,
                };
                settingsArr.push(settingObj)
            }
        });

        this.setState({
            notificationSettings: settingsArr,
            categories: catArr
        });
    }

    render() {
        return (
            <form>
                <Grid>
                    <h3>Velg en kommune for å vise varselinnstillinger:</h3>
                    <ListGroup>
                        {
                            this.state.userCounties.map(e => {
                                return (
                                    <div key={e.countyId}>
                                        <ListGroupItem onClick={() => this.handleClick(e)}>
                                            {e.countyName}
                                        </ListGroupItem>
                                        <Collapse in={e.open}>
                                            <div>
                                                {
                                                    this.state.categories.map(c => {
                                                        return (
                                                            <div key={c.categoryId}>
                                                                <FormGroup>
                                                                    <Checkbox
                                                                        checked={c.checked}
                                                                        onChange={() => {
                                                                            this.onChangeHandler(c)
                                                                        }}
                                                                        onClick={() => {
                                                                            this.onClickHandler(c)
                                                                        }}>{c.categoryName}</Checkbox>
                                                                </FormGroup>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                )
                            })
                        }
                    </ListGroup>

                    <Button onClick={() => {
                        this.save()
                    }}>Lagre</Button>
                </Grid>
            </form>
        );
    }

    save = () => {
        console.log(this.state.notificationSettings);

        notificationSettingsService.deleteNotificationSettings(this.state.decoded.email)
            .catch(error => {
                console.log('Noe gikk galt ved sletting av notificationsettings: ' + 'n\ ' + error.message)
            });

        this.state.notificationSettings.map(e => {
            let elem = new NotificationSetting(e.countyId, e.categoryId, this.state.decoded.email);
            notificationSettingsService.addNotificationSettings(elem)
                .catch(error => {
                    console.log('Error when adding: ' + e + 'n\ ' + 'error: ' + error.message)
                })
        })
    }
}