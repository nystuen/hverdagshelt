// @flow

import React from 'react';
import {Nav, NavItem, NavLink, ListGroup, ListGroupItem} from 'reactstrap';

export class MinSideMenu extends React.Component <{ type: string }> {
    render() {
        return (
            <div>
                {
                    this.props.type === 'privat' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/mine_saker">Mine Saker</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/informasjon">Informasjon</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kommuner">Kommuner</ListGroupItem>
                                <hr className="my-2"/>
                                <ListGroupItem tag="a" href="/#min_side/varselinstillinger">Varselinstillinger</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/endre_passord">Endre Passord</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type === 'admin' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/informasjon">Informasjon</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/endre_passord">Endre Passord</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type === 'bedrift' || this.props.type === 'ansatt' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/arbeids_omraade">Arbeidsområde</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/informasjon">Informasjon</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kommuner">Kommuner</ListGroupItem>
                                <hr className="my-2"/>
                                <ListGroupItem tag="a" href="/#min_side/endre_passord">Endre Passord</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
            </div>
        );
    }
}