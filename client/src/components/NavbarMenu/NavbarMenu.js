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
import * as jwt from 'jsonwebtoken';
import { User } from '../../classTypes';
import { UserService } from '../../services';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

let userService = new UserService();

let loginButton;
let myCases;
let user;

export class NavbarMenu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: {},
      isOpen: false,
      activeKey: 0
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount() {
    userService.getCurrentUser()
      .then(resources => {
        let user = resources[0];
        this.setState({
          user: user
        });
      });
  }


  handleSelect(selectedKey) {
    console.log('selectec:', selectedKey);
    this.setState({ activeKey: selectedKey });
  }

  render() {
    if (window.localStorage.getItem('userToken') === '') {
      loginButton = <NavItem eventKey={13} href="/#login">Login</NavItem>;
    } else {
      loginButton = <NavItem eventKey={13} href="/#login" onClick={() => this.logout()}> Log out</NavItem>;
      this.viewCases();
    }//end condition


    return (
      <div className={'logoBrand'}>
        <Navbar collapseOnSelect fluid className="shadow p-3 mb-5 bg-white rounded">
          <Navbar.Header>
            <Navbar.Brand>
               <img src={'./resources/logo_white.png'}></img>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>

            <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
              <NavItem eventKey={1} href={'/#/'}><Glyphicon glyph="glyphicon glyphicon-home"/> {this.state.user.county}</NavItem>
              <NavItem eventKey={2} href={'/#/wizardForm'}><Glyphicon glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
              <NavItem eventKey={3} href={'/#/events/2'}><i className="fas fa-exclamation-triangle"></i> Hendelser</NavItem>
              <NavItem eventKey={4} href={'/#/statistics'}><Glyphicon glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
              <NavItem eventKey={5} href={'/#/map'}><i className="fas fa-map"></i> Kart</NavItem>
              {this.viewCases()}
              <NavItem eventKey={7} href={'/#/admin'}><Glyphicon glyph="glyphicon glyphicon-user"/> Admin</NavItem>
            </Nav>

            <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
              <NavDropdown eventKey={9} title={'Min side'} id='1'>
                <MenuItem eventKey={9} href="/#min_side/kontooversikt">Kontooversikt </MenuItem>
                <MenuItem eventKey={9} href="/#min_side/varselinstillinger">Varselinstillinger</MenuItem>
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
        window.sessionStorage.setItem('countyId', '');
        window.sessionStorage.setItem('countyName', '');
        this.viewCases();
        loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>;
        this.setState({user: {}})
    };//end method

    viewCases = () => {
        if (window.localStorage.getItem('userToken') !== '') {
            if(this.state.user === {}){
                userService.getCurrentUser().then(r => {
                    this.setState({user: r});
                }).catch((error: Error) => confirm(error.message));
            }
            if (this.state.user.typeName === undefined) {
                return <MenuItem eventKey={19} href="/#min_side/mine_sakerBedrift">Mine saker</MenuItem>;
            } else {
                return <MenuItem eventKey={19} href="/#min_side/mine_saker">Mine saker</MenuItem>;
            }//end condition
        } else {
            return <MenuItem eventKey={19} href="/#login">Mine saker</MenuItem>;
        }//end condition
    };//end method
}