// @flow


import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { MailService, UserService } from '../../../services';
import { PageHeader } from '../../../components/pageHeader/PageHeader';
import { ChangePassword } from '../../../components/changePassword/ChangePassword';
import css from './accountInformation.css';

import { Panel } from 'react-bootstrap';

let userService = new UserService();

type State = {
  decoded: Object,
  user: Object,
  changePassword: boolean
}

export class InfoModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    return (

      <Col>
        <Button
          bsStyle="primary"
          onClick={() => this.setState({ show: true })}
        >
          <i className="fas fa-info"></i>
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Informasjon om poengssystemet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Du får 10 poeng for hvert problem du varsler om som blir fullført.
            Disse poengene kan du bruke på gratis parkering i din kommune.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }

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

class CompanyInfoCard extends React.Component<{
  companyMail: string,
  companyName: string,
  firstName: string,
  lastName: string,
  adresse: string,
  postnr: number,
  phone: string,
  description: string,
  orgNumber: string
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
      <ChangePassword open={this.state.changePassword}/>) : null;

    return (
      <div>
        <Grid>
          <Col md={2}>
          </Col>
          <Col md={8}>


            <Panel>
              <Panel.Body>
                <Col md={6}>
                  <InformationCard header={'Bedriftens navn'} content={this.props.companyName}/>

                  <InformationCard header={'Kontaktperson'}
                                   content={this.props.firstName + ' ' + this.props.lastName}/>
                  <InformationCard header={'Kontaktpersonens mobilnummer'} content={this.props.phone}/>
                </Col>

                <Col md={6}>
                  <InformationCard header={'E-post'} content={this.props.companyMail}/>
                  <InformationCard header={'Beskrivelse'} content={this.props.description}/>
                  <InformationCard header={'Organisasjonsnummer'} content={this.props.orgNumber}/>

                </Col>
              </Panel.Body>
            </Panel>

            <div align="center">
              <Col xs={12} md={6} sm={6} lg={6}>
                <Button id="accountInformationButton" bsStyle="primary" href={'/#/endreKontoinformasjon'}>Endre
                  kontoinformasjon</Button>
              </Col>
              <Col xs={12} md={6} sm={6} lg={6}>
                <Button id="accountInformationButton" bsStyle="primary" onClick={() => this.changePassword()}>Endre
                  passord</Button>
              </Col>
            </div>


            {change_password}
          </Col>
          <Col md={2}>
          </Col>
        </Grid>
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
      <ChangePassword open={this.changePassword.bind()}/>) : null;

    return (
      <div>

        <div>
          <Grid>
            <Col md={2}>
            </Col>
            <Col md={8}>

              <Panel>
                <Panel.Body>
                  <Col md={6}>
                    <InformationCard header={'Navn'} content={this.props.firstName + ' ' + this.props.lastName}/>
                    <InformationCard header={'Hjemmekommune'} content={this.props.county}/>
                    <InformationCard header={'Mine poeng'} content={this.props.points}/>
                  </Col>

                  <Col md={6}>
                    <InformationCard header={'E-post'} content={this.props.email}/>
                    <InformationCard header={'Mobilnummer'} content={this.props.phone}/>
                  </Col>
                </Panel.Body>
              </Panel>

              <div align="center">
                <Col md={6} sm={6} lg={6}>
                  <Button id="accountInformationButton" bsStyle="primary" href={'/#/endreKontoinformasjon'}>Endre
                    kontoinformasjon</Button>
                </Col>
                <Col md={6} sm={6} lg={6}>
                  <Button id="accountInformationButton" bsStyle="primary" onClick={() => this.changePassword()}>Endre
                    passord</Button>
                </Col>
              </div>

              {change_password}
            </Col>
            <Col md={2}>
              <InfoModule/>
            </Col>
          </Grid>


        </div>
      </div>
    );
  }
}

export class accountOverview extends React.Component <State> {

  state = {
    user: User,
    value: String
  };

  componentDidMount() {
    userService.getCurrentUser().then(newUser => {
      this.setState({
        user: newUser[0]
      }, () => {
        if (this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private') {
          window.sessionStorage.setItem('countyId', newUser[0].countyId);
          window.sessionStorage.setItem('countyName', newUser[0].county);
        } else {
          window.sessionStorage.setItem('countyName', '');
        }
      });
    });
  }

  render() {

    return (

      <Grid className="bottomFooter">
        <PageHeader title={'Kontooversikt'}/>

        {
          this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private' ? (


            <AccountInfoCard firstName={this.state.user.firstName} lastName={this.state.user.lastName}
                             county={this.state.user.county} email={this.state.user.mail}
                             phone={this.state.user.phone}
                             points={this.state.user.points}
            />

          ) : (
            <CompanyInfoCard companyMail={this.state.user.companyMail} companyName={this.state.user.companyName}
                             firstName={this.state.user.firstName} lastName={this.state.user.lastName}
                             adresse={this.state.user.adresse} postnr={this.state.user.postnr}
                             phone={this.state.user.phone} description={this.state.user.description}
                             orgNumber={this.state.user.orgNumber}/>
          )
        }</Grid>
    );
  }
}