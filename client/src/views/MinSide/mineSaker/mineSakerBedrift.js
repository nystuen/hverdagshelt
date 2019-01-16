// @flow

import React from 'react';
import {Grid, Col, Row, Button, Table} from "react-bootstrap";
import {Issue} from "../../../classTypes";
import {CategoryService, UserService} from "../../../services";
import {Alert} from "../../../widgets";
import ProgressBar from "react-bootstrap/es/ProgressBar";
import {Status} from "../../../classTypes";
import NavLink from "react-router-dom/es/NavLink";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";
import Progress from "reactstrap/es/Progress";

let jwt = require("jsonwebtoken");
let userService = new UserService();
let categoryService = new CategoryService();

interface State{
    issues: Object[];
    decoded: Object;
}

export class mineSakerBedrift extends React.Component<State>{
    state = {
      issues: [],
      decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret")
    };

    componentWillMount() {
        userService.getCompanyIssues(this.state.decoded.email).then(response => {
            this.setState({issues: response});
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    render(){
        return(
            <Grid>
                ss
            </Grid>
        )
    }//end method
}//end class