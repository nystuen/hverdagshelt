import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import {Component} from 'react';
import * as React from 'react';
import {history} from "../../index";


export class RegNew extends Component<Props, State>{
    render(){
        return(
        <Grid>
            <Col md={3}>
            </Col>
            <Col md={6}>
                <Col md={12}>
                    <PageHeader>
                    Bruker ble registrert!

                        <small>Email med passord er sendt</small>
                    </PageHeader>
                </Col>
                <Col md={12}>

                </Col>
                <Col md={12}>
                    <Button type="button" onClick={this.goToRegisterAdmin}>Lag ny admin</Button>
                    <Button type="button" onClick={this.goToRegisterEmployee}>Lag ny kommuneansatt</Button>
                    <Button type="button" onClick={this.goToMinSide}>Gå til min side</Button>
                </Col>
            </Col>
            <Col md={3}/>
        </Grid>
        )
    }
    goToRegisterAdmin = () => {
        history.push('/registrer/admin');
    };
    goToRegisterEmployee = () =>{
        history.push('/registrer/kommuneansatt')
    };
    goToMinSide = () =>{
        history.push('/admin')
    };
}