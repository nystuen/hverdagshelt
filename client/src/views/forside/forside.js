import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Table, Image, Panel, Button, ButtonGroup } from 'react-bootstrap';
import { CountyService, EventCategoryService } from '../../services';
import css from './forside.css';
import {Event} from '../../classTypes';
import {CategorySelectList} from "../../components/CategorySelectList/CategorySelectList";

let countyService = new CountyService();
let eventCategoryService = new EventCategoryService();

// get viktige hendelser
export class forside extends Component {

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
      console.log(this.state.importantEvents[0].title);
    });
  };


  componentDidMount() {
    this.getInformation();
  };

  render() {
    return (
      <div className="forside">
        <Grid>
          <Col md={4}></Col>

          <Col xs={12} md={4} align={'center'} className="buttonsAtHomepage">
            <Button bsStyle="success" href={'/#wizardForm'} bsSize="large" block>Meld om feil</Button>

            <Button bsStyle="success" href={'#'} bsSize="large" block>Kart</Button>
            <Button bsStyle="success" href={'#'} bsSize="large" block>Statistikk</Button>
          </Col>

          <Col md={4}>
            <div className="importantEvents">
              <h4 align="center">Viktige hendelser</h4>
              <ListGroup>
                {
                  this.state.importantEvents.map((r, i) => {
                    return <ListGroupItem href={'#'} className="text-center" key={i}>{r.title}</ListGroupItem>;
                  })
                }
              </ListGroup>
            </div>
          </Col>

        </Grid>

      </div>

    );
  }
}