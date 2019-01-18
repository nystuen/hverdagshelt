import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import renderEmail from "./renderEmail";
import renderPictureField from "./renderPictureField";
import { Button, ProgressBar } from "react-bootstrap";
import jwt from "jsonwebtoken";
import { User } from "../../classTypes";
import { UserService } from "../../services";
import { history } from "../../index";
import issueReg from "./issueReg.css";

let userService = new UserService();

const countyID = ["1", "2", "3"];
const counties = [
  { county: "Oslo", id: "1" },
  { county: "Trondheim", id: "2" },
  { county: "jhbdsahbds", id: "3" }
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

export class WizardFormThirdPage extends React.Component {
  setProps = () => {
    this.props.change("userMail", this.state.decoded.email);
    this.props.change("countyId", this.state.user.countyId);
    console.log("setting props! mail");
    console.log(this.state.user.countyId);
    setTimeout(function() {
      history.push("/min_side/mine_saker").bind(this);
    }, 1000);
  };
  state = {
    decoded: jwt.verify(
      window.localStorage.getItem("userToken"),
      "shhhhhverysecret"
    ),
    user: User,
    value: String
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    userService.getUser(this.state.decoded.email).then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
    this.setProps.bind(this);
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <div className="progressBar">
            <ProgressBar active now={100} />
          </div>
          <div>
            <Field
              name="countyId"
              type="hidden"
              component={renderEmail}
              label="countyId"
            />
          </div>
          <div className="paddingBot">
            <div>
              <Field
                name="userMail"
                type="hidden"
                component={renderEmail}
                label="Epost"
              />
              <Field
                name="text"
                type="text"
                component={renderField}
                label="Beskrivelse"
              />
              <Field
                name="pic"
                type="text"
                component={renderPictureField}
                label="Bilde"
              />
            </div>
          </div>
          <div>
            <Button
              bsStyle="primary"
              type="button"
              className="previous"
              onClick={previousPage}
            >
              Previous
            </Button>
            <Button
              bsStyle="primary"
              type="submit"
              onClick={this.setProps.bind(this)}
              disabled={pristine || submitting}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
