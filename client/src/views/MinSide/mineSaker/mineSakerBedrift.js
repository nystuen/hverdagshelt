// @flow

import React from 'react';
import {Grid, Col, Row, Button, Table} from "react-bootstrap";
import {Company, Issue} from "../../../classTypes";
import {CategoryService, UserService} from "../../../services";
import {Alert} from "../../../widgets";
import ProgressBar from "react-bootstrap/es/ProgressBar";
import {Status} from "../../../classTypes";
import NavLink from "react-router-dom/es/NavLink";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";
import Progress from "reactstrap/es/Progress";

let jwt = require("jsonwebtoken");
let userService = new UserService();
let categoryService = new CategoryService();

interface State{
    issues: Object[];
    decoded: Object;
}

export class mineSakerBedrift extends React.Component{
    state = {
      issues: [],
      user: new Company('1',1,'121232','','')
    };

    componentWillMount() {
        let user ={};
        console.log('hei');
        userService.getCurrentUser().then(r => {
            user = r[0];
            userService.getCompanyIssues(user.companyMail).then(response => {
                this.setState({issues: response, user: user});
                this.getSorted();
            }).catch((error: Error) => Alert.danger(error.message));
        }).catch((error: Error) => confirm(error.message));
    }//end method

    render(){
        return(
            <Grid>
                <br/>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            Beskrivelse
                        </th>
                        <th>
                            Adresse
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.issues.map(e => {
                        return(
                            <tr key={e.issueId}>
                                <td>
                                    <Nav bsStyle="pills">
                                        <NavItem href={'/#min_side/sakoversikt/' + e.issueId}>
                                            {e.text}
                                        </NavItem>
                                    </Nav>
                                </td>
                                <td>
                                    {e.address}
                                </td>
                                <td>
                                    {this.updateStatus(e.statusName)}
                                    <ProgressBar>
                                    <ProgressBar bsStyle={this.status.progressBar} active={this.status.inProgress} now={this.status.progress}
                                             label={this.status.name} style={{color: 'black'}} key={1}/>
                                    </ProgressBar>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Grid>
        )
    }//end method

    //To set progressbar
    updateStatus(status: string){
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