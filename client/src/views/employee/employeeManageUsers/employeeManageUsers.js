// @flow

import React from 'react';

import {Alert} from "../../../widgets";
import {Grid, Table} from "react-bootstrap";
import {User} from "../../../classTypes";
import {EmployeeService} from "../../../services"


let jwt = require("jsonwebtoken");
let employeeService = new EmployeeService;




interface State{
    user: Object[];
    decoded: Object;
}//end interface

interface Props{}


export class employeeManageUsers extends React.Component<Props,State>{
    state = {
        user: [],
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
};


    componentWillMount() {
        let id: number = 3; //this.props.match.params.countyId;
        console.log(id);
        employeeService.getUsersInCounty(id).then(response => {
            this.setState({user: response});
        }).catch((error: Error) => Alert.danger(error.message));
    }


    render(){
        return(
            <Grid>
                <br/>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            Epost
                        </th>
                        <th>
                            Telefon
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Poeng
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.user.map(e => {
                        return(
                            <tr>
                                <td>
                                    {e.mail}
                                </td>
                                <td>
                                    {e.phone}
                                </td>
                                <td>
                                    {e.active}
                                </td>
                                <td>
                                    {e.points}
                                </td>
                                <td>
                                    <button key={this.state.mail}>Block</button>
                                    <button>Unblock</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Grid>
        )}

}//end class