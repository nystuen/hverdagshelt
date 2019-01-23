import React from 'react';
import { Grid, Col, Row, Button, Table } from 'react-bootstrap';
import {IssueService, UserService} from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import {history} from "../../../index";
import FormControl from "react-bootstrap/es/FormControl";

let issueService = new IssueService();
let userService = new UserService();

export class interactWithIssue extends React.Component{
    state={
      companies: [],
      issue: {},
      selectedCompany: {}
    };

    render(){
        return(
            <div>
                <br/>
                <Grid>
                    <PageHeader title={"Behandle sak"}/>
                    <Row>
                        <Col>
                            <FormControl onChange={this.setCompany} componentClass="select" placeholder="select">
                                <option value="">Tildel oppgaven til en bedrift </option>
                            {this.state.companies.map(e => {
                                return(
                                    <option key={e.companyMail} value={e.companyMail}>{e.companyName}</option>
                                )
                            })}
                            </FormControl>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }//end method

    componentWillMount(){
        issueService.getOneIssue(this.props.match.params.issueId).then(response => {
            this.setState({issue: response[0]});
            userService.getCompanyCategories(response[0].categoryId).then(r => {
                this.setState({companies: r});
            }).catch((error: Error) => confirm(error.message));
        }).catch((error: Error) => confirm(error.message));
    }//end method
}//end class