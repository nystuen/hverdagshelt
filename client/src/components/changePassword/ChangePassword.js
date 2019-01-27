import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Col, Grid, FormGroup, ControlLabel, FormControl, Button, Form, InputGroup } from 'react-bootstrap';
import { UserService, MailService } from '../../services';
import jwt from 'jsonwebtoken';
import { User } from '../../classTypes';
import css from './ChangePassword.css';

let userService = new UserService();
let mailService = new MailService();
const bcrypt = require('bcrypt-nodejs');

/**
 * @class ChangePassword
 */
export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: User,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      changePasswordOpen: false,
      openPassword: 'password',
      openPassword2: 'password',
      openPassword3: 'password'
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

  /**
   * returns success or warning depending on if the string written matches the criteria in the function
   *
   * @method getValidationStatePassword
   * @returns {string}
   */
  getValidationStatePassword() {
    const length = this.state.newPassword.length;
    let decimal = /(?=^.{8,64}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!., æøå/@<>"¤=#$%^&*()]*$/;
    if (this.state.newPassword.match(decimal)) return 'success';
    else if (length == 0) return;
    else return 'warning';
  }

  /**
   * returns success or warning depending on if the string written matches the criteria in the function
   *
   * @method getValidationStatePassword2
   * @returns {string}
   */
  getValidationStatePassword2() {
    const password2Length = this.state.newPassword2.length;
    let decimal = /(?=^.{8,64}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!., æøå/@<>"¤=#$%^&*()]*$/;
    if (password2Length == 0) return;
    else {
      if (this.state.newPassword !== this.state.newPassword2 || !(this.state.newPassword2.match(decimal))) return 'warning';
      else return 'success';
    }
  }

  handleClickPassword1 = () => {
    if (this.state.openPassword == 'text') {
      this.setState({ openPassword: 'password' });
    } else {
      this.setState({ openPassword: 'text' });
    }
  };

  handleClickPassword2 = () => {
    if (this.state.openPassword2 == 'text') {
      this.setState({ openPassword2: 'password' });
    } else {
      this.setState({ openPassword2: 'text' });
    }
  };

  handleClickPassword3 = () => {
    if (this.state.openPassword3 == 'text') {
      this.setState({ openPassword3: 'password' });
    } else {
      this.setState({ openPassword3: 'text' });
    }
  };

  open() {
    this.props.open();
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
            alert('Passordet ditt er endret');
            console.log(this.state.user.mail);
            mailService.sendTextMail({
              to: this.state.user.mail,
              subject: 'Hverdagshelt - Endring av passord',
              text:
                'Hei ' +
                this.state.user.firstName +
                ', endringen av passordet ditt var vellykket. Om det ikke var deg som forespurte endringen, vennligst ta kontakt med oss'
            });
            this.open();
          } else {
            alert('Feil passord');
          }
        }
      );
    } else {
      alert('Passordene samsvarer ikke');
    }

  }

  render() {

    let changeIcon1;

    if (this.state.openPassword == 'text') {
      changeIcon1 = (<i className="fas fa-eye"></i>);
    } else {
      changeIcon1 = (<i className="fas fa-eye-slash"></i>);
    }


    let changeIcon2;

    if (this.state.openPassword2 == 'text') {
      changeIcon2 = (<i className="fas fa-eye"></i>);
    } else {
      changeIcon2 = (<i className="fas fa-eye-slash"></i>);
    }

    let changeIcon3;

    if (this.state.openPassword3 == 'text') {
      changeIcon3 = (<i className="fas fa-eye"></i>);
    } else {
      changeIcon3 = (<i className="fas fa-eye-slash"></i>);
    }
    return (
      <div className="changePassword">
        <Form>
          <FormGroup controlId="formInlineToPassword">
            <ControlLabel>Gammelt passord</ControlLabel>{' '}

            <InputGroup>
              <InputGroup.Button>
                <Button type="button" onClick={() => this.handleClickPassword1()}>{changeIcon1}</Button>
              </InputGroup.Button>
              <FormControl
                name="oldPassword"
                onChange={this.handleOldPassChange}
                type={this.state.openPassword}
                placeholder="passord"
              />
            </InputGroup>
          </FormGroup>{' '}
          <FormGroup controlId="formInlineToPassword" validationState={this.getValidationStatePassword()}>
            <ControlLabel>Nytt passord</ControlLabel>{' '}
            <InputGroup>
              <InputGroup.Button>
                <Button type="button" onClick={() => this.handleClickPassword2()}>{changeIcon2}</Button>
              </InputGroup.Button>
            <FormControl
              name="newPassword"
              onChange={this.handleNewPassChange}
              type={this.state.openPassword2}
              placeholder="nytt passord"
            />
            </InputGroup>
            <FormControl.Feedback/>
          </FormGroup>{' '}
          <FormGroup controlId="formInlineToPassword" validationState={this.getValidationStatePassword2()}>
            <ControlLabel>Gjenta nytt passord</ControlLabel>{' '}
            <InputGroup>
              <InputGroup.Button>
                <Button type="button" onClick={() => this.handleClickPassword3()}>{changeIcon3}</Button>
              </InputGroup.Button>
            <FormControl
              name="newPassword2"
              onChange={this.handleNewPass2Change}
              type={this.state.openPassword3}
              placeholder="nytt passord"
            />
            </InputGroup>
            <FormControl.Feedback/>
          </FormGroup>{' '}
          <div align="right">
            <Button onClick={this.submit} bsStyle="primary">
              Lagre nytt passord
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
