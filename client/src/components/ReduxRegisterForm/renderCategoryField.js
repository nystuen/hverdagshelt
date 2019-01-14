import React from "react";
import { FormControl } from "react-bootstrap";

const renderCategoryField = ({
  input,
  label,
  type,
  defaultValue,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <FormControl {...input} type={type} label={label} value={defaultValue} />
      {touched &&
        error && (
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1c/No-Symbol.png"
              height="12"
              width="12"
            />
            <span>{error}</span>
          </div>
        )}
    </div>
  </div>
);

export default renderCategoryField;
