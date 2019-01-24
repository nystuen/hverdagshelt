// @flow

import React from 'react';
import { Grid, Col, Row, Button, Table, ProgressBar, Nav, NavItem } from 'react-bootstrap';
import { Issue } from '../../../classTypes';
import {CategoryService, IssueService, UserService} from '../../../services';
import { Alert } from '../../../widgets';
import { Status } from '../../../classTypes';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { history } from "../../../index";
import mineSaker from "./mineSaker.css";

let userService = new UserService();
let categoryService = new CategoryService();
let issueService = new IssueService();

interface State {
  issues: Object[];
  decoded: Object;
  category: Object;
  category1: Object[];
  category2: Object[];
  category3: Object[];
} //end interface

interface Props {}

export class MineSaker extends React.Component<Props, State> {
  match: { params: { mail: string } };
  state = {
    issues: [],
    category: [],
    category1: [],
    category2: [],
    category3: []
  };

  delete(issueId: number, statusName: string) {
    if (statusName == "Registered") {
      if (confirm("Er du sikker på at du vil slette denne saken?")) {
        issueService.deleteIssue(issueId);
        window.location.reload();
      }
    } else if (statusName == "In progress") {
      alert("denne saken er under arbeid, og kan ikke slettes");
    } else {
      alert("Du kan ikke slette ferdige saker");
    }
    console.log(issueId);
    console.log(statusName);
    //issueService.deleteIssue(issueId);
  }

  componentWillMount() {
    userService
      .getMyIssues()
      .then(response => {
        this.setState({ issues: response });
        this.getSorted();
      })
      .catch((error: Error) => Alert.danger(error.message));

    categoryService
      .getCategory1()
      .then(response => {
        this.setState({ category1: response });
      })
      .catch((error: Error) => Alert.danger(error.message));

    categoryService
      .getCategory2()
      .then(response => {
        this.setState({ category2: response });
      })
      .catch((error: Error) => Alert.danger(error.message));

    categoryService
      .getCategory3()
      .then(response => {
        this.setState({ category3: response });
      })
      .catch((error: Error) => Alert.danger(error.message));
  } //end method

  render() {
    let cat = [];
    this.state.issues.map(issue => {
      if (issue.categoryLevel === 1) {
        this.category = this.state.category1.find(
          e => e.categoryId === issue.categoryId
        );
        cat.push(this.category);
      } else if (issue.categoryLevel === 2) {
        this.category = this.state.category2.find(
          e => e.category2Id === issue.categoryId
        );
        cat.push(this.category);
      } else {
        this.category = this.state.category3.find(
          e => e.category3Id === issue.categoryId
        );
        cat.push(this.category);
      } //end condition
    });
    return (

      <div>
        <Grid>
          <PageHeader title={"Mine saker"} />
          <Table>
            <thead>
              <tr>
                <th>Beskrivelse</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Endre</th>
              </tr>
            </thead>
            <tbody>
              {this.state.issues.map((e, i) => {
                return (
                  <tr key={e.text}>
                    <td>
                      <Nav bsStyle="pills">
                        <NavItem href={"/#min_side/sakoversikt/" + e.issueId}>
                          {e.text}
                        </NavItem>
                      </Nav>
                    </td>
                    <td>{this.setCategory(cat, i)}</td>
                    <td>
                      {this.updateStatus(e.statusName)}
                      <ProgressBar>
                        <ProgressBar
                          bsStyle={this.status.progressBar}
                          active={this.status.inProgress}
                          now={this.status.progress}
                          label={this.status.name}
                          style={{ color: "black" }}
                          key={1}
                        />
                      </ProgressBar>
                    </td>
                    <td>
                      <Button
                        className="knapp"
                        bsStyle="primary"
                        href={"/#/min_side/mine_saker/rediger/" + e.issueId}
                      >
                        Rediger beskrivelse
                      </Button>
                      <Button
                        className="knapp"
                        bsStyle="danger"
                        onClick={this.delete.bind(
                          this,
                          e.issueId,
                          e.statusName
                        )}
                      >
                        Slett
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  } //end method

  //To set progressbar
  updateStatus(status: string) {
    this.status = new Status(status);
  } //end method

  getSorted = () => {
    //Sorting view so completed issues are listed at the bottom
    let sorted: Object = [];
    this.state.issues.map(e => {
      if (e.statusName === "Registered") {
        sorted.push(e);
      }
    });
    this.state.issues.map(e => {
      if (e.statusName === "In progress") {
        sorted.push(e);
      }
    });
    this.state.issues.map(e => {
      if (e.statusName === "Completed") {
        sorted.push(e);
      }
    });
    this.setState({ issues: sorted });
  }; //end method

  setCategory = (cat: Object[], i: number) => {
    if (cat[i] !== undefined) return <div> {cat[i].name}</div>;
  }; //end method
} //end class
