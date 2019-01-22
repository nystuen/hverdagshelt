// @flow

import React from 'react';

import {Alert} from "../../../widgets";
import {Grid, Table, ListGroupItem} from "react-bootstrap";
import {User} from "../../../classTypes";
import {EmployeeService} from "../../../services"
import Switch from 'react-bootstrap-switch';
import Toggle from 'react-bootstrap-toggle';
import Button from "react-bootstrap/es/Button";
import {BlockUser} from "../../../components/BlockUser/BlockUser";



let blockUser = new BlockUser;
let employeeService = new EmployeeService;




interface State{
    user: Object[];

}//end interface

interface Props{}


export class employeeManageUsers extends React.Component<Props,State>{
    state = {
        user: [],
        countyId: 3
};

    blockUser(){
        employeeService.blockUser();
    }

    unblockUser(){
        employeeService.unblockUser();

    }


    componentWillMount() {

        let id = this.state.user;
        console.log(id);
        console.log(this.state.user)
        employeeService.getUsersInCounty(3).then(response => {
            this.setState({user: response, countyId: response});
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
                                    <Button bsSize={"sm"} bsStyle={"primary"} onClick={this.unblockUser(e.mail)}>Unblock</Button>
                                </td>
                                <td>
                                    <Button bsSize={"sm"} bsStyle={"danger"} onClick={this.blockUser(e.mail)}>Block</Button>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Grid>
        )}

}//end class