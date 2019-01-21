// @flow

import { Category, Event } from '../../../classTypes';
import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Table, Image, Panel, Button, ButtonGroup } from 'react-bootstrap';
import { getImportantEvents } from '../../../services';

// homepage for employees
export class employeeHomepage extends React.Component {

    state = {
        countyId: -1,
        importantEvents: []
    };

    render() {
        return (
            <div className="forside">
                <Grid>
                    <Col md={4}></Col>

                    <Col xs={12} md={4} align={'center'} className="buttonsAtHomepage">
                        <Button bsStyle="primary" href={'#'} bsSize="large" block>Administrer brukere</Button>

                        <Button bsStyle="primary" href={'#'} bsSize="large" block>Administrer saker</Button>
                        <Button bsStyle="primary" href={'#'} bsSize="large" block>Administrer hendelser</Button>
                        <Button bsStyle="primary" href={'#'} bsSize="large" block>Statistikk</Button>
                    </Col>

                </Grid>

            </div>

        );
    }
}