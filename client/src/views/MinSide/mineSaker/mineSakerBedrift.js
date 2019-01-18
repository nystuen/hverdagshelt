// @flow

import React from 'react';
import {Grid, Col, Row, Button, Table} from "react-bootstrap";
import {Issue} from "../../../classTypes";
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

export class mineSakerBedrift extends React.Component<State>{
    state = {
      issues: [],
      decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret")
    };

    componentWillMount() {
        userService.getCompanyIssues(this.state.decoded.email).then(response => {
            this.setState({issues: response});
            this.getSorted();
        }).catch((error: Error) => Alert.danger(error.message));
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
                                        <NavItem href={"/#min_side/sakoversikt/" + this.state.decoded.email + "/" + e.issueId}>
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
                                    <ProgressBar bsStyle={this.status.progressBar} active now={this.status.progress}
                                             label={e.statusName} style={{color: 'black'}} key={1}/>
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
            if(e.statusName == 'Registered'){
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