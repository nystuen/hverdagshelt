import { Col, Button, Form, FormGroup, Label } from 'react-bootstrap';
import { CountyService, UserService, getCounties, addSubscription } from '../../services';
import { Component } from 'react';
import * as React from 'react';
import { Alert } from '../../widgets';
import ReactDOM from 'react-dom';
import { County } from '../../classTypes';
import DropdownButton from 'react-bootstrap/es/DropdownButton';
import MenuItem from 'react-bootstrap/es/MenuItem';
import Grid from 'react-bootstrap/es/Grid';
import { FormControl, PageHeader } from 'react-bootstrap';
import Checkbox from 'react-bootstrap/es/Checkbox';
import Select from 'react-select';
import { history } from '../../index';


let countyService = new CountyService();
let userService = new UserService();

interface State {
  mail: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  typeName: string;
  phone: string;
  points: number;
  countyId: number;
  countyName: string;
  active: number;
  isLoaded: boolean;
}

interface Props {
  match: Object,
}

/*class BindDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ]
        }

        this.handleChangeCounty = this.handleChangeCounty.bind(this)
    }

    handleChangeCounty(e: Object){
        console.log(this.state.choosen.countyId)
        this.setState({
            choosen: JSON.parse(e.target.value)
        })


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
                    arr = arr.concat(elem)

                });
                this.setState({
                    values: arr
                })
            })


                //this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

    }



    render(){
        let optionTemplate = this.state.values.map(v => {
            var data = {name: v.name, countyId: v.countyId}
            return(<option key={v.countyId} value={JSON.stringify(data)}> {v.name}</option>)
        });
        return (
            <label>
                Velg Kommune:
                <select value={this.state.values.countyId} onChange={this.handleChangeCounty}>
                    {optionTemplate}
                </select>
            </label>
        )
    }
}*/

export class RegisterUser extends Component<Props, State> {

  /*state = {
      mail: "",
      firstName: "",
      lastName: "",
      postnumber: 0,
      password: "",
      password2: "",
      typeName: "",
      phone: 0,
      points: 0,
      active: 0,
      isLoaded: false,
  };*/
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      firstName: '',
      lastName: '',
      postnumber: 0,
      password: '',
      password2: '',
      typeName: '',
      phone: '',
      points: 0,
      active: 0,
      isLoaded: false,
      choosen: { label: 'Bergen', countyId: 1 },
      values: [
        { label: 'Bergen', countyId: 1 }
        //{ name: this.county.name, countyId: this.county.countyId}
      ]
    };

    this.handleChangeCounty = this.handleChangeCounty.bind(this);
  }


  handleChangeCounty(e: Object) {
    this.setState({
      choosen: JSON.parse(e.value)
    });
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


      //this.state.countyName.push(this.state.county.name)})
      .catch((error: Error) => Alert.danger(error.message));

  }

  handleStringChange = (name: string) => (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      // $FlowFixMe
      [name]: event.target.value
    });
  };

  handleNumberChange = (value: number) => (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      // $FlowFixMe
      [value]: event.target.value
    });
  };

  /*;*/
  /*;*/

  /*let optionTemplate = this.state.values.map(v => {
      var data = {label: v.name, countyId: v.countyId}
      return(  <Select
          placeholder={"Hjemmekommune"}
          name="colors"
          options={optiontem}
          className="basic-multi-select"
          classNamePrefix="select"
      />)})*/
  render() {
    let optionTemplate = this.state.values.map(v => {
      const data = { label: v.name, value: v.countyId, countyId: v.countyId };
      return (data);
    });
    return (
      <Grid>
        <Col md={3}></Col>
        <Col md={6}>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <FormGroup>
                <FormGroup>
                  <Col md={3}></Col>
                  <Col md={6}>
                    <PageHeader>
                      Registrer bruker
                    </PageHeader>
                  </Col>
                  <Col md={3}></Col>
                </FormGroup>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                 onChange={this.handleStringChange('firstName')}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                 onChange={this.handleStringChange('lastName')}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="number" value={this.state.phone} placeholder="Telefonnummer"
                                 onChange={this.handleStringChange('phone')}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                 onChange={this.handleStringChange('mail')}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="password" value={this.state.password} placeholder="Passord"
                                 onChange={this.handleStringChange('password')}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <FormControl type="password" value={this.state.password2} placeholder="Gjenta passord"
                                 onChange={this.handleStringChange('password2')}/>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={4}>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      Hjemmekommune
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Select
                      placeholder={'Hjemmekommune'}
                      name="colors"
                      options={optionTemplate}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={this.handleChangeCounty}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={4}/>
                <Col md={4}>
                  <Button type="button" onClick={this.checkMail}>Registrer</Button>
                </Col>
                <Col md={4}>
                </Col>
              </FormGroup>
            </FormGroup>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Grid>
    );
  }

  checkMail = () => {
    var validator = require('email-validator');

    if (!(validator.validate(this.state.mail))) {
      Alert.warning('Eposten eksisterer ikke');
    } else {
      this.register();
    }
  };

  checkPass = () => {

    if (this.state.password !== this.state.password2) {
      console.log('To ulike passord');
      Alert.warning('Du skrev to ulike passord');
    }
    else {
      let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (this.state.password.match(decimal)) {
        this.register();
      }
      else {
        Alert.warning('Password has to be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
      }
    }

  };


  register = () => {
    console.log('test', this.state);

    const newUser = {
      mail: this.state.mail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      typeName: 'Private',
      phone: this.state.phone,
      countyId: this.state.choosen
    };

    console.log('county', this.state.choosen);


    userService
      .addUser(newUser)
      .then(user => (this.state = user)).then(Alert.success('Bruker registrert'))
      .catch((error: Error) => Alert.danger(error.message));

    let theBody: Object = {
      countyId: newUser.countyId,
      userMail: newUser.mail
    };

    addSubscription(theBody);

    history.push('/login');

  };
}

/*
* <DropdownButton title="Hjemmekommune">
                                     value={this.state.countyName}
                                              onChange={(e)=>this.handleChangeCounty(e)}>
                                        {this.state.countyName.map((r, i) => {
                                            return <option key={i} value={r}>{r}
                                            </option>
                                        })
                                        }

                                </DropdownButton>

    checkPass(){
        console.log(state);
        if(this.state.password==this.state.password2){
            this.register();
            Alert.success();
        }else{
            Alert.warning();
        }
    }


*/