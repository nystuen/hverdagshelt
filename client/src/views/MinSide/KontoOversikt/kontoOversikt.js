// @flow


import React from 'react';
import jwt from 'jsonwebtoken';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ChooseCategory } from '../../../components/ChooseCategory/ChooseCategory';
import Button from 'react-bootstrap/es/Button';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { MailService, UserService } from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';

let userService = new UserService();


interface State {
  decoded: Object,
  user: Object
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
          </Grid>

          <div align="center">
            <Button href={'/#/min_side/editAccountInformation'}>Endre kontoinformasjon</Button>
            <Button>Endre passord</Button>
          </div>

        </div>

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
          this.state.decoded.typeId === 'Admin' || this.state.decoded.typeId === 'Employee' || this.state.decoded.typeId === 'User' ? (
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