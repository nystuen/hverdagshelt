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
  ControlLabel
} from 'react-bootstrap';
import { CountyService, getUsersCounties } from '../../services';
import Image from 'react-bootstrap/es/Image';
import { UserService } from '../../services';
import css from './Footer2.css';


let countyService = new CountyService();
let userService = new UserService();

//henter infoen hvis personen er koblet til en kommune
export class Footer2 extends Component<{}> {


  state = {
    countyInformation: [],
    user: []

  };


  componentDidMount = async () => {
    if (!(window.localStorage.getItem('userToken') == '')) {
      await userService.getCurrentUser().then(r => {
        this.setState({ user: r[0] });
      });
    }

    await countyService.getCountyEmployee(this.state.user.countyId).then((re: Array<Object>) => {
      this.setState({
        countyInformation: re
      });
    });
  };

  render() {
    let check;
    if (this.state.user.countyId != []) {
      return (
        <footer id="myFooter">
          <Grid>
            <Row>

              <Col sm={4}>
                <div align="center">
                  <h5>Kom igang</h5>
                  <ul>
                    <li><a href="#">Hjem</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">En ting til?</a></li>
                  </ul>
                </div>
              </Col>
              <Col sm={8}>
                <div align="center">
                  <h5>Kontaktinformasjon til {this.state.user.county}-kommune:</h5>
                  {
                    this.state.countyInformation.map((r, i) => {
                      return (
                        <ul key={i}>
                          <li><span>Kommuneansatt: {r.firstName + ' ' + r.lastName}</span></li>
                          <li><span>E-post: {r.mail}</span></li>
                          <li><span>Telefonnr: {r.phone}</span></li>
                        </ul>
                      );
                    })
                  }
                </div>
              </Col>

            </Row>

          </Grid>

            <div className="footer-copyright">
              <p>© 2019 Hverdagshelt </p>
            </div>
        </footer>
      );
    } else {
      return (
        <footer className="footerClass2">
          <div className="container">
            <div align="center">
              <img id="logo" className="picture"
                     src={'./resources/logo_white.png'}
                     />
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
