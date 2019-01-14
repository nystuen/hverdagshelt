// @flow

import React from 'react';
import {Grid, Col, Row, Button, Table} from "react-bootstrap";
import {Issue} from "../../../classTypes";
import {UserService} from "../../../services";
import {Alert} from "../../../widgets";

let jwt = require("jsonwebtoken");
let userService = new UserService();

interface State{
    issues: Object[];
    progressType: string;
    progress: number;
}//end interface

interface Props{}

export class MineSaker extends React.Component<Props,State>{
    state = {
        issues: [],
        progressType: '',
        progress: 0
    };
    render(){
        return(
            <Grid>
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
                        <tr>
                            <td>
                                {e.text}
                            </td>
                            <td>
                                {e.categoryId}
                            </td>
                            <td>
                                {e.statusName}
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
    }//end

    checkProgress = (status: string) => {
        //if issue is registered
        if(status === 'Mottatt' || 'mottatt'){
            this.setState({progressBar: "info", progress: 0});

        //if issue is under processing
        }else if(status === 'Under behandling' || 'under behandling'){
            this.setState({progressBar: "warning", progress: 50 });

        //if issue is resolved
        }else{
            this.setState({progressBar: "success", progress: 100});
        }//end condition
    }//end method
}//end class