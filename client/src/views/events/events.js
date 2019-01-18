// @flow

import React from 'react';
import { Grid, Col, Row, Button, Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getImportantEvents } from '../../services';
import { Event } from '../../classTypes';
import css from './events.css';
import Panel from 'react-bootstrap/es/Panel';
import PanelGroup from 'react-bootstrap/es/PanelGroup';


interface State {
  countyId: number;
  importantEvents: [Event];
}//end interface

interface Props {
}

export class events extends React.Component<Props, State> {

  state = {
    countyId: -1,
    importantEvents: []
  };

  getInformation = async () => {
    let id: number = this.props.match.params.countyId;
    let eventer = [];
    getImportantEvents(id).then(resources => {
      resources.map(r => {
        let elem: Event = {
          eventId: r.eventId,
          title: r.title,
          text: r.text,
          longitude: r.longitude,
          latitude: r.latitude,
          date: r.date,
          userMail: r.userMail,
          countyId: r.countyId,
          active: r.active
        };
        eventer = eventer.concat(elem);
      });

      this.setState({
        importantEvents: eventer
      });
    });
  };


  componentDidMount() {
    this.getInformation();
  };

  render() {
    return (
      <div className="events">
        <Grid>
          <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
            {
              this.state.importantEvents.map((r, i) => {
                return (
                  <Panel eventKey={r.eventId} bsStyle="info" key={r.eventId}>
                    <Panel.Heading>
                      <Panel.Title toggle>{r.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      <b>{r.text}</b>
                      <p>Publisert {r.date}</p>
                    </Panel.Body>
                  </Panel>
                );
              })
            }
          </PanelGroup>
        </Grid>
      </div>
    )
      ;
  }//end method
}