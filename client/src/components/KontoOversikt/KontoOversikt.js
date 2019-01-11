// @flow


import React from 'react';
import {Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

export class KontoOversikt extends React.Component <{type: string}> {
    render() {
        return(
            <Grid>
                {
                    this.props.type === 'person' ? (
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
                    this.props.type === 'bedrift' ? (
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
                    this.props.type === 'person' ? (
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