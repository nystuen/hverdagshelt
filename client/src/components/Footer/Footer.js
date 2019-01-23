//@flow
import React, {Component} from "react";
import {
  Grid, Row, Col, Image
} from "react-bootstrap"
import { CountyService } from '../../services';
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
    if(!(window.localStorage.getItem('userToken') == '')) {
      userService.getCurrentUser().then(r => {
        console.log('bruker:', r);
        this.setState({user: r[0]});
      });

    }

    countyService.getCountyEmployee(this.state.user.countyId).then((r: Array<Object>) => {
      this.setState({
        countyInformation: r
      });
    });

  }




  render(){
    let check;
    if(this.state.user.countyId != null){
      return (
        <footer className="footerClass2">
        <Col xs={12} md={12}>
        <h4 className="footerInfo">Kontaktinformasjon til {this.state.user.county}-kommunen:</h4>
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
    }else{
      return(
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
      )
    }
    return(

      {check}

    )


  }

}
