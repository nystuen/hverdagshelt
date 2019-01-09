// @flow

import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

export class MinSideMenu extends React.Component <{ type: string }> {
    render() {
        return (
            <div>
                {
                    this.props.type = 'privat' ? (
                        <div>
                            <p>Min Side</p>
                            <Nav vertical>
                                <NavItem>
                                    <NavLink href="/#min_side/mine_saker">Mine Saker</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/informasjon">Informasjon</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/kommuner">Kommuner</NavLink>
                                </NavItem>
                                <hr/>
                                <NavItem>
                                    <NavLink href="/#min_side/varselinstillinger">Varselinstillinger</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/endre_passord">Endre Passord</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type = 'admin' ? (
                        <div>
                            <p>Min Side</p>
                            <Nav vertical>
                                <NavItem>
                                    <NavLink href="/#min_side/informasjon">Informasjon</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/endre_passord">Endre Passord</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type === 'bedrift' || this.props.type === 'ansatt' ? (
                        <div>
                            <p>Min Bedrift</p>
                            <Nav vertical>
                                <NavItem>
                                    <NavLink href="/#min_side/arbeidsomraade">Arbeidsområde</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/informasjon">Informasjon</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/#min_side/kommuner">Kommuner</NavLink>
                                </NavItem>
                                <hr/>
                                <NavItem>
                                    <NavLink href="/#min_side/endre_passord">Endre Passord</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    ) : (
                        <div/>
                    )
                }
            </div>
        );
    }
}