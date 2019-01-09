// @flow

import React from 'react';
import {MinSideMenu} from "../../components/MinSideMenu/MinSideMenu";
import {Container, Col, Row} from "reactstrap";

export class MinSide extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="3">
                        <div>
                            <MinSideMenu type='privat'/>
                        </div>
                    </Col>
                    <Col xs="7">
                        <h1>Min Side</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}