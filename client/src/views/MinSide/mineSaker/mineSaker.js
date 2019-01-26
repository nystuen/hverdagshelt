// @flow

import React from 'react';
import {
  Grid,
  Button,
  Table,
  ProgressBar,
  Nav,
  NavItem,
  ToggleButton,
  ToggleButtonGroup, FormControl,
} from 'react-bootstrap';
import { Issue } from '../../../classTypes';
import { CategoryService, IssueService, UserService } from '../../../services';
import { Filter } from '../../../components/Filter/Filter';
import { Alert } from '../../../widgets';
import { Status } from '../../../classTypes';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { history } from '../../../index';
import mineSaker from './mineSaker.css';
import update from "immutability-helper";

let jwt = require('jsonwebtoken');
let userService = new UserService();
let categoryService = new CategoryService();
let issueService = new IssueService();
let filter = new Filter();
let buffer = {};

interface State {
  issues: Object[];
  category: Object;
  category1: Object[];
  category2: Object[];
  category3: Object[];
  edit: Object;
}//end interface

interface Props {
}

/**
 * @class MineSaker
 */
export class MineSaker extends React.Component<Props, State> {
  match: { params: { mail: string } };
  constructor(props){
    super(props);
    this.state = {
      issues: [],
      category: [],
      category1: [],
      category2: [],
      category3: [],
      edit: {}
    };
  }//end constructor

    /**
     * deletes an event from user's list of events registered
     *
     * @method delete
     * @param issueId
     * @param statusName
     * @returns void
     */
  delete(issueId: number, statusName: string) {
    if (statusName == 'Registered') {
      if (confirm('Er du sikker på at du vil slette denne saken?')) {
        issueService.deleteIssue(issueId);
        window.location.reload();
      }
    } else if (statusName == 'In progress') {
      alert('denne saken er under arbeid, og kan ikke slettes');
    } else {
      alert('Du kan ikke slette ferdige saker');
    }
    console.log(issueId);
    console.log(statusName);
    //issueService.deleteIssue(issueId);
  }

  componentWillMount() {
    userService.getMyIssues().then(response => {
      this.setState({ issues: response }, () => this.getSorted());
    }).catch((error: Error) => Alert.danger(error.message));

    categoryService.getCategory1().then(response => {
      this.setState({ category1: response });
    }).catch((error: Error) => Alert.danger(error.message));

    categoryService.getCategory2().then(response => {
      this.setState({ category2: response });
    }).catch((error: Error) => Alert.danger(error.message));

    categoryService.getCategory3().then(response => {
      this.setState({ category3: response });
    }).catch((error: Error) => Alert.danger(error.message));
  }//end method

  render() {
    let cat = [];
    this.state.issues.map(issue => {
      if (issue.categoryLevel === 1) {
        this.category = this.state.category1.find(e => e.categoryId === issue.categoryId);
        cat.push(this.category);
      } else if (issue.categoryLevel === 2) {
        this.category = this.state.category2.find(e => e.category2Id === issue.categoryId);
        cat.push(this.category);
      } else {
        this.category = this.state.category3.find(e => e.category3Id === issue.categoryId);
        cat.push(this.category);
      }//end condition
    });
    return (

      <div className="bottomFooter">
        <Grid>
          <PageHeader title={'Mine saker'}/>
          <div align="center">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton onClick={filter.showAll} bsStyle={'primary'} value={1}>Alle</ToggleButton>
              <ToggleButton onClick={filter.filterRegistered} bsStyle={'primary'} value={2}>Registrerte</ToggleButton>
              <ToggleButton onClick={filter.filterInProgress} bsStyle={'primary'} value={3}>Behandles</ToggleButton>
              <ToggleButton onClick={filter.filterCompleted} bsStyle={'primary'} value={4}>Fullført</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Table id={'myTable'}>
            <thead>
            <tr>
              <th>Beskrivelse</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Endre</th>
            </tr>
            </thead>
            <tbody>
            {this.state.issues.map((e,i) => {
              if(e.issueId === this.state.edit) {
                return (
                    <tr key={e.issueId}>
                      <td>
                        <FormControl componentClass={"textarea"}
                                     value={e.text}
                                     onChange={this.handleTextChange(i)}/>
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
                              style={{color: 'black'}}
                              key={1}
                          />
                        </ProgressBar>
                      </td>
                      <td>

                        <Button className="knapp" bsStyle="primary"
                                onClick={() => this.save(e)}>
                          Lagre
                        </Button>

                        <Button className="knapp" bsStyle="link" style={{color: 'darkred'}}
                                onClick={() => this.cancel()}>
                          Avbryt
                        </Button>
                      </td>
                    </tr>
                )
              }else{
                return (
                    <tr key={e.text}>
                      <td style={{'max-width':'10px'}}>
                        <Nav bsStyle="pills">
                          <NavItem href={'/#min_side/sakoversikt/' + e.issueId}>
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
                              style={{color: 'black'}}
                              key={1}
                          />
                        </ProgressBar>
                      </td>
                      <td>

                        <Button className="knapp" bsStyle="link"
                                onClick={() => this.editNow(e.issueId)}>
                          <span className="glyphicon glyphicon-pencil"></span>
                        </Button>

                        <Button className="knapp" bsStyle="link" style={{color: 'darkred'}}
                                onClick={this.delete.bind(
                                    this,
                                    e.issueId,
                                    e.statusName
                                )}>
                          <span className="glyphicon glyphicon-trash"></span>
                        </Button>
                      </td>
                    </tr>
                )
              }//end method
            })}
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  }//end method


  //To set progressbar
  updateStatus(status: string) {
    this.status = new Status(status);
  }//end method

  getSorted = () => {
    //Sorting view so completed issues are listed at the bottom
    let sorted: Object = [];
    this.state.issues.map(e => {
      if (e.statusName === 'Registered') {
        sorted.push(e);
      }
    });
    this.state.issues.map(e => {
      if (e.statusName === 'In progress') {
        sorted.push(e);
      }
    });
    this.state.issues.map(e => {
      if (e.statusName === 'Completed') {
        sorted.push(e);
      }
    });
    this.setState({ issues: sorted }, () => buffer = this.state.issues);
  };//end method

  setCategory = (cat: Object[], i: number) => {
    if (cat[i] !== undefined)
      return <div> {cat[i].name}</div>;
  };//end method

  editNow(issueId: number){
    this.setState({edit: issueId});
  }//end method

  save = (issue: Object) => {
    issueService.editIssue(issue.issueId, issue.text);
    this.setState({edit: {}})
  };

  cancel(){
    this.setState({edit: {}, issues: buffer})
  }//end method

  handleTextChange = (index: number) => (event: Event) => {
    this.setState({issues: update(this.state.issues, {[index]: {text: {$set: event.target.value}}})})
  };

}//end class