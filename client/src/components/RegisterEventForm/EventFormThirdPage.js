import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import { Button } from "react-bootstrap";

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

const EventFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Choose your county</label>
        <Field name="countyId" component={renderCountySelector} />
      </div>
      <div>
        <div>
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Tittel"
          />
          <Field
            name="text"
            type="text"
            component={renderField}
            label="Beskrivelse"
          />
          <Field
            name="date"
            type="text"
            component={renderField}
            label="[Midlertidig] Dato"
          />
          <Field
            name="userMail"
            type="text"
            component={renderField}
            label="[Midlertidig] Epost"
          />
          <Field
            name="countyId"
            type="text"
            component={renderField}
            label="[Midlertidig] County ID"
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
          disabled={pristine || submitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "EventWizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(EventFormThirdPage);
