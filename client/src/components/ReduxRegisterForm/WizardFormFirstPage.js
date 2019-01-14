import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import { MapComponent } from '../map/Map';

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <MapComponent/>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
