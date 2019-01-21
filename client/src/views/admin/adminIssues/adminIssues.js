import React from 'react';
import { Grid, Col, Row, Button, Table } from 'react-bootstrap';
import { Issue } from '../../../classTypes';
import {CategoryService, IssueService, UserService} from '../../../services';
import { Alert } from '../../../widgets';
import ProgressBar from 'react-bootstrap/es/ProgressBar';
import { Status } from '../../../classTypes';
import NavLink from 'react-router-dom/es/NavLink';
import Nav from 'react-bootstrap/es/Nav';
import NavItem from 'react-bootstrap/es/NavItem';
import Progress from 'reactstrap/es/Progress';
import { PageHeader } from '../../../components/PageHeader/PageHeader';

let userService = new UserService();
let categoryService = new CategoryService();
let issueService = new IssueService();

export class adminIssues extends React.Component{
    state = {
        issues: [],
        category: [],
        category1: [],
        category2: [],
        user: [],
    };

    componentWillMount(){
        userService.getCurrentUser().then(response => {
            this.setState({user: response});
            issueService.getAllIssuesInThisCounty(response[0].countyId).then(r => {
                this.setState({issues: r});
            }).catch((error: Error) => confirm(error.message));
        }).catch((error: Error) => confirm(error.message));
        categoryService.getCategory1().then(response => {

        }).catch((error: Error) => confirm(error.message));
    }//end method



}//end class