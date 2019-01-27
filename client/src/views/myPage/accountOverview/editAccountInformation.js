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
  ControlLabel,
  Panel
} from 'react-bootstrap';
import { ChooseCategory } from '../../../components/chooseCategory/ChooseCategory';
import { Category, Category2, Category3, User } from '../../../classTypes';
import { UserService } from '../../../services';
import { PageHeader } from '../../../components/pageHeader/PageHeader';
import { CountyList } from '../../../components/countyList/CountyList';
import { history } from '../../../index';
import css from './accountInformation.css';
import { CountyService } from '../../../services';
import Select from 'react-select';

let userService = new UserService();
let countyService = new CountyService();

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
    companyName: '',
    adresse: '',
    postnr: '',
    description: '',
    values: [
      { label: 'Bergen', value: 1 }
    ],
    countySubscription: [],
    defaultCounties: [{ label: 'Bergen', value: 1 }]
  };


  componentWillMount() {
    if (this.state.user.typeName === 'Admin' || this.state.user.typeName === 'Employee' || this.state.user.typeName === 'Private') {
      userService.getCurrentUser().then(newUser => {
        window.sessionStorage.setItem('countyId', newUser[0].countyId);
        window.sessionStorage.setItem('countyName', newUser[0].county);
        this.setState({
          user: newUser[0]
        });
      });
    } else {
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


      userService.getCurrentUser().then(newUser => {
        window.sessionStorage.setItem('countyName', '');

        let companyCounties = [];

        newUser.map(e => {
          companyCounties.push(e.countyId);
        });


        let companyCountiesWithNames = [];

        this.state.values.map(value => {

          companyCounties.map(e => {
            if (value.countyId == e) {

              companyCountiesWithNames.push({ label: value.name, value: value.countyId });
              this.setState({
                user: newUser[0],
                defaultCounties: companyCountiesWithNames
              });
            }
          });
        });


        this.setState({
          user: newUser[0],
          defaultCounties: companyCountiesWithNames
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
        window.location.reload();
      });

      history.push('/kontoinnstillinger');
    } else {


      /*


      userService.updateUser(this.state.user).then(response => {
        window.location.reload();
      });

      history.push('/min_side/kontooversikt');

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

      if (this.state.companyName != '') {
        this.state.user.companyName = this.state.companyName;
      }

      if (this.state.description != '') {
        this.state.user.description = this.state.description;
      }

      if (this.state.adresse != '') {
        this.state.user.adresse = this.state.adresse;
      }

      if (this.state.postnr != '') {
        this.state.user.postnr = this.state.postnr;
      }


      userService.updateOneCompany(this.state.user).then(res => {
      });


      if (this.state.countyIsChanged) {
        let counties = [];

        this.state.countySubscription.map(county => {
          counties.push({ countyId: county.value });
        });


        if (!(counties.length < 1)) {

          userService.deleteCompanyCounties(this.state.user.companyMail).then(res => {

            counties.map(county => {
              userService.insertCompanyCounty(county.countyId, this.state.user.companyMail).then(insert => {
              });
            });
          }).then(e => {
            history.push('/kontoinnstillinger');
          });
        } else {
          history.push('/kontoinnstillinger');
        }
      } else {
        history.push('/kontoinnstillinger');
      }


    }


  }


  handleOnChangeCounty = (name: number) => {
    console.log('nae', name);
    this.setState({
      countyId: name
    });
  };


  handleChangeCountyCompany = (e: Object) => {
    this.setState({
      countySubscription: e,
      countyIsChanged: true
    });
  };


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  buttonBack() {
    this.props.history.goBack();
  }
    getValidationStateFirstName() {
        const firstNameLength = this.state.firstName.length;
        let decimal=/^[A-Za-z _æøå]*[A-Za-zæøå][A-Za-z _æøå]*$/;

        if(firstNameLength===1){
            return 'warning';
        } else if(firstNameLength===0) return ;
        else if(this.state.firstName.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    getValidationStateLastName() {
        const lastNameLength = this.state.lastName.length;
        let dec=/^[A-Za-z _æøå]*[A-Za-zæøå][A-Za-z _æøå]*$/;

        if(lastNameLength===1){
            return 'warning';
        } else if(lastNameLength===0) return ;
        else if(this.state.lastName.match(dec)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    getValidationPhone(){
        const phoneLength = this.state.phone.length;
        let decimal =/^(\d|,)*\d*$/;
        if(phoneLength ==8 && this.state.phone.match(decimal)) {
            return 'success';
        }
        else if(phoneLength==0)return ;
        else{
            return 'warning';
        }
    }


  render() {


    let optionTemplate = this.state.values.map(v => {
      const data = { label: v.name, value: v.countyId };
      return (data);
    });

    let defaultValues = this.state.defaultCounties;

    let hjemme = <span></span>;

    if (this.state.user != undefined) {
      if (!(this.state.user.typeName === 'Employee')) {
        hjemme = <FormGroup controlId="formInlineHjemmekommune">
          <ControlLabel>Hjemmekommune</ControlLabel>{' '}
          <CountyList
            handleOnChangeCounty={this.handleOnChangeCounty.bind(
              this
            )}
          />
        </FormGroup>;

      }
    }

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
                      <FormGroup controlId="formInlineFirstName" validationState={this.getValidationStateFirstName()}>
                        <ControlLabel>Fornavn</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="firstName"
                          type="text"
                          placeholder="Fornavn"
                          defaultValue={this.state.user.firstName}
                        />
                          <FormControl.Feedback/>
                      </FormGroup>{' '}
                      <FormGroup controlId="formInlinePhone" validationState={this.getValidationPhone()}>
                        <ControlLabel>Mobilnummer</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="phone"
                          type="phone"
                          placeholder="phone"
                          defaultValue={this.state.user.phone}
                        />
                          <FormControl.Feedback/>
                      </FormGroup>{' '}
                    </Col>

                    <Col xs={12} md={6}>
                      <FormGroup controlId="formInlineLastName" validationState={this.getValidationStateLastName()}>
                        <ControlLabel>Etternavn</ControlLabel>{' '}
                        <FormControl
                          onChange={this.handleChange}
                          name="lastName"
                          type="text"
                          placeholder="Etternavn"
                          defaultValue={this.state.user.lastName}
                        />
                          <FormControl.Feedback/>

                      </FormGroup>{' '}

                      {hjemme}

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

                          <FormGroup controlId="formInlineCompanyName">
                            <ControlLabel>Bedriftens navn</ControlLabel>{' '}
                            <FormControl
                              onChange={this.handleChange}
                              name="companyName"
                              type="companyName"
                              placeholder="companyName"
                              defaultValue={this.state.user.companyName}
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


                          <FormGroup>
                            <ControlLabel>Velg alle arbeidsområder</ControlLabel>{' '}
                            <Select
                              isMulti
                              placeholder={'Arbeidsområder'}
                              options={optionTemplate}
                              className="frontpage-county"
                              onChange={this.handleChangeCountyCompany}
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

