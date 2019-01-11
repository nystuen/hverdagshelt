import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import { Button } from "react-bootstrap";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="categoryId"
        type="text"
        component={renderField}
        label="Category ID"
      />
      <div>
        <Button
          bsStyle="primary"
          type="button"
          className="previous"
          onClick={previousPage}
        >
          Previous
        </Button>
        <Button bsStyle="primary" type="submit" className="next">
          Next
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);
