import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import { Button, DropdownButton, MenuItem, FormGroup } from "react-bootstrap";

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Field
          name="latitude"
          type="text"
          component={renderField}
          label="Latitude"
        />
        <Field
          name="longitude"
          type="text"
          component={renderField}
          label="Longitude"
        />
        <div>
          <Button bsStyle="primary" type="submit" className="next">
            Next
          </Button>
        </div>
      </FormGroup>
    </form>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
