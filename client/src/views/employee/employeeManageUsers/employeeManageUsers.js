// @flow

import React from 'react';
import {Grid, Table} from "react-bootstrap";
import {User} from "../../../classTypes";
import {EmployeeService} from "../../../services"
import {UserService} from "../../../services";
import Button from "react-bootstrap/es/Button";
import FormControl from "react-bootstrap/es/FormControl";

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


    buttonBack(){
      this.props.history.goBack();
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

    blockSwitch(e: User){
      if(e.active == 1){
        return <Button style={{"width": "6em"}} bsSize={"sm"} bsStyle={"danger"} onClick={this.blockUser.bind(null, e.mail)}>Block</Button>;
      } else {
        return <Button style={{"width": "6em"}}  bsSize={"sm"} bsStyle={"primary"} onClick={this.unblockUser.bind(null, e.mail)}>Unblock</Button>;
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
                    onKeyUp={this.myFunction}
                    placeholder="Search for names.."/>
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
                            Status
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
                                    {e.active}
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

    myFunction(){
        // Declare variables
        var input, filter, Table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        Table = document.getElementById("myTable");
        tr = Table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

}//end class
