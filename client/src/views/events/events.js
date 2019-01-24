// @flow

import React from 'react';
import { Grid, Panel, PanelGroup, Col } from 'react-bootstrap';
import { EventCategoryService } from '../../services';
import { Event } from '../../classTypes';
import css from './events.css';
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
      <div className="events bottomFooter">
        <Grid>

          <PageHeader title={'Hendelser i din kommune'}/>
          <Col md={1}></Col>

          <Col md={10}>
            <ListGroup>
              {
                this.state.importantEvents.map((r, i) => {

                  let panel;
                  let backgroundColor;

                  if (i % 2 != 0) {
                    backgroundColor = { 'background-color': 'white' };
                  } else {
                    backgroundColor = {};
                  }

                  panel =
                    <ListGroupItem href={'/#/hendelse/' + r.eventId} header={r.title}>Klikk her for å se
                      mer</ListGroupItem>


                  return (
                    <Col md={6}>
                      {panel}
                    </Col>
                  )

                })
              }
            </ListGroup>
          </Col>

          <Col md={1}></Col>
        </Grid>
      </div>

    )
      ;
  }//end method
}