import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Button
} from 'react-bootstrap';
import css from './NavbarMenu.css';
import { PageHeader } from '../pageHeader/PageHeader';
import { UserService } from '../../services';
import { User } from '../../classTypes';

let userService = new UserService();

let loginButton;

/**
 * @class NavbarMenu
 */
export class NavbarMenu extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: {},
      isOpen: false,
      activeKey: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillMount = async () => {
    await userService.getCurrentUser()
      .then(resources => {
        let user = resources[0];
        this.setState({
          user: user
        });
      });
    if (window.sessionStorage.getItem('countyId') === '' || window.sessionStorage.getItem('countyId') === null) {
      await window.sessionStorage.setItem('countyId', this.state.user.countyId);
      await window.sessionStorage.setItem('countyName', this.state.user.county);
    }


  };


  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey});
  }

  render() {
    if (window.localStorage.getItem('userToken') === '') {
      loginButton = <NavItem eventKey={13} href="/#login">Login</NavItem>;
    } else {
      loginButton = <NavItem eventKey={13} href="/#login" onClick={() => this.logout()}> Log out</NavItem>;
      this.viewCases();
    }//end condition

    if (window.localStorage.getItem('userToken') !== '') {
      if (this.state.user.typeName === 'Admin') {
        return (
          <div className={'logoBrand'}>
            <Navbar collapseOnSelect fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href={'/#/'} onClick={() => this.setState({activeKey: 0})}><img src={'./resources/logo_white.png'}></img></a>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>
              <Navbar.Collapse>

                <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavItem eventKey={1} href={'/#/endreKommune'}><Glyphicon
                    className="hideIconWhenSmall"  glyph="glyphicon glyphicon-home"/> {window.sessionStorage.getItem('countyName')}
                  </NavItem>
                  <NavItem eventKey={2} href={'/#/innsending'}><Glyphicon
                    className="hideIconWhenSmall" glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
                  <NavItem eventKey={3} href={'/#/hendelser/' + window.sessionStorage.getItem('countyId')}>
                    <i className="fas fa-exclamation-triangle hideIconWhenSmall"></i> Hendelser</NavItem>
                  <NavItem eventKey={4} href={'/#/statistikk'}><Glyphicon
                    className="hideIconWhenSmall" glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
                  <NavItem eventKey={5} href={'/#/kart'}><i className="fas fa-map hideIconWhenSmall"></i> Alle saker</NavItem>
                  {this.viewCases()}
                  <NavItem eventKey={7} href={'/#/handlinger'}><Glyphicon
                    className="hideIconWhenSmall"  glyph="glyphicon glyphicon-user"/> Admin</NavItem>
                </Nav>

                <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavDropdown eventKey={9} title={this.state.user.firstName}  id='1'>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#/kontoinnstillinger">Kontoinstillinger</MenuItem>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#/varselinstillinger">Varselinstillinger</MenuItem>
                  </NavDropdown>
                  {loginButton}
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </div>
        );
      } else if (this.state.user.typeName === 'Employee') {
        return (
          <div className={'logoBrand'}>
            <Navbar collapseOnSelect fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href={'/#/'} onClick={() => this.setState({activeKey: 0})}><img src={'./resources/logo_white.png'}></img></a>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>

              <Navbar.Collapse>

                <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavItem eventKey={2} href={'/#/innsending'}><Glyphicon
                    glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
                  <NavItem eventKey={3} href={'/#/hendelser/' + window.sessionStorage.getItem('countyId')}>
                    <i className="fas fa-exclamation-triangle"></i> Hendelser</NavItem>
                  <NavItem eventKey={4} href={'/#/statistikk'}><Glyphicon
                    glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
                  <NavItem eventKey={5} href={'/#/kart'}><i className="fas fa-map"></i> Alle saker</NavItem>
                  {this.viewCases()}
                  <NavItem eventKey={7} href={'/#/handlinger'}><Glyphicon
                    glyph="glyphicon glyphicon-user"/> Ansatt</NavItem>
                </Nav>

                <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavDropdown eventKey={9} title={this.state.user.firstName} id='1'>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#kontoinnstillinger">Kontoinstillinger</MenuItem>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#/varselinstillinger">Varselinstillinger</MenuItem>
                  </NavDropdown>
                  {loginButton}
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </div>
        );
      } else if (this.state.user.typeName === 'Private') {
        return (
          <div className={'logoBrand'}>
            <Navbar collapseOnSelect fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href={'/#/'} onClick={() => this.setState({activeKey: 0})}><img src={'./resources/logo_white.png'}></img></a>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>

              <Navbar.Collapse>



                <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavItem eventKey={1} href={'/#/endreKommune'}><Glyphicon
                    glyph="glyphicon glyphicon-home"/> {window.sessionStorage.getItem('countyName')}
                  </NavItem>
                  <NavItem eventKey={2} href={'/#/innsending'}><Glyphicon
                    glyph="glyphicon glyphicon-plus"/> Meld inn sak</NavItem>
                  <NavItem eventKey={3} href={'/#/hendelser/' + window.sessionStorage.getItem('countyId')}>
                    <i className="fas fa-exclamation-triangle"></i> Hendelser</NavItem>
                  <NavItem eventKey={4} href={'/#/statistikk'}><Glyphicon
                    glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
                  <NavItem eventKey={5} href={'/#/kart'}><i className="fas fa-map"></i> Alle saker</NavItem>
                  {this.viewCases()}
                </Nav>

                <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavDropdown eventKey={9} title={this.state.user.firstName}  id='1'>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#kontoinnstillinger">Kontoinstillinger</MenuItem>
                    <MenuItem id={'dropdownMenuItem'} eventKey={9}
                              href="/#/varselinstillinger">Varselinstillinger</MenuItem>
                  </NavDropdown>
                  {loginButton}
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </div>
        );

      } else {
        return (
          <div className={'logoBrand'}>
            <Navbar collapseOnSelect fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href={'/#/'} onClick={() => this.setState({activeKey: 0})}><img src={'./resources/logo_white.png'}></img></a>
                </Navbar.Brand>
                <Navbar.Toggle/>
              </Navbar.Header>

              <Navbar.Collapse>

                <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavItem eventKey={4} href={'/#/statistikk'}><Glyphicon
                    glyph="glyphicon glyphicon-stats"/> Statistikk</NavItem>
                  <NavItem eventKey={5} href={'/#/kart'}><i className="fas fa-map"></i> Kart over tildelte
                    saker</NavItem>
                  {this.viewCases()}
                </Nav>

                <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                  <NavItem eventKey={9} href="/#kontoinnstillinger">Kontoinstillinger</NavItem>
                  {loginButton}
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          </div>
        );
      }//end condition
    } else {
      return (
        <div className={'logoBrand'}>
          <Navbar collapseOnSelect fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href={'/#/'} onClick={() => this.setState({activeKey: 0})}><img src={'./resources/logo_white.png'}></img></a>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
                {loginButton}
              </Nav>
            </Navbar.Collapse>


          </Navbar>
        </div>
      );
    }//end condition
  }//end method

    /**
     * Logs the user out by emptying localstorage and sessionstorage
     *
     * @method logout
     * @returns void
     */
  logout = () => {
    window.localStorage.setItem('userToken', '');
    window.sessionStorage.setItem('countyId', '');
    window.sessionStorage.setItem('countyName', '');
    this.viewCases();
    loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>;
    this.setState({ user: {} });

    window.location.reload();
  };//end method

    /**
     * Contitional rendering for "mine saker" button on navbar, depending on which user is logged in
     *
     * @method viewCases
     * @returns {*}
     */
  viewCases = () => {
    if (window.localStorage.getItem('userToken') !== '') {
      if (this.state.user == undefined) {
        userService.getCurrentUser().then(r => {
          this.setState({ user: r });
        }).catch((error: Error) => confirm(error.message));

      }
      if (this.state.user.typeName === undefined) {
        return <MenuItem eventKey={22} href="/#min_side/mine_sakerBedrift"><i
          className="fas fa-list-ul hideIconWhenSmall"></i> Mine saker</MenuItem>;
      } else {
        return <MenuItem eventKey={22} href="/#min_side/mine_saker"><i
          className="fas fa-th-list hideIconWhenSmall"></i> Mine
          saker</MenuItem>;
      }//end condition
    } else {
      return <MenuItem eventKey={22} href="/#login"><i className="fas fa-th-list hideIconWhenSmall"></i> Mine
        saker</MenuItem>;
    }//end condition
  };//end method
}