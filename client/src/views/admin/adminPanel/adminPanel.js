import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Table, Image, Panel, Button, ButtonGroup } from 'react-bootstrap';
import css from './adminPanel.css';
import { UserService } from '../../../services';
import { PageHeader} from '../../../components/PageHeader/PageHeader';
import {history} from "../../../index";
// get viktige hendelser

let userService = new UserService();

export class adminPanel extends Component {

  state = {
    user: {}
  };

  componentWillMount() {
    userService.getCurrentUser().then(response => {
      this.setState({ user: response[0] });
      if(response[0].typeName==="Private" || response[0].typeName=== undefined){
        history.push('/');
      }
    }).catch((error: Error) => confirm(error.message));
  };


  render() {
    let buttonStyle = 'default';
    let panelStyle = 'primary';
    if (this.state.user.typeName === 'Admin') {
      return (
        <div className="panels bottomFooter">
          <Grid>
          <PageHeader title={"Adminpanel"}/>
            <Col xs={12} md={4} lg={4} id="col1">
              <Panel bsStyle={panelStyle} id="collapsible-panel-example-2" className="fixed-panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Kommuner & Kategorier
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <div className="buttons">
                      <Button id="butt" bsStyle="default" href="/#/addCategory" block><span
                        className="glyphicon glyphicon-plus"/> Lag en kategori</Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#/admin/endreKategorier" block><span
                        className="glyphicon glyphicon-edit"/> Administrere
                        Kategorier</Button>
                    </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>


            <Col xs={12} md={4} lg={4} id="col">
              <Panel bsStyle={panelStyle} id="collapsible-panel-example-2" className="fixed-panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Saker & Hendelser
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <div className="buttons">
                      <Button id="butt" bsStyle={buttonStyle} href="/#/registerEvent" block><span
                        className="glyphicon glyphicon-plus"/> Lag en hendelse</Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#admin/adminHendelser" block><span
                        className="glyphicon glyphicon-edit"/> Administrere
                        Hendelser</Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#admin/adminSaker" block><span
                        className="glyphicon glyphicon-edit"/> Administrere
                        Saker</Button>
                    </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>

            <Col xs={12} md={4} lg={4} id="col">
              <Panel bsStyle={panelStyle} id="collapsible-panel-example-2" className="fixed-panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Brukere
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <div className="buttons">

                      <Button id="butt" bsStyle={buttonStyle} href="/#/registrer/admin" block>
                        <span className="glyphicon glyphicon-plus"/> Registrer admin/ansatt</Button>
                      <Button
                        id="butt"
                        bsStyle={buttonStyle}
                        href="/#/admin/sendMailTilBruker"
                        block
                      >
                        <span className="glyphicon glyphicon-envelope"/> Kontakt
                        bruker
                      </Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#/employee/manageusers" block>
                        <span className="glyphicon glyphicon-edit"/> Administrere
                        Brukere
                      </Button>
                    </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

            </Col>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="panels bottomFooter">
          <Grid>

            <Col xs={12} md={6} lg={6} id="col">
              <Panel bsStyle={panelStyle} id="collapsible-panel-example-2" className="fixed-panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Saker & Hendelser
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <div className="buttons">
                      <Button id="butt" bsStyle={buttonStyle} href="/#/registerEvent" block><span
                        className="glyphicon glyphicon-plus"/> Lag en hendelse</Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#admin/adminHendelser" block><span
                        className="glyphicon glyphicon-edit"/> Administrere
                        Hendelser</Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#admin/adminSaker" block><span
                        className="glyphicon glyphicon-edit"/> Administrere
                        Saker</Button>
                    </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </Col>

            <Col xs={12} md={6} lg={6} id="col">
              <Panel bsStyle={panelStyle} id="collapsible-panel-example-2" className="fixed-panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    Brukere
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body className="verticalButtons">
                    <div className="buttons">
                      <Button
                        id="butt"
                        bsStyle={buttonStyle}
                        href="/#/admin/sendMailTilBruker"
                        block
                      >
                        <span className="glyphicon glyphicon-envelope"/> Kontakt
                        bruker
                      </Button>
                      <Button id="butt" bsStyle={buttonStyle} href="/#/employee/manageusers" block>
                        <span className="glyphicon glyphicon-edit"/> Administrere
                        Brukere
                      </Button>
                    </div>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

            </Col>
          </Grid>


        </div>
      );
    }
  }
}