import React from 'react';
import { Grid, Col, Row, Button, Table } from 'react-bootstrap';
import { Issue } from '../../../classTypes';
import { CategoryService, UserService } from '../../../services';
import { Alert } from '../../../widgets';
import ProgressBar from 'react-bootstrap/es/ProgressBar';
import { Status } from '../../../classTypes';
import NavLink from 'react-router-dom/es/NavLink';
import Nav from 'react-bootstrap/es/Nav';
import NavItem from 'react-bootstrap/es/NavItem';
import Progress from 'reactstrap/es/Progress';
import { PageHeader } from '../../../components/PageHeader/PageHeader';

export class adminIssues extends React.Component{
    state = {
        issues: [],
        category: [],
        category1: [],
        category2: []
    };

    componentWillMount(){

    }//end method



}//end class