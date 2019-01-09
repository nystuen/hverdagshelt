// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import {User} from "../../classTypes";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import {UserService} from "../../services";
import {Alert} from "../../widgets";

let userService = new UserService();
const bcrypt = require('bcrypt-nodejs');

export class Login extends Component{
    user = {};
    render(){
        return(
            <Container>
                <div className="container text-md-center">
                    <br/>
                    <h2>Login</h2>
                    <br/>
                    <br/>
                    <br/>
                    <form>
                        <Row>
                            <Col>
                                <Input placeholder='Email'
                                   type="text"
                                   value={this.user.email}
                                   onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.user.email = event.target.value)}/>
                            </Col>
                            <Col>
                                <Input placeholder='Passord'
                                    type="text"
                                    value={this.user.password}
                                    onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.user.password = event.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <button type="button" className="btn btn-dark float-left" onClick={this.save}>
                                Login
                            </button>
                            </Col>
                            <Col> </Col>
                        </Row>
                    </form>
                </div>
            </Container>
        )
    }//end method
    
}//end class
