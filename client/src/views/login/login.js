// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import { User } from '../../classTypes';
import Container from 'reactstrap/es/Container';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import Input from 'reactstrap/es/Input';
import { UserService } from '../../services';
import { Alert } from 'react-bootstrap';

let jwt = require('jsonwebtoken');
import FormGroup from 'react-bootstrap/es/FormGroup';
import Form from 'react-bootstrap/es/Form';
import FormControl from 'react-bootstrap/es/FormControl';
import Button from 'react-bootstrap/es/Button';
import Grid from 'react-bootstrap/es/Grid';
import login from './login.css';
import {history} from "../../index";
import Image from "react-bootstrap/es/Image";

let userService = new UserService();
const bcrypt = require('bcrypt-nodejs');

interface State {
  error: boolean;
  email: string;
  password: string;
  storedPassword: string;
  countyId: 0,
  string: './logo.png'
}//end interface

interface Props {
}

export class Login extends Component<Props, State> {
  state = {
    error: false,
    email: '',
    password: '',
    storedPassword: '',
    countyId: 0,
    string: './logo.png'
  };

  handleChangeEmail = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      email: event.target.value
    });
  };

  handleChangePassword = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      password: event.target.value
    });
  };


  render() {

    let alert_login;

    if (this.state.error) {
      alert_login = (
        <Alert bsStyle="danger">
          <h6>Brukernavn eller passord er feil. Prøv igjen!</h6>
        </Alert>);
    } else {
      alert_login = (
        <p></p>
      );
    }


    return (

      <div>
        <Grid>
          <Form>
            <Col xs={5} md={4}>
            </Col>

            <Col xs={2} md={4}>
              <div className="center">
                <Image className="picture"
                       src={'.client/public/login.png'}
                       rounded/>
              </div>

              <div className="loginBox">

                <Row className="show-grid">
                  <FormGroup>
                    <FormControl type="text" placeholder="Email" value={this.state.email}
                                 onChange={this.handleChangeEmail.bind(this)}/>
                  </FormGroup>
                </Row>

                <Row className="show-grid" align='center'>
                  <FormGroup>
                    <FormControl type="password" placeholder="Passord" value={this.state.password}
                                 onChange={this.handleChangePassword.bind(this)}/>
                  </FormGroup>
                </Row>

                <Row className="show-grid" align='center'>
                  <Button type="button" onClick={this.save} bsStyle="success">Login</Button>
                  <Button type="button" onClick={this.sjekk}>Sjekk</Button>
                  {alert_login}
                </Row>

                <div align="center">
                  <p>Har du ikke bruker?</p>

                  <p>Registrer deg <a href={'/#/register'}>her</a> hvis du er privatperson, og <a
                      href="/#/register/company"> her</a> hvis du er
                    bedrift.</p>
                </div>

              </div>
            </Col>

            <Col xs={5} md={4}>
            </Col>
          </Form>
        </Grid>
      </div>
    );
  }//end method

  save = () => {
    //console.log(this.state.email);
    userService.getUserLogin(this.state.email).then(response => {
      this.setState({
        countyId: response[0].countyId,
        storedPassword: response[0].password
      });

      bcrypt.compare(this.state.password, response[0].password, (err, res) => {
        if (res) {
          userService.login({ userMail: response[0].mail, typeId: response[0].typeName }).then(r => {
            let token = r.jwt;
            window.localStorage.setItem('userToken', token);
            console.log('login in success');

            history.push('/forside/' + this.state.countyId);

          }).catch((error: Error) => Alert.danger(error.message));
        } else { //check if the email is a company email
            userService.getCompanyLogin(this.state.email).then(r => {
              bcrypt.compare(this.state.password, r[0].password, (err,res) => {
                if(res){
                  userService.login({ userMail: r[0].mail, typeId: 'Company' }).then(r => {
                    let token = r.jwt;
                    window.localStorage.setItem('userToken', token);
                    console.log('login in success');
                    history.push('/#forside/2');
                  }).catch((error: Error) => Alert.danger(error.message));
                }else{
                  this.setState({
                    error: true
                  });
                }//end condition
              });
            }).catch((error: Error) => {
              console.log(error);
              this.setState({
                error: true
              });
            });
        }//end condition
      });
    }).catch((error: Error) => {
      userService.getCompanyLogin(this.state.email).then(r => {
        bcrypt.compare(this.state.password, r[0].password, (err,res) => {
          if(res){
            userService.login({ userMail: this.state.email, typeId: 'Company' }).then(r => {
              let token = r.jwt;
              window.localStorage.setItem('userToken', token);
              console.log('login in success');
              history.push('/#forside/2');
            }).catch((error: Error) => Alert.danger(error.message));
          }else{
            this.setState({
              error: true
            });
          }//end condition
        });
      }).catch((error: Error) => {
        console.log(error);
        this.setState({
          error: true
        });
      });
    });
  };//end method

  sjekk = () => {
    let decoded = jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret');
    console.log(decoded.email + '\n' + 'type: ' + decoded.typeId);
    userService.getUser(decoded.email)
      .then(e => {
        console.log(e);
      });
  };

}//end class
