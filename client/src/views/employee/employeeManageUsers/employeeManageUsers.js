// @flow

import React from 'react';
import {Grid, Table, Button,FormControl} from "react-bootstrap";
import {User} from "../../../classTypes";
import {EmployeeService} from "../../../services"
import {UserService} from "../../../services";
import {Filter} from "../../../components/Filter/Filter";

let employeeService = new EmployeeService;
let userService = new UserService;
let filter = new Filter();



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
        if (confirm('Er du sikker på du vil blokkere' + mail + ' ?')) {
            employeeService.blockUser(mail);
            window.location.reload();
        }
    }

    unblockUser(mail: string){
        if (confirm('Er du sikker på di vil gi ' + mail + 'tilgang igjen?')) {
            employeeService.unblockUser(mail);
            window.location.reload();
        }
    }

    buttonBack(){
      this.props.history.goBack();
    }


    componentWillMount() {
        let employee = null;

        userService.getCurrentUser()
            .then(resource => {
                employee = resource;
                this.setState({
                    employee: employee
                });
                console.log( "employee countyId", this.state.employee[0].countyId);
                employeeService.getUsersInCounty(this.state.employee[0].countyId).then(response => {
                    this.setState({user: response});
                });
            });
    }

    blockSwitch(e: User){
      if(e.active == 1){
        return <Button style={{"width": "6em"}} bsSize={"sm"} bsStyle={"danger"} onClick={this.blockUser.bind(null, e.mail)}>Blokker</Button>;
      } else {
        return <Button style={{"width": "6em"}} bsSize={"sm"} bsStyle={"primary"} onClick={this.unblockUser.bind(null, e.mail)}>Aktiver</Button>;
      }
    }

    render(){
        return(
          <div>
          <i id="backButton"  onClick={()=> this.buttonBack()} className="fas fa-arrow-circle-left"></i>
            <Grid>


                <br/>
                <br/>
                <FormControl
                    type="text"
                    id="myInput"
                    onKeyUp={filter.filterTable}
                    placeholder="Søk på epost"/>
                <Table id={"myTable"}>
                    <thead>
                    <tr>
                        <th>
                            Epost
                        </th>
                        <th>
                            Telefon
                        </th>
                        <th>
                            Poeng
                        </th>
                        <th>
                            Blokker/Aktiver
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
                                    {e.points}
                                </td>
                                <td>
                                  {this.blockSwitch(e)}
                                </td>

                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Grid>
          </div>
        )}

}//end class
