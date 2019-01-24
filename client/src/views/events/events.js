// @flow

import React from 'react';
import { Grid, Col, Row, Button, Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import { EventCategoryService } from '../../services';
import { Event } from '../../classTypes';
import css from './events.css';
import Panel from 'react-bootstrap/es/Panel';
import PanelGroup from 'react-bootstrap/es/PanelGroup';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { MapComponent } from '../../components/map/Map';

let eventCategoryService = new EventCategoryService();

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
    let events = [];
    eventCategoryService.getImportantEvents(id).then(resources => {
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
        events = events.concat(elem);
      });

      this.setState({
        importantEvents: events
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

          <PageHeader title={'Hendelser i din kommune'}/>
          <Col md={2}></Col>

          <Col md={8}>
            <PanelGroup accordion id="accordion-controlled-example" defaultActiveKey={0}>

              {
                this.state.importantEvents.map((r, i) => {

                  let panel;
                  let backgroundColor;

                  if (i % 2 != 0) {
                    backgroundColor = { 'background-color': 'white' };
                  } else {
                    backgroundColor = {};
                  }

                  panel = <div align="center">
                    <Panel eventKey={i} key={i}>
                      <Panel.Heading style={backgroundColor}>
                        <Panel.Title toggle>{r.title}</Panel.Title>
                      </Panel.Heading>
                      <Panel.Body collapsible>
                        <h4>{r.text}</h4>

                        <div>
                          Her kan det kanskje komme map?
                          long {r.longitude}
                          lat {r.latitude}
                        </div>

                        <p>Publisert {r.date} av {r.userMail}</p>
                      </Panel.Body>
                    </Panel></div>;

                  return (
                    <row>
                      {panel}
                    </row>
                  );

                })
              }
            </PanelGroup>
          </Col>

          <Col md={2}></Col>
        </Grid>
      </div>
    )
      ;
  }//end method
}