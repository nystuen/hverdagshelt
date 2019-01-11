// @flow

import React from 'react';
import {Grid, Col, Row, Button} from "react-bootstrap";
import {ChooseCategory} from "../../components/ChooseCategory/ChooseCategory";

export class MinSide extends React.Component <{match: {params: {menuChoice: string }}}> {

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs="2">
                        <div className="border-right">
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