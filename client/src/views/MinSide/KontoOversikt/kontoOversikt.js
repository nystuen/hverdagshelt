// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Button from 'react-bootstrap/es/Button';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { MailService, UserService } from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ChooseCategory } from '../../../components/ChooseCategory/ChooseCategory';
import FormGroup from 'react-bootstrap/es/FormGroup';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import Form from 'react-bootstrap/es/Form';
import { ChangePassword } from '../../../components/ChangePassword/ChangePassword';

let userService = new UserService();

type State = {
  decoded: Object,
  user: Object,
  changePassword: boolean
}

class InformationCard extends React.Component<{ header: string, content: string }> {

  render() {
    return (
      <div align="center">
        <h4>{this.props.header}</h4>
        <p>{this.props.content}</p>
      </div>
    );
  }
}


class AccountInfoCard extends React.Component<{
  firstName: string,
  lastName: string,
  county: string,
  email: string,
  phone: string
}> {

  constructor(props) {
    super(props);

    this.state = {
      changePassword: false

    };

  }

  changePassword = () => {
    this.setState({
      changePassword: !this.state.changePassword
    });
  };

  render() {


    let change_password = this.state.changePassword ? (
      <ChangePassword/>) : null;

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
          </Grid>

          <div align="center">
            <Button href={'/#/min_side/editAccountInformation'}>Endre kontoinformasjon</Button>
            <Button onClick={() => this.changePassword()}>Endre passord</Button>
          </div>

        </div>
        {change_password}
      </div>
    );
  }
}


export class KontoOversikt extends React.Component <State> {

  state = {
    decoded: jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret'),
    user: User,
    value: String
  };

  componentDidMount() {
    userService.getUser(this.state.decoded.email).then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
  }


  render() {

    return (

      <Grid>
        <PageHeader title={'Kontooversikt'}/>

        {
          this.state.decoded.typeId === 'Admin' || this.state.decoded.typeId === 'Employee' || this.state.decoded.typeId === 'Private' ? (
            <div>

              <AccountInfoCard firstName={this.state.user.firstName} lastName={this.state.user.lastName}
                               county={this.state.user.county} email={this.state.user.mail}
                               phone={this.state.user.phone}/>
            </div>
          ) : (
            <div>
              bedriftinfo
            </div>
          )
        }</Grid>
    );
  }
}