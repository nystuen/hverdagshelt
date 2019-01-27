// @flow

import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Issue } from "../../../classTypes";
import { IssueService } from "../../../services";
import { history } from "../../../index";

let issueService = new IssueService();

export class EditIssue extends React.Component<{
  match: { params: { issueId: number } }
}> {
  state = {
    text: ""
  };

  componentDidMount() {
    issueService
      .getIssueAndCounty(this.props.match.params.issueId)
      .then(res => {
        this.setState({
          text: res[0].text
        });
      });
  }

  handleChangeText = () => (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <Form>
          <FormControl
            style={{ margin: "5px" }}
            value={this.state.text}
            componentClass="textarea"
            onChange={this.handleChangeText()}
          />
          <Button
            bsStyle="primary"
            onClick={this.save}
            style={{ margin: "5px" }}
          >
            Lagre
          </Button>
        </Form>
      </div>
    );
  }

  save = () => {
    issueService.editIssue(this.props.match.params.issueId, this.state.text);
    window.location.reload();
  };


}
