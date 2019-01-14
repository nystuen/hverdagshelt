import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
import renderCategoryField from "./renderCategoryField";
import { Button } from "react-bootstrap";
import { ChooseCategory } from "../ChooseCategory/ChooseCategory";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

export class WizardFormSecondPage extends React.Component {
  onChangeCategoryHeader = (name1, name2) => {
    this.setState({ selectedCategoryId: name1, selectedCategoryType: name2 });
  };

  constructor() {
    super();
    this.state = {
      selectedCategoryId: -1,
      selectedCategoryType: -1
    };
  }
  render() {
    const { handleSubmit, previousPage, onChangeCategoryHeader } = this.props;
    return (
      <div>
        <ChooseCategory
          changeCategoryHeader={this.onChangeCategoryHeader.bind(this)}
          onClick={console.log(this.state)}
          registerCategory={false}
        />
        <form onSubmit={handleSubmit}>
          <Field
            name="categoryId"
            type="text"
            label="Category ID"
            component={renderCategoryField}
            defaultValue={this.state.selectedCategoryId}
          />
          <Field
            name="categoryLevel"
            type="text"
            component={renderCategoryField}
            label="Category Level"
            defaultValue={this.state.selectedCategoryType}
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
      </div>
    );
  }
}

export default reduxForm({
  form: "wizard", //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);
