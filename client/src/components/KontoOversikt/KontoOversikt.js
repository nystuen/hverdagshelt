// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import {User} from "../../classTypes";
import {UserService} from "../../services";
import Button from "react-bootstrap/es/Button";

let userService = new UserService();

interface State {
    decoded: Object,
    user: User
}

export class KontoOversikt extends React.Component <State> {

state = {
    decoded : jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
    user: userService.getUser(jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret").userMail)
};

    render() {
        return(
            <Grid>
                {console.log(this.state.decoded)}
                {
                    this.state.decoded.typeId === 'User' ? (
                        <div>
                            <ListGroup>
                                <ListGroupItem header="Navn">{this.state.user.firstName + ' ' + this.state.user.lastName}</ListGroupItem>
                                <ListGroupItem header="E-post">{this.state.decoded.userMail + ' '}</ListGroupItem>
                                <ListGroupItem header="Mobiltelefon">{this.state.user.phone}</ListGroupItem>
                                <ListGroupItem header="Hjemmekommune">{this.state.user.countyId}</ListGroupItem>
                                <ListGroupItem header="Innsamlede poeng">{this.state.user.points}</ListGroupItem>

                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }

                {
                    this.state.decoded.typeId === 'Company' ? (
                        <div>
                            <ListGroup>
                                <ListGroupItem header="Bedriftens navn">test</ListGroupItem>
                                <ListGroupItem header="Kontaktperson">per</ListGroupItem>
                                <ListGroupItem header="E-post">test</ListGroupItem>
                                <ListGroupItem header="Adresse">test</ListGroupItem>
                                <ListGroupItem header="Postnummer">test</ListGroupItem>
                                <ListGroupItem header="Mobiltelefon">test</ListGroupItem>
                                <ListGroupItem header="Hjemmekommune">test</ListGroupItem>
                                <ListGroupItem header="Arbeidsområder">
                                    <ListGroup>
                                        <ListGroupItem/>
                                    </ListGroup>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }

                {
                    this.state.decoded.typeId === 'Admin' || this.state.decoded.typeId === 'Employee' ? (
                        <div>
                            <ListGroup>
                                <ListGroupItem header="Navn">{this.state.user.firstName + ' ' + this.state.user.lastName}</ListGroupItem>
                                <ListGroupItem header="E-post">{this.state.decoded.userMail + ' '}</ListGroupItem>
                                <ListGroupItem header="Mobiltelefon">{this.state.user.phone}</ListGroupItem>
                                <ListGroupItem header="Hjemmekommune">{this.state.user.countyId}</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }

                <Button bsStyle="primary" href="/#endre_informasjon">Endre informasjon</Button>

            </Grid>
        );
    }
}
