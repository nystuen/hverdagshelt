import * as React from "react";
import { Component } from "react";
import { Layout } from "../widgets";

import {
Grid, Row, Col, ListGroup,ListGroupItem, Table
} from "react-bootstrap"

export class countySubscription extends Component {




    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <Table>
                            <thead>
                            <tr>
                                <td>
                                    Kommuner
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Drammen</td>
                            </tr>
                            <tr>
                                <td>Drammen</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={6} md={4}>

                    </Col>
                    <Col xsHidden md={4}>
                        <ListGroup> Mine kommuner
                            <ListGroupItem>Drammen</ListGroupItem>
                            <ListGroupItem>Drammen</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Grid>

        );
    }



}