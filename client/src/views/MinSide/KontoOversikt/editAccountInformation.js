// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import { Grid, Row, Col, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { ChooseCategory } from '../../../components/ChooseCategory/ChooseCategory';
import Button from 'react-bootstrap/es/Button';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { UserService } from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import Form from 'react-bootstrap/es/Form';
import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import { CountyList } from '../../../components/CountyList/CountyList';
import { history } from '../../../index';


let userService = new UserService();


interface State {
  decoded: Object,
  user: Object,
  chosenCounty: number
}


class AccountInfoEditCard extends React.Component<{
  firstName: string,
  lastName: string,
  county: string,
  email: string,
  phone: string
}> {

  render() {

    return (
      <div>

        <div>

          <Grid>
            <Col xs={2} md={2}>
            </Col>
            <Col xs={8} md={8}>

              <Col md={6}>
                <InformationCard header={'Navn'} content={this.props.firstName + ' ' + this.props.lastName}/>
                <InformationCard header={'Hjemmekommune'} content={this.props.county}/>
              </Col>

              <Col md={6}>
                <InformationCard header={'E-post'} content={this.props.email}/>
                <InformationCard header={'Mobilnummer'} content={this.props.phone}/>
              </Col>

            </Col>
            <Col xs={2} md={2}>
            </Col>

            <Row>
              <div align="center">
                <Button>Endre kontoinformasjon</Button>
                <Button>Endre passord</Button>
              </div>
            </Row>

            <Row>
              <div align="center">

              </div>
            </Row>

          </Grid>
        </div>

      </div>
    );
  }
}

export class editAccountInformation extends React.Component <State> {

  state = {
    decoded: jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret'),
    user: User,
    countyId: 0,
    firstName: '',
    lastName: '',
    mail: '',
    phone: ''
  };

  componentDidMount() {
    userService.getUser(this.state.decoded.email).then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
  }

  handleChangeUser() {


    if (this.state.countyId != 0) {
      this.state.user.countyId = this.state.countyId;
    }

    if (this.state.firstName != '') {
      this.state.user.firstName = this.state.firstName;
    }

    if (this.state.lastName != '') {
      this.state.user.lastName = this.state.lastName;
    }

    if (this.state.phone != '') {
      this.state.user.phone = this.state.phone;
    }


    userService.updateUser(this.state.user).then(response => {
      console.log('res', response);
    });

    history.push('/min_side/kontooversikt');

  }

  handleOnChangeCounty = (name: number) => {
    console.log('nae', name);
    this.setState({
      countyId: name
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Grid>
          <PageHeader title={'Endre kontoinformasjon'}/>

          {
            this.state.decoded.typeId === 'Admin' || this.state.decoded.typeId === 'Employee' || this.state.decoded.typeId === 'Private' ? (
              <div>
                <Form>
                  <Grid>


                    <Col xs={12} md={6}>
                      <FormGroup controlId="formInlineFirstName">
                        <ControlLabel>Fornavn</ControlLabel>{' '}
                        <FormControl onChange={this.handleChange} name="firstName" type="text" placeholder="Fornavn"
                                     defaultValue={this.state.user.firstName}/>
                      </FormGroup>{' '}


                      <FormGroup controlId="formInlinePhone">
                        <ControlLabel>Mobilnummer</ControlLabel>{' '}
                        <FormControl onChange={this.handleChange} name="phone" type="phone" placeholder="phone"
                                     defaultValue={this.state.user.phone}/>
                      </FormGroup>{' '}
                    </Col>


                    <Col xs={12} md={6}>

                      <FormGroup controlId="formInlineLastName">
                        <ControlLabel>Etternavn</ControlLabel>{' '}
                        <FormControl onChange={this.handleChange} name="lastName" type="text" placeholder="Etternavn"
                                     defaultValue={this.state.user.lastName}/>
                      </FormGroup>{' '}

                      <FormGroup controlId="formInlineHjemmekommune">
                        <ControlLabel>Hjemmekommune</ControlLabel>{' '}
                        <CountyList handleOnChangeCounty={this.handleOnChangeCounty.bind(this)}/>
                      </FormGroup>{' '}


                    </Col>

                  </Grid>
                  <div align="center">
                    <Button onClick={() => this.handleChangeUser()} align="right">Lagre Endringer</Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div>
                bedriftinfo
              </div>
            )
          }</Grid></div>
    );
  }
}