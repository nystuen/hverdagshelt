import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import Form from "react-bootstrap/es/Form";
import { Col, Grid } from "react-bootstrap";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/es/Button";
import { UserService, MailService } from "../../services";
import jwt from "jsonwebtoken";
import { User } from "../../classTypes";

let userService = new UserService();
let mailService = new MailService();
const bcrypt = require("bcrypt-nodejs");

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: User,
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    };
  }

  componentDidMount() {
    userService.getCurrentUser().then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
  }

  handleOldPassChange(e: Object) {
    this.setState({
      oldPassword: event.target.value
    });
  }

  handleNewPassChange(e: Object) {
    this.setState({
      newPassword: event.target.value
    });
  }

  handleNewPass2Change(e: Object) {
    this.setState({
      newPassword2: event.target.value
    });
  }

  submit() {
    if (this.state.newPassword == this.state.newPassword2) {
      bcrypt.compare(
        this.state.oldPassword,
        this.state.user.password,
        (err, res) => {
          if (res) {
            userService.resetPassword({
              newPassword: this.state.newPassword,
              email: this.state.email
            });
            alert("Passordet ditt er endret");
            console.log(this.state.user.mail);
            mailService.sendTextMail({
              to: this.state.user.mail,
              subject: "Hverdagshelt - Endring av passord",
              text:
                "Hei " +
                this.state.user.firstName +
                ", endringen av passordet ditt var vellykket. Om det ikke var deg som forespurte endringen, vennligst ta kontakt med oss"
            });
          } else {
            alert("Feil passord");
          }
        }
      );
    } else {
      alert("Passordene samsvarer ikke");
    }
  }

  render() {
    return (
      <div>
        <div>
          <Form>
            <Grid>
              <Col xs={3} md={3} />
              <Col xs={5} md={5}>
                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Gammelt passord</ControlLabel>{" "}
                  <FormControl
                    name="oldPassword"
                    onChange={this.handleOldPassChange}
                    type="password"
                    placeholder="passord"
                  />
                </FormGroup>{" "}
                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Nytt passord</ControlLabel>{" "}
                  <FormControl
                    name="newPassword"
                    onChange={this.handleNewPassChange}
                    type="password"
                    placeholder="nytt passord"
                  />
                </FormGroup>{" "}
                <FormGroup controlId="formInlineToPassword">
                  <ControlLabel>Gjenta nytt passord</ControlLabel>{" "}
                  <FormControl
                    name="newPassword2"
                    onChange={this.handleNewPass2Change}
                    type="password"
                    placeholder="nytt passord"
                  />
                </FormGroup>{" "}
                <div align="right">
                  <Button onClick={this.submit} bsStyle="success">
                    Lagre nytt passord
                  </Button>
                </div>
              </Col>
              <Col xs={3} md={3} />
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}
