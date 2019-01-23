import React from 'react';
import { Grid, Col, Row, Button, Table } from 'react-bootstrap';
import {IssueService, UserService} from '../../../services';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import {history} from "../../../index";

let issueService = new IssueService();
let userService = new UserService();

export class interactWithIssue extends React.Component{
    state={
      companies: [],
      issue: {}
    };

    render(){
        return(
            <div>
                <br/>
                <Grid>
                    <PageHeader title={"Behandle sak"}/>
                </Grid>
            </div>
        )
    }//end method

    componentWillMount(){
        issueService.getOneIssue(this.props.match.params.issueId).then(response => {
            this.setState({issue: response[0]});
        }).catch((error: Error) => confirm(error.message));
    }//end method
}//end class