// @flow

import React from 'react';
import {Grid, Table} from "react-bootstrap";
import {User} from "../../../classTypes";
import {EmployeeService} from "../../../services"
import {UserService} from "../../../services";
import Button from "react-bootstrap/es/Button";

let employeeService = new EmployeeService;
let userService = new UserService;



interface State{
    user: User[];
    employee: User;

}//end interface

interface Props{}


export class employeeManageUsers extends React.Component<Props,State>{
    match: { params: { mail: string } }
    state = {
        user: [],
        employee: new User('', '', '', '', '', -1, -1, -1)
};


    blockUser(mail: string){
        console.log(mail);
        employeeService.blockUser(mail)
    }

    unblockUser(mail: string){
        console.log(mail);
        employeeService.unblockUser(mail)
    }


    componentWillMount() {
        let employee = null;

        userService.getCurrentUser()
            .then(resource => {
                employee = resource;
                console.log("res", resource);
                this.setState({
                    employee: employee
                });
                console.log( "employee countyId", this.state.employee[0].countyId);
                employeeService.getUsersInCounty(this.state.employee[0].countyId).then(response => {
                    this.setState({user: response});
                    console.log("mail check", this.state.user);
                    console.log("res", response)
                });
            });
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
                        <th>
                            Aktiver
                        </th>
                        <th>
                            Blokker
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.user.map(e => {
                        return(

                            <tr key={e.mail}>
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
                                    <Button bsSize={"sm"} bsStyle={"primary"} onClick={this.unblockUser.bind(null, e.mail)}>Unblock</Button>
                                </td>
                                <td>
                                    <Button bsSize={"sm"} bsStyle={"danger"} onClick={this.blockUser.bind(null, e.mail)}>Block</Button>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Grid>
        )}

}//end class
