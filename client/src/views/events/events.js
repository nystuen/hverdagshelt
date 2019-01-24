// @flow

import React from 'react';
import { Grid, Panel, PanelGroup, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
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
      <div className="bottomFooter">
        <Grid className="sak">
<PageHeader title={"Hendelser i " + window.sessionStorage.getItem('countyName')}/>
          <Col sm={1} md={2} lg={2}></Col>
          

          <Col md={8}>
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
                    <ListGroupItem align="center" href={'/#/hendelse/' + r.eventId} header={r.title}>Klikk her for å se
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

          <Col  sm={1} md={2} lg={2}></Col>
        </Grid>
      </div>

    )
      ;
  }//end method
}