// @flow

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {UserService} from "../../services";
import {Alert} from "../../widgets";
let jwt = require("jsonwebtoken");

interface State {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    countyId: string
}

export class EditInformation extends React.Component {
    state = {
        email: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret").userMail
}


}