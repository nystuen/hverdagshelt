import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Image,
  Panel,
  Button,
  ButtonGroup
} from "react-bootstrap";
import css from "./adminPanel.css";

// get viktige hendelser

export class adminPanel extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let buttonStyle = "default";
    let panelStyle = "primary";
    return (
      <div className="panels">
        <Grid>
          <Col xs={12} md={4} lg={4} id="col">
            <Panel
              bsStyle={panelStyle}
              id="collapsible-panel-example-2"
              defaultExpanded
            >
              <Panel.Heading>
                <Panel.Title toggle>Kommuner & Kategorier</Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <div className="buttons">
                    <Button
                      id="butt"
                      bsStyle="default"
                      href="/#/addCategory"
                      block
                    >
                      <span className="glyphicon glyphicon-plus" /> Lag en
                      kategori
                    </Button>
                    <Button id="butt" bsStyle={buttonStyle} href="/#/" block>
                      <span className="glyphicon glyphicon-edit" /> Administrere
                      Kategorier
                    </Button>
                    <Button id="butt" bsStyle={buttonStyle} href="/#/" block>
                      <span className="glyphicon glyphicon-edit" /> Administrere
                      Kommuner
                    </Button>
                  </div>
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </Col>

          <Col xs={12} md={4} lg={4} id="col">
            <Panel
              bsStyle={panelStyle}
              id="collapsible-panel-example-2"
              defaultExpanded
            >
              <Panel.Heading>
                <Panel.Title toggle>Saker & Hendelser</Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <div className="buttons">
                    <Button
                      id="butt"
                      bsStyle={buttonStyle}
                      href="/#/registerEvent"
                      block
                    >
                      <span className="glyphicon glyphicon-plus" /> Lag en
                      hendelse
                    </Button>
                    <Button id="butt" bsStyle={buttonStyle} href="/#/" block>
                      <span className="glyphicon glyphicon-edit" /> Administrere
                      Hendelser
                    </Button>
                    <Button id="butt" bsStyle={buttonStyle} href="/#/" block>
                      <span className="glyphicon glyphicon-edit" /> Administrere
                      Saker
                    </Button>
                  </div>
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </Col>

          <Col xs={12} md={4} lg={4} id="col">
            <Panel
              bsStyle={panelStyle}
              id="collapsible-panel-example-2"
              defaultExpanded
            >
              <Panel.Heading>
                <Panel.Title toggle>Brukere</Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <div className="buttons">
                    <Button
                      id="butt"
                      bsStyle={buttonStyle}
                      href="/#/admin/createAdminsOrEmployees"
                      block
                    >
                      <span className="glyphicon glyphicon-plus" /> Lag en
                      ansatt
                    </Button>
                    <Button
                      id="butt"
                      bsStyle={buttonStyle}
                      href="/#/admin/sendMailTilBruker"
                      block
                    >
                      <span className="glyphicon glyphicon-envelope" /> Kontakt
                      bruker
                    </Button>
                    <Button id="butt" bsStyle={buttonStyle} href="/#/" block>
                      <span className="glyphicon glyphicon-edit" /> Administrere
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
