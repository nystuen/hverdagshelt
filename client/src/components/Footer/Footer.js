//@flow
import React, {Component} from "react";
import {
  Grid, Row, Col, ListGroup,ListGroupItem,ToggleButton,ButtonToolbar, MenuItem, FormGroup, FormControl,PageHeader,Button, ControlLabel
} from "react-bootstrap"
import { CountyService, getUsersCounties } from '../../services';


let countyService = new CountyService();

export class Footer extends Component<Props,State> {


  constructor(){
    super();
    this.state = {
      countyInformation:[]

    };
  }





  componentDidMount() {
    countyService.getCountyEmployee(1).then((r: Array<Object>) => {
      this.setState({
        countyInformation: r
      });
    });
    console.log(this.state.countyInformation.firstName);
  }


  render(){
    return(
      <footer className="footerClass2">
        <div className="container">
          <Col>
            {
              this.state.countyInformation.map((r,i)=>{
                <Row key={i}> {r.mail}, {r.firstName + r.lastName}</Row>
              })
            }
          </Col>
          <Col>Hei</Col>
        </div>
      </footer>
    )
  }

}
