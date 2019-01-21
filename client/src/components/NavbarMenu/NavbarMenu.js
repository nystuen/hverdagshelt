import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';
import css from './NavbarMenu.css';
import {PageHeader} from '../PageHeader/PageHeader';
import * as jwt from 'jsonwebtoken';
import {User} from '../../classTypes';
import {UserService} from '../../services';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

let userService = new UserService();

let loginButton;
let myCases;

export class NavbarMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            user: new User('', '', '', '', -1, -1, -1, -1),
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        userService.getCurrentUser()
            .then(resources => {
                let user = resources[0];
                this.setState({
                    user: user
                })
            })
    }

    render() {
        if (window.localStorage.getItem('userToken') === '') {
            loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>;
        } else {
            loginButton = <NavItem eventKey={1} href="/#login" onClick={() => this.logout()}> Log out</NavItem>;
            this.viewCases();
        }//end condition


        return (
            <div className={"logoBrand"}>
                <Navbar collapseOnSelect fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={'./resources/logo_svart.png'}/>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>

          <Navbar.Collapse>

            <Nav>
              <NavItem href={'/#/'}><Glyphicon glyph="glyphicon glyphicon-th-list"/> Velg kommune</NavItem>
              <NavItem href={'/#/wizardForm'}><Glyphicon glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
              <NavItem href={'/#/events/2'}><Glyphicon glyph="glyphicon glyphicon-road"/> Hendelser</NavItem>
              <NavItem href={'/#/statistics'}><Glyphicon glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
              <NavItem href={'/#/map'}><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Kart</NavItem>
              <NavItem href={'/#/admin'}><Glyphicon glyph="glyphicon glyphicon-user"/> Admin</NavItem>
            </Nav>

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
      </div>
    )
      ;
  }//end method

    logout = () => {
        window.localStorage.setItem('userToken', '');
        this.viewCases();
        loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>;
    };//end method

    viewCases = () => {
        if (window.localStorage.getItem('userToken') !== '') {
            if (this.state.user.typeName === 'Company') {
                return <MenuItem eventKey={2} href="/#min_side/mine_sakerBedrift">Mine saker</MenuItem>;
            } else {
                return <MenuItem eventKey={2} href="/#min_side/mine_saker">Mine saker</MenuItem>;
            }//end condition}
        } else {
            return <MenuItem eventKey={2} href="/#login">Mine saker</MenuItem>;
        }//end condition
    };//end method
}
