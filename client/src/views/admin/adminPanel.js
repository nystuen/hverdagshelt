import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Table, Image, Panel, Button, ButtonGroup } from 'react-bootstrap';
import css from './adminPanel.css';

// get viktige hendelser


export class adminPanel extends Component {

  state = {};

  componentDidMount() {
  };



  render() {
    let buttonStyle = "primary";
    return (
      <div className="panels">

        <Grid>

          <Col xs={12} md={4} lg={4} id="col">
            <div className="nyPanel">
              <div >
              <Row align="center"><p>Kommuner & Kategorier</p></Row>
              <hr/>
              </div>
              <div className="buttons" >
                <Button bsStyle={buttonStyle} href="/#/addCategory" block><span className="glyphicon glyphicon-plus"/> Lag en kategori</Button>
                <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-edit"/> Administrere Kategorier</Button>
                <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-edit"/> Administrere Kommuner</Button>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4} lg={4} id="col">
            <div className="nyPanel">
              <Row align="center"><p>Saker & Hendelser</p></Row>
              <hr/>
              <div className="buttons">
              <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-edit"/> Administrere Hendelser</Button>
              <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-edit"/> Administrere Saker</Button>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4} lg={4} id="col">
            <div className="nyPanel">
              <Row align="center"><p>Brukere</p></Row>
              <hr/>
              <div className="buttons">
              <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-plus"/> Lag en ansatt</Button>
              <Button bsStyle={buttonStyle} href="/#/admin/sendMailTilBruker" block><span className="glyphicon glyphicon-envelope"/> Kontakt bruker</Button>
              <Button bsStyle={buttonStyle} href="/#/" block><span className="glyphicon glyphicon-edit"/> Administrere Brukere</Button>
             </div>
            </div>
          </Col>


        </Grid>


      </div>
    );
  }
}