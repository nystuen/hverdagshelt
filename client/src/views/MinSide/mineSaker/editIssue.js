// @flow

import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Issue } from "../../../classTypes";
import { IssueService } from "../../../services";
import NavLink from "react-router-dom/es/NavLink";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";
import Progress from "reactstrap/es/Progress";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { history } from "../../../index";

let issueService = new IssueService();

export class EditIssue extends React.Component<{
  match: { params: { issueId: number } }
}> {
  state = {
    text: ""
  };

  componentDidMount() {
    console.log(this.props.match.params.issueId);
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
    console.log(this.state.text);
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
    console.log(this.props.match.params.issueId);
    console.log(this.state.text);
    issueService.editIssue(this.props.match.params.issueId, this.state.text);
    history.push("/min_side/mine_saker");
    window.location.reload();
  };
}
