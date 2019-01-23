// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { MailService, UserService } from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ChangePassword } from '../../../components/ChangePassword/ChangePassword';

let userService = new UserService();

type State = {
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
    user: User,
    value: String
  };

  componentDidMount() {
    userService.getCurrentUser().then(newUser => {
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
          this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private' ? (
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