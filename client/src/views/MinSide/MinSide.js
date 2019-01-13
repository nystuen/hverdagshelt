// @flow

import React from 'react';
import {MinSideMenu} from "../../components/MinSideMenu/MinSideMenu";
import {Grid, Col, Row} from "react-bootstrap";

export class MinSide extends React.Component <{match: {params: {menuChoice: string }}}> {

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs="2">
                        <div className="border-right">
                            <MinSideMenu type='privat'/>
                        </div>
                    </Col>
                    <Col xs="8">
                        <h1>Min Side</h1>
                    </Col>
                </Row>
            </Grid>
        );
    }
}