import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import renderCategoryField from "./renderCategoryField";
import renderEmail from "./renderEmail";
import { Button, ProgressBar } from "react-bootstrap";
import jwt from "jsonwebtoken";
import { User } from "../../classTypes";
import { UserService } from "../../services";
import { history } from "../../index";
import { ImageService } from "../../services";
import issueReg from "./issueReg.css";
import { Grid, Col, Row } from "react-bootstrap";

let imageService = new ImageService();

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
  constructor(props) {
    super(props);
    this.state = {
      user: User,
      value: String,
      image: ""
    };

    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  setProps = () => {
    this.props.change("userMail", this.state.user.mail);
  };

  componentDidMount() {
    userService.getCurrentUser().then(newUser => {
      this.setState({
        user: newUser[0]
      });
    });
    this.setProps.bind(this);
  }

  handleImageUpload(e: Object) {
    this.setState(
      {
        image: e[0]
      },
      this.uploadImage
    );
  }

  uploadImage = () => {
    imageService.uploadImage(this.state.image).then(res => {
      this.props.change("imagePath", res);
    });
  };

  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <Grid>
        <form onSubmit={handleSubmit}>
          <div className="container bottomFooter">
            <div className="formDiv">
              <div className="progressBar">
                <ProgressBar now={100} label={"3/3"} />
              </div>
              <h3>Vennligst spesifiser din feilmelding</h3>

              <div className="paddingBot">
                <Field
                  name="countyId"
                  type="hidden"
                  component={renderEmail}
                  label="countyId"
                />
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
                  name="imagePath"
                  type="hidden"
                  label="imagePath"
                  component={renderCategoryField}
                />
                <form encType="multipart/form-data">
                  <Col lg={12} md={12} sm={12} xs={12} align="center">
                    <input
                      type="file"
                      id="file"
                      name="avatar"
                      placeholder="Bilde"
                      label="Beskrivelse"
                      className="inputfile"
                      onChange={e => this.handleImageUpload(e.target.files)}
                    />
                  </Col>
                </form>
              </div>

              <div>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <Button
                    bsStyle="primary"
                    type="button"
                    className="previous"
                    onClick={previousPage}
                  >
                    Forrige
                  </Button>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} align="right">
                  <Button
                    bsStyle="primary"
                    type="submit"
                    onClick={this.setProps.bind(this)}
                    disabled={pristine || submitting}
                  >
                    Send
                  </Button>
                </Col>
              </div>
            </div>
          </div>
        </form>
      </Grid>
    );
  }
}

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
