import React, { Component } from "react";
import PropTypes from "prop-types";
import EventFormFirstPage from "./EventFormFirstPage";
import EventFormSecondPage from "./EventFormSecondPage";
import EventFormThirdPage from "./EventFormThirdPage";

export class EventWizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      selectedCategoryId: -1,
      selectedCategoryType: -1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    let styles = {
      height: "100%"
    };
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div style={styles}>
        {page === 1 && <EventFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <EventFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <EventFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    );
  }
}

EventWizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default EventWizardForm;
