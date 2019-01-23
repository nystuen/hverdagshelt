import React from 'react';
import { Grid, Col, Row, Button, Table, ProgressBar, Nav, NavItem } from 'react-bootstrap';
import {IssueService, UserService} from '../../../services';
import { Status } from '../../../classTypes';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import {history} from "../../../index";

let userService = new UserService();
let issueService = new IssueService();

export class adminIssues extends React.Component{
    state = {
        issues: [],
        user: {},
    };

    componentWillMount(){
        userService.getCurrentUser().then(response => {
            this.setState({user: response[0]});
            issueService.getAllIssuesInThisCounty(response[0].countyId).then(r => {
                this.setState({issues: r});
                this.getSorted();
            }).catch((error: Error) => confirm(error.message));
        }).catch((error: Error) => confirm(error.message));
    }//end method

    render(){
        return(
           <div>
               <Grid>
                  <PageHeader title={'Alle saker i ' + this.state.user.county}/>
                  <Table>
                      <thead>
                      <tr>
                          <th>
                              Beskrivelse
                          </th>
                          <th>
                              Kategori
                          </th>
                          <th>
                              Status
                          </th>
                          <th>

                          </th>
                      </tr>
                      </thead>
                      <tbody>
                        {this.state.issues.map(e => {
                            return(
                                <tr key={e.text}>
                                    <td>
                                        <Nav bsStyle="pills">
                                            <NavItem href={'/#min_side/sakoversikt/' + e.issueId}>
                                                {e.text}
                                            </NavItem>
                                        </Nav>
                                    </td>
                                    <td>
                                        {e.name}
                                    </td>
                                    <td>
                                        {this.updateStatus(e.statusName)}
                                        <ProgressBar>
                                            <ProgressBar bsStyle={this.status.progressBar} active={this.status.inProgress} now={this.status.progress}
                                                         label={this.status.name} style={{color: 'black'}} key={1}/>
                                        </ProgressBar>
                                    </td>
                                    <td>
                                        <Nav>
                                        <NavItem href={'/#behandleSak/' + e.issueId}> <span class="glyphicon glyphicon-pencil"></span></NavItem>
                                        </Nav>
                                    </td>
                                </tr>
                            )
                        })}
                      </tbody>
                  </Table>
               </Grid>
           </div>
        )
    }//end method

    //To set progressbar
    updateStatus(status: string) {
        this.status = new Status(status);
    }//end method

    getSorted = () => {
        //Sorting view so completed issues are listed at the bottom
        let sorted: Object = [];
        this.state.issues.map(e => {
            if(e.statusName === 'Registered'){
                sorted.push(e)
            }
        });
        this.state.issues.map(e => {
            if(e.statusName === 'In progress'){
                sorted.push(e)
            }
        });
        this.state.issues.map(e => {
            if(e.statusName === 'Completed'){
                sorted.push(e)
            }
        });
        this.setState({issues: sorted});
    };//end method

}//end class