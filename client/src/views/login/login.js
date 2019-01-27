// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import { User } from '../../classTypes';
import { UserService } from '../../services';
import { Alert, FormGroup, Form, FormControl, Button, Grid, Image, Row, Col } from 'react-bootstrap';

let jwt = require('jsonwebtoken');
import login from './login.css';
import { history } from '../../index';

let userService = new UserService();
const bcrypt = require('bcrypt-nodejs');

interface State {
  error: boolean;
  email: string;
  password: string;
  storedPassword: string;
  countyId: 0;
  string: './logo.png';
  openPassword: string;
  blocked: boolean;
} //end interface

interface Props {
  notLoggedIn: boolean;
} //end interface

/**
 * @class Login
 */

export class Login extends Component<Props, State> {
  state = {
    error: false,
    blocked: false,
    email: '',
    password: '',
    storedPassword: '',
    countyId: 0,
    string: './logo.png',
    openPassword: 'password',
    isLoading: false
  };

  handleChangeEmail(event: SyntheticEvent<HTMLButtonElement>) {
    this.setState({
      email: event.target.value
    });
  };

  handleChangePassword(event: SyntheticEvent<HTMLButtonElement>) {
    this.setState({
      password: event.target.value
    });
  };

  /**
   * Shows the password that's been written
   *
   * @method handleClickPassword
   * @reutrns void
   */
  handleClickPassword = () => {
    if (this.state.openPassword == 'text') {
      this.setState({ openPassword: 'password' });
    } else {
      this.setState({ openPassword: 'text' });
    }
  };

  /**
   * logs in when enter is pressed
   *
   * @method handleKeyPress
   * @param event
   * @returns void
   */
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.save();
    }
  };


  render() {
    window.onload = function() {
      if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }//end condition
    };

    let alert_login;

    if (this.state.error) {
      alert_login = (
        <Alert bsStyle="danger">
          <h6>Brukernavn eller passord er feil. Prøv igjen!</h6>
        </Alert>
      );
    } else if (this.state.blocked) {
      alert_login = (
        <Alert bsStyle={'danger'}>
          <h5> Du er blokkert fra å bruke hverdagshelt!
            Dersom du mener det har skjedd en feil, kontakt oss på hverdagshelt.scrum@gmail.com
          </h5>
        </Alert>
      );
    }
    else {
      alert_login = <p/>;
    }

    let alert_notLoggedIn;
    if (this.props.notLoggedIn) {
      alert_notLoggedIn = confirm('Du må være logget inn for å gå videre');
    } else {
      <p/>;
    } //end condition


    let changeIcon;

    if (this.state.openPassword == 'text') {
      changeIcon = (<i className="fas fa-eye"></i>);
    } else {
      changeIcon = (<i className="fas fa-eye-slash"></i>);
    }

    const { isLoading } = this.state;


    return (
      <div className="login backgroundImage">

        <Grid>
          <Form>
            <Col sm={2} md={3}/>

            <Col sm={8} md={6}>
              <div align="center">
                <Image
                  className="picture"
                  src={'./resources/logo_white.png'}
                  rounded
                />
              </div>

              <div className="loginBox" onKeyPress={this.handleKeyPress}>
                <Row className="show-grid">
                  <FormGroup>
                    <FormControl
                      type="email"
                      id="mailText"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail.bind(this)}
                    />
                  </FormGroup>
                </Row>

                <Row className="show-grid" align="center">
                  <FormGroup>
                    <FormControl
                      type={this.state.openPassword}
                      id="passText"
                      placeholder="Passord"
                      value={this.state.password}
                      onChange={this.handleChangePassword.bind(this)}
                    />
                  </FormGroup>

                </Row>

                <Row className="show-grid" align="center">
                  <Button type="button" disabled={isLoading} onClick={!isLoading ? this.save : null} bsStyle="primary">
                    {isLoading ? 'Logger inn...' : 'Login'}
                  </Button>
                  <Button type="button" onClick={() => this.handleClickPassword()}>{changeIcon}</Button>
                  {alert_login}
                  {alert_notLoggedIn}
                </Row>

                <div align="center">
                  <p>Har du ikke bruker?</p>

                  <p>Registrer deg <a href={'/#/registrer/privat'}>her hvis du er privatperson</a>, og <a
                    href="/#/registrer/bedrift"> her hvis du er

                    bedrift.</a></p>
                  <p>
                    <a href={'/#/forgotPassword'}>Glemt passord</a>
                  </p>
                </div>
              </div>
            </Col>

            <Col sm={2} md={3}/>
          </Form>
        </Grid>
      </div>
    );
  } //end method
  /**
   * checks if the mail and password is registered in the database and logs the user in
   *
   * @method save
   * @returns {Promise<void>}
   */
  save = async () => {
    if (confirm('Ved å logge inn på Hverdagshelt.no godtar du at vi lagrer ' +
      'cookies med informasjon om brukernavnet  ditt og hvilken type bruker du er (privat / bedrift)')) {
      await userService
        .getUserLogin(this.state.email)
        .then(response => {
          if (response[0].active === 1) {
            this.setState({
              countyId: response[0].countyId,
              storedPassword: response[0].password
            });
          } else {
            this.setState({ blocked: true });
            return;
          }

          bcrypt.compare(this.state.password, response[0].password, (err, res) => {
            if (res) {
              userService.login({ userMail: response[0].mail, typeId: response[0].typeName }).then(r => {
                let token = r.jwt;
                window.localStorage.setItem('userToken', token);
                userService.getCurrentUser().then(r3 => {
                  window.sessionStorage.setItem('countyId', r3[0].countyId);
                  window.sessionStorage.setItem('countyName', r3[0].county);
                });

                setTimeout(() => {
                  // Completed of async action, set loading state back
                  this.setState({ isLoading: false });
                  window.location.href = '/#/';
                  window.location.reload();
                }, 500);


              }).catch((error: Error) => confirm(error.message));
            } else { //check if the email is a company email
              userService.getCompanyLogin(this.state.email).then(r => {
                bcrypt.compare(this.state.password, r[0].password, (err, res) => {
                  if (res) {
                    userService.login({ userMail: r[0].mail, typeId: 'Company' }).then(r => {
                      let token = r.jwt;
                      window.localStorage.setItem('userToken', token);

                      setTimeout(() => {
                        // Completed of async action, set loading state back
                        this.setState({ isLoading: false });
                        window.location.href = "/#/";
                        window.location.reload();
                      }, 500);
                    }).catch((error: Error) => confirm(error.message));
                  } else {
                    this.setState({

                      isLoading: false,
                      error: true
                    });
                  }//end condition
                });
              }).catch((error: Error) => {
                this.setState({
                  isLoading: false,
                  error: true

                });
              });
            }//end condition
          });
        }).catch((error: Error) => {
          userService.getCompanyLogin(this.state.email).then(r => {
            bcrypt.compare(this.state.password, r[0].password, (err, res) => {
              if (res) {
                userService.login({ userMail: this.state.email, typeId: 'Company' }).then(r => {
                  let token = r.jwt;
                  window.localStorage.setItem('userToken', token);


                  setTimeout(() => {
                    // Completed of async action, set loading state back
                    this.setState({ isLoading: false });
                    window.location.href = "/#/";
                    window.location.reload();

                  }, 500);
                }).catch((error: Error) => {
                  this.setState({
                    isLoading: false,
                    error: true
                  });
                });
              } else {
                this.setState({
                  isLoading: false,
                  error: true
                });
              }//end condition
            });
          }).catch((error: Error) => {
            this.setState({
              isLoading: false,
              error: true
            });
          });
        });
    } else {
      window.location.reload();
    }
    //end method
  };
} //end class
