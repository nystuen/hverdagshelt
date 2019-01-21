//@flow
import React, {Component} from "react";
import {
  Grid, Row, Col, ListGroup,ListGroupItem,ToggleButton,ButtonToolbar, MenuItem, FormGroup, FormControl,PageHeader,Button, ControlLabel
} from "react-bootstrap"
import { CountyService, getUsersCounties } from '../../services';
import Image from 'react-bootstrap/es/Image';
import {UserService} from '../../services';


let countyService = new CountyService();
let userService = new UserService();

//henter infoen hvis personen er koblet til en kommune
export class Footer extends Component<{}> {


  state = {
      countyInformation:[],
     user: []

  };





  componentDidMount() {

    userService.getCurrentUser().then(res => {
      console.log('bruker:', res)
      this.setState({user: res[0]})
    });

   //let id :number = this.props.match.params.countyId;
    countyService.getCountyEmployee(this.state.user.countyId).then((r: Array<Object>) => {
      this.setState({
        countyInformation: r
      });
    });
  }






  render(){
    let check;
    if(this.state.user != []){
      return (
        <footer className="footerClass2">
        <Col xs={12} md={12}>
        <h4 className="footerInfo">Kontaktinformasjon til din hjemkommunen:</h4>
        {
          this.state.countyInformation.map((r, i) => {
            return (

              <div key={i} className="footerInfo">
                <Row>kommuneansatt: {r.firstName + ' ' + r.lastName}</Row>
                <Row> e-post: {r.mail}</Row>
                <Row> telefonnr: {r.phone}</Row>
              </div>
            )
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
    }
    return(
      <footer className="footerClass2">

        <div className="container">

          {check}
          <div align="center">

            <Image className="picture"
                   src={'./resources/logo_white.png'}
                   rounded/>
            <h2>HVERDAGSHELT</h2>

          </div>
          </div>
      </footer>
    )


  }

}
