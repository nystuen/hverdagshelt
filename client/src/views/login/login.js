// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import { User } from '../../classTypes';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import { UserService } from '../../services';
import { Alert } from '../../widgets';

let jwt = require('jsonwebtoken');
import FormGroup from 'react-bootstrap/es/FormGroup';
import Form from 'react-bootstrap/es/Form';
import FormControl from 'react-bootstrap/es/FormControl';
import Button from 'react-bootstrap/es/Button';

let userService = new UserService();
const bcrypt = require('bcrypt-nodejs');

interface State {
  email: string;
  password: string;
  storedPassword: string;
}//end interface

interface Props {
}

export class Login extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    storedPassword: ''
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


    render(){

      let alert_login;
      if(this.state.error){
        alert_login = (
          <Alert bsStyle="danger">
            <h6>Brukernavn eller passord er feil. Prøv igjen!</h6>
          </Alert>)
      } else {
        alert_login = (
          <p></p>
        )
      }
        return(
          <Grid>

            <Form>


              <Col xs={2} md={4}>

              </Col>

              <Col xs={8} md={4}>
                <Row className="show-grid">
                  <FormGroup>
                    <FormControl type="text" placeholder="Email" value={this.state.email}
                                 onChange={this.handleChangeEmail}/>
                  </FormGroup>
                </Row>

                <Row className="show-grid" align='center'>
                  <FormGroup>
                    <FormControl type="text" placeholder="Passord" value={this.state.password}
                                 onChange={this.handleChangePassword}/>
                  </FormGroup>
                </Row>

                <Row className="show-grid" align='center'>
                  <Button type="button" onClick={this.save} bsStyle="success">Login</Button>
                  <Button type="button" onClick={this.sjekk}>Sjekk</Button>
                </Row>

              </Col>

              <Col xs={2} md={4}>

              </Col>
            </Form>


          </Grid>
        )
    }//end method


  save = () => {
    //console.log(this.state.email);
    userService.getUserLogin(this.state.email).then(response => {
      this.setState({
        storedPassword: response[0].password
      });
      bcrypt.compare(this.state.password, response[0].password, function(err, res) {
        if (res) {
          userService.login({ userMail: response[0].mail, typeId: response[0].typeName }).then(r => {


            let token = r.jwt;
            // console.log(r.jwt);
            window.localStorage.setItem('userToken', token);
          }).catch((error: Error) => Alert.danger(error.message));
        } else {
          Alert.danger('Feil passord!');
        }//end condition
      });
    }).catch((error: Error) => Alert.danger(error.message));
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