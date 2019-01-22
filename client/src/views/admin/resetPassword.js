//@flow
import { MailService } from "../../services";
import { Component } from "react";
import * as React from "react";
import ReactDOM from "react-dom";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import resetPassword from "./resetPassword.css";

let mailService = new MailService();

export class AdminResetUserPassword extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: { to: "" }
    };
  }

  handleStringChange = () => (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      email: { to: event.target.value }
    });
  };

  render() {
    return (
      <div className="container">
        <h2>Tilbakestill en brukers passord</h2>
        <p>Brukeren vil få tilsendt et tilfeldig generert passord på mail</p>
        <Form>
          <FormGroup validationState={this.getValidationStateEmail()}>
            <div className="textfield">
              <FormControl
                value={this.state.email.to}
                onChange={this.handleStringChange()}
                placeholder="Epost"
              />
              <FormControl.Feedback />
            </div>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.resetPassword}>
            Tilbakestill passord
          </Button>
        </Form>
      </div>
    );
  }

  getValidationStateEmail() {
    var validator = require("email-validator");
    const length = this.state.email.to.length;
    console.log(this.state.email.to.length);
    const bool = validator.validate(this.state.email.to);
    if (length == 0) return;
    else if (!bool) return "warning";
    else if (bool) return "success";
  }

  resetPassword = () => {
    console.log(this.state.email.to);
    mailService.sendResetPasswordMail({ to: this.state.email.to });
  };
}
