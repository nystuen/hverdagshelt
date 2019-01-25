// @flow

import React from 'react';
import {EventCategoryService, CountyService, NotificationSettingsService, UserService} from "../../services";
import jwt from "jsonwebtoken";
import {FormGroup, Checkbox, Button, Grid, ListGroupItem, ListGroup, Glyphicon, Col, Alert, Row} from "react-bootstrap";
import {Category, NotificationSetting, User} from "../../classTypes";
import {Collapse} from "react-bootstrap";
import cloneDeep from "lodash/cloneDeep";
import css from './NotificationSettingsForm.css';
import {CountySubscription} from "../../views/MinSide/countySubscription/countySubscription";


let notificationSettingsService = new NotificationSettingsService();
let eventCategoryService = new EventCategoryService();
let countyService = new CountyService();
let userService = new UserService();

interface State {
  notificationSettings: Object[],
  userCounties: Object[],
  categories: Object[],
  selectedCounty: number,
  countySubscriptionOpen: boolean,
    settingsSaved: boolean

}

export class NotificationSettingsMyCountiesForm extends React.Component <State> {
  state = {
    notificationSettings: [],
    userCounties: [],
    categories: [],
    selectedCounty: -1,
    countySubscriptionOpen: false,
      settingsSaved: false
  };

  onChangeHandler = (e) => {
    return undefined;
  };

  componentDidMount() {
    let notificationSettings = [];
    let userCounties = [];
    let categories = [];

    notificationSettingsService.getNotificationSettings()
      .then(resources => {

        resources.map(e => {
          let settingObj = {
            countyId: e.countyId,
            categoryId: e.categoryId
          };
          notificationSettings.push(settingObj);
        });
        this.setState({
          notificationSettings: notificationSettings
        });
      });

    countyService.getUsersCounties()
      .then(resources => {
        resources.map(e => {
          let userCountyObj = {
            countyId: e.countyId,
            countyName: e.name,
            open: false,
            home: false
          };
          userCounties.push(userCountyObj);
        });
      })

      .then(userService.getHomeCounty().then(resources => {
          let userCountyObj = {
            countyId: resources[0].countyId,
            countyName: resources[0].name,
            open: false,
            home: true
          };
          userCounties.unshift(userCountyObj);
          this.setState({
            userCounties: userCounties
          });
        }
      ));

    eventCategoryService.getEventCategory()
      .then(resources => {
        resources.map(e => {
          let categoryObj = {
            categoryId: e.eventCategoryId,
            categoryName: e.name,
            checked: false
          };
          categories.push(categoryObj);
        });
        this.setState({
          categories: categories
        });
      });
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
        });
      }
    });

    this.setState(
      {
        userCounties: countyArr,
        selectedCounty: county.countyId,
        categories: catArr,
          settingsSaved: false
      }
    );
  }

  onClickHandler(category: Object) {
    let catArr = cloneDeep(this.state.categories);
    let settingsArr = cloneDeep(this.state.notificationSettings);

    // invert the selected category's checked status
    let catIndex = this.state.categories.indexOf(category);
    catArr[catIndex].checked = !catArr[catIndex].checked;

    let settingObj = {
      countyId: this.state.selectedCounty,
      categoryId: category.categoryId
    };

    if (catArr[catIndex].checked) {
      if (settingsArr.length < 1) {
        settingsArr.push(settingObj);
      } else {

        let exists = false;
        this.state.notificationSettings.map(e => {
          let settingIndex = this.state.notificationSettings.indexOf(e);
          if (e.countyId === settingObj.countyId && e.categoryId === settingObj.categoryId) {
            settingsArr[settingIndex] = settingObj;
            exists = true;
          }
        });

        if (!exists) {
          settingsArr.push(settingObj);
        }
      }
    } else {
      this.state.notificationSettings.map(e => {
        let settingIndex = this.state.notificationSettings.indexOf(e);
        if (e.countyId === settingObj.countyId && e.categoryId === settingObj.categoryId) {
          settingsArr.splice(settingIndex, 1);
        }
      });
    }

    this.setState({
      notificationSettings: settingsArr,
      categories: catArr,
        settingsSaved: false
    });
  };


  caret(active: boolean) {
    if (active) {
      return <span className="caret"/>;
    } else {
      return <span className="caret caret-right"/>;
    }
  }

  renderAddCategory(renderBoolean: boolean) {
    if (!renderBoolean) {
      return <Col>
        <h3>Velg en kommune for å vise varselinnstillinger:</h3>
        <ListGroup>
          {
            this.state.userCounties.map(e => {
              return (
                <div key={e.countyId}>
                  <ListGroupItem onClick={() => this.handleClick(e)}>
                    {
                      e.home ? (
                        <div>{e.countyName}{this.caret(e.open)} <Glyphicon
                          glyph="glyphicon glyphicon-home"/></div>
                      ) : (
                        <div>{e.countyName}{this.caret(e.open)}</div>
                      )
                    }
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
                                    this.onChangeHandler(c);
                                  }}
                                  onClick={() => {
                                    this.onClickHandler(c);
                                  }}>{c.categoryName}</Checkbox>
                              </FormGroup>
                            </div>
                          );
                        })
                      }
                    </div>
                  </Collapse>
                </div>
              );
            })
          }
        </ListGroup>
      </Col>;
    } else {
      return <Collapse in={this.state.countySubscriptionOpen}>
        <div>
          <h3>Legg til eller fjern kommuner du får varsler fra</h3>
          <CountySubscription/>
        </div>
      </Collapse>;
    }
  }


  render() {

    let savebuttonNotificationSettings;

    if (!this.state.countySubscriptionOpen) {
      savebuttonNotificationSettings = <Col lg={6} md={6} sm={6} xs={6} align="right">
        <Button
          bsStyle="primary"
          onClick={() => {
            this.save();
          }}
        >Lagre endringer</Button>
      </Col>;
    }

    let leftButtonText;

    if(!this.state.countySubscriptionOpen) {
      leftButtonText = <span>Legg til kommuner</span>;
    } else {
      leftButtonText = <span>Varslingsinstillinger</span>;
    }

      let settings_saved;
      if (this.state.settingsSaved) {
          settings_saved = (
              <Alert bsStyle="success">
                  <h5 style={{color: "grey"}} id="SuccessLogin">Innstillinger lagret!</h5>
              </Alert>
          )
      }

    return (
      <Grid>
        <form>

          {this.renderAddCategory(this.state.countySubscriptionOpen)}

          <Col lg={6} md={6} sm={6} xs={6}>
            <Button
                id="countySubButton"
              bsStyle="primary"
              onClick={() => this.setState({ countySubscriptionOpen: !this.state.countySubscriptionOpen, settingsSaved: false })}
              align="left">{leftButtonText}</Button>
          </Col>

          {savebuttonNotificationSettings}
          <div align="center">
            {settings_saved}
          </div>

        </form>

      </Grid>
    );
  }


  save = async () => {

    notificationSettingsService.deleteNotificationSettings()
      .catch(error => {
        console.log('Noe gikk galt ved sletting av notificationsettings: ' + 'n\ ' + error.message);
      });

    this.state.notificationSettings.map(e => {
      let elem = {
        countyId: e.countyId,
        categoryId: e.categoryId
      };
      notificationSettingsService.addNotificationSettings(elem)
        .catch(error => {
          confirm('Error when adding: ' + e + 'n\ ' + 'error: ' + error.message);
        });
    });
        this.setState({settingsSaved: true});
  };
}