

import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import css from './NavbarMenu.css';
import { PageHeader } from '../PageHeader/PageHeader';
import * as jwt from "jsonwebtoken";


let loginButton;
let myCases;

export class NavbarMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (window.localStorage.getItem('userToken') === '') {
            loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>
        } else {
            loginButton = <NavItem eventKey={1} href="/#login" onClick={() => this.logout()}> Log out</NavItem>
            this.viewCases();
        }//end condition

        return (
            <Navbar collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/#/forside/2">Hverdagshelt</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown title={'Min side'} id='1'>
                            {this.viewCases()}
                            <MenuItem eventKey={1} href="/#min_side/kontooversikt">Kontooversikt </MenuItem>
                            <MenuItem eventKey={1} href="/#min_side/kommuner">Kommuner</MenuItem>
                            <MenuItem eventKey={1} href="/#min_side/varselinstillinger">Varselinstillinger</MenuItem>
                        </NavDropdown>
                        {loginButton}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }//end method

    logout = () => {
        window.localStorage.setItem('userToken', '');
        this.viewCases();
        loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>
    };//end method

    viewCases = () => {
        if (window.localStorage.getItem('userToken') !== '') {
            let decoded = jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret');
            if (decoded.typeId === 'Company') {
                return <MenuItem eventKey={2} href="/#min_side/mine_sakerBedrift">Mine saker</MenuItem>
            } else {
                return <MenuItem eventKey={2} href="/#min_side/mine_saker">Mine saker</MenuItem>
            }//end condition}
        }else{
            return <MenuItem eventKey={2} href="/#login">Mine saker</MenuItem>
        }//end condition
    };//end method
}