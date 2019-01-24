// @flow

import React from 'react';
import Grid from 'react-bootstrap/es/Grid';
import { Alert } from '../../widgets';
import Col from 'react-bootstrap/es/Col';
import { Event, Status } from '../../classTypes';
import Image from 'react-bootstrap/es/Image';

import { EventCategoryService } from '../../services';
import { MapComponent } from '../../components/map/Map';

let eventCategoryService = new EventCategoryService();


interface State {
  event: number
}//end method

export class eventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
  }//end constructor


  buttonBack() {
    this.props.history.goBack();
  }


  componentDidMount() {
    let id: number = this.props.match.params.eventId;
    let events = [];

    console.log('id:', id);

    eventCategoryService.getEvent(id).then(event => {
      console.log(event[0]);
      this.setState({
        event: event[0]
      });
    });
  };

  render() {

    return (
      <div className="bottomFooter">
        <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
        <Grid className="sak">

          <Col sm={1} md={2} lg={2}></Col>

          <Col sm={10} md={8} lg={8}>

            <div align="center">
              <h2>{this.state.event.title}</h2>
            </div>

            <Col xs={12} sm={12} md={4} lg={4}>

              <h3>Beskrivelse</h3>
              <p>{this.state.event.text}</p>

              <h3>Publisert</h3>
              <p>{this.state.event.date}</p>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
            </Col>


          </Col>

          <Col sm={1} md={2} lg={2}></Col>


        </Grid>
      </div>
    );
  }//end method


}


