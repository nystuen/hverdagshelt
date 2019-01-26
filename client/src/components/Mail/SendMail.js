// @flow


import { MailService } from '../../services';
import * as React from 'react';
import { Col, Grid, Button, FormGroup, Form, ControlLabel, FormControl } from 'react-bootstrap';
import { PageHeader } from '../PageHeader/PageHeader';

let mailService = new MailService();

/**
 * @class SendTextMailWindow
 */
export class SendTextMailWindow extends React.Component {
  state = {
    to: '',
    subject: String,
    text: String
  };

    /**
     * Sends an email to the emailaddress specified in the state
     *
     * @method sendMail
     * @returns void
     */
  sendMail() {
    let mailObject = {
      to: this.state.to,
      subject: this.state.subject,
      text: this.state.text
    };

    if (confirm('Er du sikker på at du vil sende denne e-posten?')) {
      mailService.sendTextMail(mailObject).then(response => {
        console.log(response);
      });
      this.props.history.goBack();
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buttonBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="bottomFooter">
        <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
        <Grid>
          <PageHeader title="Kontakt bruker"/>

          <Col md={2} lg={2} sm={2}></Col>

          <Col md={8} lg={8} sm={8}>
            <Form>
              <FormGroup controlId="formInlineToMail">
                <ControlLabel>Mottakers e-postadresse</ControlLabel>{' '}
                <FormControl name="to" onChange={this.handleChange} type="email" placeholder="mottaker@example.com"/>
              </FormGroup>{' '}

              <FormGroup controlId="formInlineText">
                <ControlLabel>Tittel</ControlLabel>{' '}
                <FormControl name="subject" onChange={this.handleChange} type="text" placeholder="Hverdagshelt - "
                             defaultValue={'Hverdagshelt - '}/>
              </FormGroup>{' '}

              <FormGroup controlId="formInlinePhone">
                <ControlLabel>Innhold</ControlLabel>{' '}
                <FormControl rows={5} name="text" onChange={this.handleChange} componentClass="textarea"
                             placeholder="E-postens innhold"/>
              </FormGroup>{' '}

            </Form>
            <Button onClick={() => this.sendMail()}>Send e-post</Button>
          </Col>

          <Col md={2} lg={2} sm={2}></Col>

        </Grid>
      </div>
    );
  }
}


