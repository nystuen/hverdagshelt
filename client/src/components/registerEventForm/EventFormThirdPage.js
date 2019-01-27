import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField1 from './renderField';
import renderField from '../reduxRegisterForm/renderField';
import renderEmail from '../reduxRegisterForm/renderEmail';
import { Button, ProgressBar, Grid, Col } from 'react-bootstrap';
import issueReg from '../reduxRegisterForm/issueReg.css';
import { User } from '../../classTypes';
import { UserService } from '../../services';
import { history } from '../../index';

let userService = new UserService();

const countyID = ['1', '2', '3'];
const counties = [
  { county: 'Oslo', id: '1' },
  { county: 'Trondheim', id: '2' },
  { county: 'jhbdsahbds', id: '3' }
];

const renderCountySelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a countyID...</option>
      {counties.map(val => (
        <option value={val.id} key={val.id}>
          {val.county}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

export class EventFormThirdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: User
    };
  }

  setProps = () => {
    this.props.change('userMail', this.state.user.mail);
    this.props.change('countyId', this.state.user.countyId);
  };

  componentDidMount() {
    userService.getCurrentUser().then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
    this.setProps.bind(this);
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    if (
      this.state.user.typeName == 'Admin' ||
      this.state.user.typeName == 'Employee'
    ) {
      return (
        <Grid>
          <form onSubmit={handleSubmit}>
            <Col md={8} mdOffset={2}>
              <div className="bottomFooter">
                <div className="formDiv">


                  <div className="progressBar">
                    <ProgressBar now={100} label={'3/3'}/>
                  </div>
                  <h3>Vennligst spesifiser hendelsen</h3>
                  <div className="paddingBot">
                    <div>
                      <Field
                        name="title"
                        type="text"
                        component={renderField1}
                        label="Tittel"
                      />
                      <Field
                        name="text"
                        type="text"
                        component={renderField}
                        label="Beskrivelse"
                      />
                      <Field
                        name="userMail"
                        type="hidden"
                        component={renderEmail}
                        label="userMail"
                      />
                      <Field
                        name="countyId"
                        type="hidden"
                        component={renderEmail}
                        label="countyId"
                      />
                    </div>
                  </div>
                  <div>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <Button
                        bsStyle="primary"
                        type="button"
                        className="previous"
                        onClick={previousPage}
                      >
                        Previous
                      </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} align="right">
                      <Button
                        bsStyle="primary"
                        type="submit"
                        onClick={this.setProps.bind(this)}
                        disabled={pristine || submitting}
                      >
                        Submit
                      </Button>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </form>
        </Grid>
      );
    } else {
      return (
        <div className="container">
          <h1>Ingen tilgang</h1>
        </div>
      );
    }
  }
}

export default reduxForm({
  form: 'EventWizard', //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(EventFormThirdPage);
