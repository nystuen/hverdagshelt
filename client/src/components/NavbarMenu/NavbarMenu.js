// @flow

import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ListGroupItem,
    ListGroup
} from 'react-bootstrap';
import {MinSideMenu} from "../MinSideMenu/MinSideMenu";

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
        return (
            <Navbar collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/#">Hverdagshelt</a>
                    </Navbar.Brand>

                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/#min_side">Min Side</NavItem>
                        <NavItem eventKey={2} href="/#min_side/mine_saker">Login</NavItem>

                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        );
    }
}
