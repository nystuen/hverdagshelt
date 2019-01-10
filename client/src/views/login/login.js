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

interface State {
    email: string;
    password: string;
    storedPassword: string;
}//end interface

interface Props{}

export class Login extends Component<Props,State>{
    state = {
        email: '',
        password: '',
        storedPassword: '',
    };

    handleChangeEmail = (event: SyntheticEvent<HTMLButtonElement>) => {
        this.setState({
            email: event.target.value,
        })
    };

    handleChangePassword = (event: SyntheticEvent<HTMLButtonElement>) => {
      this.setState({
          password: event.target.value,
      })
    };


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
                                   value={this.state.email}
                                   onChange={this.handleChangeEmail}/>
                            </Col>
                            <Col>
                                <Input placeholder='Passord'
                                    type="text"
                                    value={this.state.password}
                                    onChange={this.handleChangePassword}/>
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


    save = () =>{
        console.log(this.state.email);
        userService.getUserLogin(this.state.email).then(response => {
            this.setState({
                storedPassword: response[0].password,
            });
            console.log(this.state.storedPassword);
            bcrypt.compare(this.state.password, response[0].password,function (err,res) {
               if(res){
                    userService.login(response[0].mail).then(r => {
                        ///
                    }).catch((error:Error) => Alert.danger(error.message));
               } else{
                   Alert.danger('Feil passord!');
               }//end condition
            });
        }).catch((error:Error) => Alert.danger(error.message));
    }//end method

}//end class
