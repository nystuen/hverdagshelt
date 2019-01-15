// @flow

import React from 'react';
import {Grid, Col, Row, Button, Table} from "react-bootstrap";
import {Issue} from "../../../classTypes";
import {UserService} from "../../../services";
import {Alert} from "../../../widgets";
import ProgressBar from "react-bootstrap/es/ProgressBar";
import {Status} from "../../../classTypes";
import NavLink from "react-router-dom/es/NavLink";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";

let jwt = require("jsonwebtoken");
let userService = new UserService();

let status = null;

interface State{
    issues: Object[];
    category: Object[];
    decoded: Object;
}//end interface

interface Props{}

export class MineSaker extends React.Component<Props,State>{
    state = {
        issues: [],
        category: [],
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret")
    };
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
                            Kategori
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.state.issues.map(e => {
                    return(
                        <tr key={e.text}>
                            <td>
                                <Nav bsStyle="pills">
                                    <NavItem href={"/#min_side/sakoversikt/" + this.state.decoded.email + "/" + e.issueId}>
                                    {e.text}
                                    </NavItem>
                                </Nav>
                            </td>
                            <td>
                                {e.category}
                            </td>
                            <td>
                                {this.updateStatus(e.statusName)}
                                <ProgressBar bsStyle={this.status.progressBar} now={this.status.progress}
                                label={e.statusName}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            </Grid>
        )
    }//end method

    componentDidMount(){
        let decoded = jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret");
        userService.getMyIssues(decoded.email).then(response => {
            this.setState({issues: response});
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    //to set progressbar
    updateStatus(status: string){
        this.status = new Status(status);
    }//end method

}//end class