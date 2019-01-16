import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import Form from 'react-bootstrap/es/Form';
import { Col, Grid } from 'react-bootstrap';
import FormGroup from 'react-bootstrap/es/FormGroup';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import Button from 'react-bootstrap/es/Button';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <Form>
            <Grid>

              <Col xs={3} md={3}>
                <h3>Denne komponenten er ikke ferdig.</h3>
              </Col>
              <Col xs={5} md={5}>
                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Gammelt passord</ControlLabel>{' '}
                  <FormControl name="oldPassword" onChange={this.handleChange} type="text" placeholder="passord"/>
                </FormGroup>{' '}

                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Nytt passord</ControlLabel>{' '}
                  <FormControl name="newPassword" onChange={this.handleChange} type="text" placeholder="nytt passord"/>
                </FormGroup>{' '}

                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Gjenta nytt passord</ControlLabel>{' '}
                  <FormControl name="newPassword2" onChange={this.handleChange} type="text" placeholder="nytt passord"/>
                </FormGroup>{' '}
                <div align="right">
                  <Button bsStyle="success">Lagre nytt passord</Button>
                </div>
              </Col>
              <Col xs={3} md={3}>
              </Col>

            </Grid>


          </Form>
        </div>
      </div>
    );
  }
}