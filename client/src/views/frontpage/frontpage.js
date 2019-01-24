import { Col, Button, Form, FormGroup, Label, Grid } from 'react-bootstrap';
import { CountyService } from '../../services';
import { Component } from 'react';
import * as React from 'react';
import { Alert } from '../../widgets';
import ReactDOM from 'react-dom';
//import {County} from "../../classTypes";
import css from './frontpage.css';
import {history} from "../../index";

import Select from 'react-select';

let countyService = new CountyService();
import logo from './osloBackground.png';


export class Frontpage extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            choosen: { label: 'Bergen', countyId: 1 },
            values: [
                { label: 'Bergen', countyId: 1 }
            ],
            background: logo
        };

        this.handleChangeCounty = this.handleChangeCounty.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeCounty(e: Object) {
        console.log(e);
        this.setState({
            choosen: e
        });
    };

    handleClick() {
        window.sessionStorage.setItem('countyId', this.state.choosen.value);
        console.log(window.sessionStorage.getItem('countyId'));
        window.sessionStorage.setItem('countyName', this.state.choosen.label);
        console.log(window.sessionStorage.getItem('countyName'));
        history.push('/wizardForm/');
    };

    componentWillMount() {
        var arr = [];
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => {
                    var elem = {
                        name: e.name,
                        countyId: e.countyId
                    };
                    arr = arr.concat(elem);

                });
                this.setState({
                    values: arr
                });
            })
            .catch((error: Error) => Alert.danger(error.message));

    }

    render() {
        let optionTemplate = this.state.values.map(v => {
            var data = { label: v.name, value: v.countyId, countyId: v.countyId };
            return (data);
        });
        return (
            <div className="frontpage">
                <Grid className="chooseCounty">
                    <Form>
                        <Col xs={1} md={4}>
                        </Col>

                        <Col xs={10} md={4}>
                            <FormGroup>
                                <Select
                                    placeholder={'Klikk her for å velge kommune'}
                                    options={optionTemplate}
                                    className="frontpage-county"
                                    onChange={this.handleChangeCounty}
                                />
                            </FormGroup>

                            <div align="center">
                                <Button bsStyle="primary" className={'frontpage-button'} onClick={() => this.handleClick()}>Gå
                                    videre!</Button>
                            </div>
                        </Col>

                        <Col xs={1} md={4}>
                        </Col>
                    </Form>
                </Grid>
            </div>
        );
    }

}
