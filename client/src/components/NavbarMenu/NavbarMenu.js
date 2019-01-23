import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Glyphicon
} from 'react-bootstrap';
import css from './NavbarMenu.css';
import { PageHeader } from '../PageHeader/PageHeader';
import {UserService} from '../../services';

let userService = new UserService();

let loginButton;
let myCases;

export class NavbarMenu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: {typeName: ''},
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount() {
    let user = {};
    userService.getCurrentUser()
      .then(resources => {
        if (resources[0] === undefined) {
          user = {}
        } else {
            let user = resources[0];
        }
        console.log(user);
        this.setState({
          user: user
        });
      });
  }

  render() {
    if (window.localStorage.getItem('userToken') === '') {
      loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>;
    } else {
      loginButton = <NavItem eventKey={1} href="/#login" onClick={() => this.logout()}> Log out</NavItem>;
      this.viewCases();
    }//end condition


    return (
      <div className={'logoBrand'}>
        <Navbar collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={'./resources/logo_svart.png'}/>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>

            <Nav>
              <NavItem href={'/#/'}><Glyphicon glyph="glyphicon glyphicon-home"/> {this.state.user.county}</NavItem>
              <NavItem href={'/#/wizardForm'}><Glyphicon glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
              <NavItem href={'/#/events/2'}><Glyphicon glyph="glyphicon glyphicon-road"/> Hendelser</NavItem>
              <NavItem href={'/#/statistics'}><Glyphicon glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
              <NavItem href={'/#/map'}><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Kart</NavItem>
              {this.viewCases()}
              <NavItem href={'/#/map'}><i className="fas fa-map"></i> Kart</NavItem>
              <NavItem href={'/#/admin'}><Glyphicon glyph="glyphicon glyphicon-user"/> Admin</NavItem>
            </Nav>

            <Nav pullRight>
              <NavDropdown title={'Min side'} id='1'>
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

      if (this.state.user.typeName === undefined && this.state.user.companyMail !== undefined) {
        return <NavItem eventKey={2} href="/#min_side/mine_sakerBedrift"><Glyphicon glyph="glyphicon glyphicon-user"/>Mine
          saker</NavItem>;
      } else {
        return <NavItem eventKey={2} href="/#min_side/mine_saker"> <Glyphicon glyph="glyphicon glyphicon-user"/>Mine
          saker</NavItem>;
      }//end condition}

    } else {
      return <NavItem eventKey={2} href="/#login"><Glyphicon glyph="glyphicon glyphicon-user"/>Mine saker</NavItem>;
    }//end condition
  };//end method
}
