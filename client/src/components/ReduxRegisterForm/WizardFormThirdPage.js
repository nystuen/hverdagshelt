import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import renderCategoryField from './renderCategoryField';
import { Button } from "react-bootstrap";
import {ImageService} from '../../services';

let imageService = new ImageService()

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
      image: "",
    };

    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  handleImageUpload(e: Object){
    this.setState({
      image: e[0]
    })
  }

  uploadImage = (e: Object) => {
    imageService
      .uploadImage(this.state.image)
      .then((res) => {
        console.log(res)
        this.props.change("imagePath", res)
      })
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose your county</label>
          <Field name="countyId" component={renderCountySelector} />
        </div>
        <div>
          <div>
            <Field
              name="userMail"
              type="email"
              component={renderField}
              label="Epost"
            />
            <Field
              name="imagePath"
              type="hidden"
              label="imagePath"
              component={renderCategoryField}
              defaultValue={this.state.selectedCategory}
            />
            <Field
              name="firstName"
              type="firstName"
              component={renderField}
              label="Fornavn"
            />
            <Field
              name="lastName"
              type="lastName"
              component={renderField}
              label="Etternavn"
            />
            <Field
              name="phone"
              type="text"
              component={renderField}
              label="Telefon"
            />
            <Field
              name="text"
              type="text"
              component={renderField}
              label="Beskrivelse"
            />
            <form encType="multipart/form-data">
              <input type="file" name="avatar" placeholder="Bilde"  onChange={ (e) => this.handleImageUpload(e.target.files) }/>
              <Button className="btn-primary" onClick={this.uploadImage}>Send inn bilde</Button>
            </form>
            <Field name="date" type="text" component={renderField} label="Dato" />
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
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
