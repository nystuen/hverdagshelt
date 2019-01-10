// @flow

import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export class MinSideMenu extends React.Component <{ type: string }> {

    render() {
        return (
            <div>
                {
                    this.props.type === 'privat' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/mine_saker">Mine Saker</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kontooversikt">Kontooversikt</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kommuner">Kommuner</ListGroupItem>
                                <hr className="my-2"/>
                                <ListGroupItem tag="a" href="/#min_side/varselinstillinger">Varselinstillinger</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type === 'admin' || this.props.type === 'ansatt' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/kontooversikt">Kontooversikt</ListGroupItem>
                            </ListGroup>
                        </div>
                    ) : (
                        <div/>
                    )
                }
                {
                    this.props.type === 'bedrift' ? (
                        <div>
                            <ListGroup flush>
                                <ListGroupItem tag="a" href="/#min_side/arbeids_omraade">Arbeidsområde</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kontooversikt">Kontooversikt</ListGroupItem>
                                <ListGroupItem tag="a" href="/#min_side/kommuner">Kommuner</ListGroupItem>
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