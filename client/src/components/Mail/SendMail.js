// @flow


import { MailService } from '../../services';
import * as React from 'react';
import Button from 'react-bootstrap/es/Button';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Form from 'react-bootstrap/es/Form';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import { Col, Grid } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { User } from '../../classTypes';

let mailService = new MailService();



export class SendTextMailWindow extends React.Component {

  state = {
    to: '',
    subject: String,
    text: String
  };

  sendMail() {

    let mailObject = {
      to: this.state.to,
      subject: this.state.subject,
      text: this.state.text
    };

    mailService.sendTextMail(mailObject).then(response => {
      console.log(response);
    })
    ;
  }


  handleChange = e => {
    this.setState({[e.target.name]: e.target.value })
  };

  render() {
    return (
      <div>
        <Grid>
          <Form>
            <FormGroup controlId="formInlineToMail">
              <ControlLabel>Mottakers e-postadresse</ControlLabel>{' '}
              <FormControl name="to" onChange={this.handleChange} type="email" placeholder="mottaker@example.com"/>
            </FormGroup>{' '}

            <FormGroup controlId="formInlineText">
              <ControlLabel>Tittel</ControlLabel>{' '}
              <FormControl name="subject" onChange={this.handleChange} type="text" placeholder="Hverdagshelt - " defaultValue={'Hverdagshelt - '}/>
            </FormGroup>{' '}

            <FormGroup controlId="formInlinePhone">
              <ControlLabel>Innhold</ControlLabel>{' '}
              <FormControl rows={5} name="text" onChange={this.handleChange} componentClass="textarea" placeholder="E-postens innhold"/>
            </FormGroup>{' '}

          </Form>

          <Button onClick={() => this.sendMail()}>Send e-post</Button>
        </Grid>
      </div>
    );
  }
}


