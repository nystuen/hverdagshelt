//@flow
import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ToggleButton,
  ButtonToolbar,
  MenuItem,
  FormGroup,
  FormControl,
  PageHeader,
  Button,
  ControlLabel,
    Image
} from 'react-bootstrap';
import { CountyService, getUsersCounties } from '../../services';
import { UserService } from '../../services';


let countyService = new CountyService();
let userService = new UserService();

//henter infoen hvis personen er koblet til en kommune
export class Footer extends Component<{}> {


  state = {
      countyInformation:[],
     user: {}

  };




  componentDidMount = async ()=>{
    let user = {};
      await userService.getCurrentUser().then(r => {
        if (r[0] === undefined) {
          user = {};
        } else {
          user = r[0];
        }
        this.setState({user: user});
      });


    await countyService.getCountyEmployee(this.state.user.countyId).then((re: Array<Object>) => {
      this.setState({
        countyInformation: re
      });
    });
  };

  render() {
    let check;
    if (this.state.user.countyId !== {}) {
      return (
        <footer className="footerClass2">
          <Col xs={12} md={12}>
            <h4 className="footerInfo">Kontaktinformasjon til {this.state.user.county}-kommune:</h4>
            {
              this.state.countyInformation.map((r, i) => {
                return (

                  <div key={i} className="footerInfo">
                    <Row>kommuneansatt: {r.firstName + ' ' + r.lastName}</Row>
                    <Row> e-post: {r.mail}</Row>
                    <Row> telefonnr: {r.phone}</Row>
                  </div>
                );
              })
            }
          </Col>

          <div align="center">

            <Image className="picture"
                   src={'./resources/logo_white.png'}
                   rounded/>
            <h2>HVERDAGSHELT</h2>

          </div>

        </footer>
      );
    } else {
      return (
        <footer className="footerClass2">
          <div className="container">
            <div align="center">
              <Image className="picture"
                     src={'./resources/logo_white.png'}
                     rounded/>
              <h2>HVERDAGSHELT</h2>
            </div>
          </div>
        </footer>
      );
    }
    return (

      { check }

    );


  }

}
