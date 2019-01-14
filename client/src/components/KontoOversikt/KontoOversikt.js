// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

interface State {
    decoded: Object
}

export class KontoOversikt extends React.Component <State> {

state = {
    decoded : jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret")

};


    render() {
        return(
            <Grid>
                {console.log(this.state.decoded)}
                {
                    this.state.decoded.typeId === 'User' ? (
                        <div>
                            <ListGroup>
                                <ListGroupItem header="Navn">per</ListGroupItem>
                                <ListGroupItem header="E-post">test</ListGroupItem>
                                <ListGroupItem header="Adresse">test</ListGroupItem>
                                <ListGroupItem header="Postnummer">test</ListGroupItem>
                                <ListGroupItem header="Mobiltelefon">test</ListGroupItem>
                                <ListGroupItem header="Hjemmekommune">test</ListGroupItem>
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
                                <ListGroupItem header="Bedriftens navn">data</ListGroupItem>
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
                                <ListGroupItem header="Fornavn">per</ListGroupItem>
                                <ListGroupItem header="Etternavn">sandberg</ListGroupItem>
                                <ListGroupItem header="E-post">test</ListGroupItem>
                                <ListGroupItem header="Adresse">test</ListGroupItem>
                                <ListGroupItem header="Postnummer">test</ListGroupItem>
                                <ListGroupItem header="Mobiltelefon">test</ListGroupItem>
                                <ListGroupItem header="Hjemmekommune">test</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
            </Grid>
        );
    }
}
