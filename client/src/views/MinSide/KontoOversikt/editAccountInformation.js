// @flow

import React from 'react';
import jwt from 'jsonwebtoken';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Alert,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel, Panel
} from 'react-bootstrap';
import { ChooseCategory } from '../../../components/ChooseCategory/ChooseCategory';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { UserService } from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { CountyList } from '../../../components/CountyList/CountyList';
import { history } from '../../../index';
import css from './accountInformation.css';

let userService = new UserService();

interface State {
  decoded: Object;
  user: Object;
  chosenCounty: number;
}

class AccountInfoEditCardCompany extends React.Component<{
  companyMail: string,
  firstName: string,
  lastName: string,
  adresse: string,
  postnr: number,
  phone: string,
  description: string,
}> {


  render() {
    return (
      <div>

        <div>
          <Grid>
            <Col xs={2} md={2}/>
            <Col xs={8} md={8}>
              <Col md={6}>
                <InformationCard
                  header={'Navn'}
                  content={this.props.firstName + ' ' + this.props.lastName}
                />
                <InformationCard
                  header={'Hjemmekommune'}
                  content={this.props.county}
                />
              </Col>

              <Col md={6}>
                <InformationCard header={'E-post'} content={this.props.email}/>
                <InformationCard
                  header={'Mobilnummer'}
                  content={this.props.phone}
                />
              </Col>
            </Col>
            <Col xs={2} md={2}/>

            <Row>
              <div align="center">
                <Button>Endre kontoinformasjon</Button>
                <Button>Endre passord</Button>
              </div>
            </Row>

            <Row>
              <div align="center"/>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
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
            <Col xs={2} md={2}/>
            <Col xs={8} md={8}>
              <Col md={6}>
                <InformationCard
                  header={'Navn'}
                  content={this.props.firstName + ' ' + this.props.lastName}
                />
                <InformationCard
                  header={'Hjemmekommune'}
                  content={this.props.county}
                />
              </Col>

              <Col md={6}>
                <InformationCard header={'E-post'} content={this.props.email}/>
                <InformationCard
                  header={'Mobilnummer'}
                  content={this.props.phone}
                />
              </Col>
            </Col>
            <Col xs={2} md={2}/>

            <Row>
              <div align="center">
                <Button>Endre kontoinformasjon</Button>
                <Button>Endre passord</Button>
              </div>
            </Row>

            <Row>
              <div align="center"/>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export class editAccountInformation extends React.Component<State> {
  state = {
    user: User,
    countyId: 0,
    firstName: '',
    lastName: '',
    mail: '',
    phone: '',
    companyMail: '',
    adresse: '',
    postnr: '',
    description: ''
  };

  componentDidMount() {
    if (this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private') {
      userService.getCurrentUser().then(newUser => {
        window.sessionStorage.setItem('countyId', newUser[0].countyId);
        window.sessionStorage.setItem('countyName', newUser[0].county);
        this.setState({
          user: newUser[0]
        });
      });
    } else {
      userService.getCurrentUser().then(newUser => {
        window.sessionStorage.setItem('countyName', '');
        this.setState({
          user: newUser[0]
        });
      });
    }
  }

  handleChangeUser() {

    if (this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private') {
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
        window.location.reload();
      });

      history.push('/min_side/kontooversikt');
    } else {

      /*

        companyMail: string,
  firstName: string,
  lastName: string,
  adresse: string,
  postnr: number,
  phone: string,
  description: string,

       */

      if (this.state.firstName != '') {
        this.state.user.firstName = this.state.firstName;
      }

      if (this.state.lastName != '') {
        this.state.user.lastName = this.state.lastName;
      }

      if (this.state.phone != '') {
        this.state.user.phone = this.state.phone;
      }
      if (this.state.companyMail != 0) {
        this.state.user.companyMail = this.state.companyMail;
      }

      if (this.state.companyName != 0) {
        this.state.user.companyName = this.state.companyName;
      }

      if (this.state.adresse != '') {
        this.state.user.adresse = this.state.adresse;
      }

      if (this.state.description != '') {
        this.state.user.description = this.state.description;
      }

      if (this.state.postnr != '') {
        this.state.user.postnr = this.state.postnr;
      }

      userService.updateUser(this.state.user).then(response => {
        console.log('res', response);
        window.location.reload();
      });

      history.push('/min_side/kontooversikt');
    }


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


  buttonBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="bottomFooter editInfo">
        <Grid>
          <PageHeader title={'Endre kontoinformasjon'}/>

          {this.state.user.typeName === 'Admin' ||
          this.state.user.typeName === 'Employee' ||
          this.state.user.typeName === 'Private' ? (
            <div>
              <Form>
                <Grid>
                  <Col xs={0} md={2}>
                    <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
                  </Col>

                  <Col md={8}>

                    <Col xs={12} md={6}>
                      <FormGroup controlId="formInlineFirstName">
                        <ControlLabel>Fornavn</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="firstName"
                          type="text"
                          placeholder="Fornavn"
                          defaultValue={this.state.user.firstName}
                        />
                      </FormGroup>{' '}
                      <FormGroup controlId="formInlinePhone">
                        <ControlLabel>Mobilnummer</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="phone"
                          type="phone"
                          placeholder="phone"
                          defaultValue={this.state.user.phone}
                        />
                      </FormGroup>{' '}
                    </Col>

                    <Col xs={12} md={6}>
                      <FormGroup controlId="formInlineLastName">
                        <ControlLabel>Etternavn</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="lastName"
                          type="text"
                          placeholder="Etternavn"
                          defaultValue={this.state.user.lastName}
                        />
                      </FormGroup>{' '}
                      <FormGroup controlId="formInlineHjemmekommune">
                        <ControlLabel>Hjemmekommune</ControlLabel>{' '}
                        <CountyList
                          handleOnChangeCounty={this.handleOnChangeCounty.bind(
                            this
                          )}
                        />
                      </FormGroup>{' '}
                    </Col>
                  </Col>

                  <Col xs={0} md={8}>
                  </Col>
                </Grid>
                <div align="center">
                  <Button id="accountInformationButton" bsStyle="primary" onClick={() => this.handleChangeUser()}
                          align="right">
                    Lagre Endringer
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
<div>
              <Form>
                <Grid>
                  <Col xs={0} md={2}>
                    <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
                  </Col>


                  <Col md={8}>

                    <Col xs={12} md={12}>


                      <Panel className="contact">
                        <h4 align="center">Kontaktperson</h4>
                        <Panel.Body>
                          <FormGroup controlId="formInlineFirstName">
                            <ControlLabel>Fornavn</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="firstName"
                              type="text"
                              placeholder="Fornavn"
                              defaultValue={this.state.user.firstName}
                            />
                          </FormGroup>{' '}
                          <FormGroup controlId="formInlineLastName">
                            <ControlLabel>Etternavn</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="lastName"
                              type="text"
                              placeholder="Etternavn"
                              defaultValue={this.state.user.lastName}
                            />
                          </FormGroup>{' '}
                          <FormGroup controlId="formInlinePhone">
                            <ControlLabel>Mobilnummer</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="phone"
                              type="phone"
                              placeholder="phone"
                              defaultValue={this.state.user.phone}
                            />
                          </FormGroup>{' '}
                        </Panel.Body>
                      </Panel>
                    </Col>
                    <Col xs={12} md={12}>

                      <Panel className="contact">
                        <h4 align="center">Bedriften</h4>
                        <Panel.Body>
                          <FormGroup controlId="formInlineCompanyMail">
                            <ControlLabel>Bedriftens e-post</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="companyMail"
                              type="text"
                              placeholder="Bedriftens epost"
                              defaultValue={this.state.user.companyMail}
                            />
                          </FormGroup>{' '}

                          <FormGroup controlId="formInlineOrgNumber">
                            <ControlLabel>Organisasjonsnummer</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="orgNumber"
                              type="text"
                              placeholder="Organisasjonsnummer"
                              defaultValue={this.state.user.orgNumber}
                            />
                          </FormGroup>{' '}

                          <FormGroup controlId="formInlineDescription">
                            <ControlLabel>Bedriftens beskrivelse</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="description"
                              type="text"
                              placeholder="Bedriftens beskrivelse"
                              defaultValue={this.state.user.description}
                            />
                          </FormGroup>{' '}

                          <FormGroup controlId="formInlineAdresse">
                            <ControlLabel>Adresse</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="adresse"
                              type="text"
                              placeholder="Bedriftens adresse"
                              defaultValue={this.state.user.adresse}
                            />
                          </FormGroup>{' '}

                          <FormGroup controlId="formInlinePostnr">
                            <ControlLabel>Postnummer</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="postnr"
                              type="text"
                              placeholder="Postnummer"
                              defaultValue={this.state.user.postnr}
                            />
                          </FormGroup>{' '}
                        </Panel.Body>
                      </Panel>
                    </Col>
                  </Col>
                  <Col xs={0} md={8}>
                  </Col>
                </Grid>
                <div align="center">
                  <Button id="accountInformationButton" bsStyle="primary" onClick={() => this.handleChangeUser()}
                          align="right">
                    Lagre Endringer
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Grid>
      </div>
    );
  }
}


