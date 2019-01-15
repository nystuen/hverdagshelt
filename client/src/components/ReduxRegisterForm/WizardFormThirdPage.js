import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

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

const WizardFormThirdPage = props => {
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
            name="userMail"
            type="email"
            component={renderField}
            label="Epost"
          />
          <Field
            name="text"
            type="text"
            component={renderField}
            label="Beskrivelse"
          />
          <Field name="pic" type="text" component={renderField} label="Bilde" />
          <Field name="date" type="text" component={renderField} label="Dato" />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
