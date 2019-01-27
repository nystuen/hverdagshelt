// @flow

import React from 'react';
import { Alert } from '../../widgets';
import { Event, Status } from '../../classTypes';
import {Grid, Col} from 'react-bootstrap';
import { EventCategoryService } from '../../services';
import { EventMapComponent, MapComponent } from '../../components/map/Map';
import { PageHeader } from '../../components/pageHeader/PageHeader';

let eventCategoryService = new EventCategoryService();


interface State {
  event: number,
  lat: number,
  long: number
}//end method

export class eventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      lat: 50,
      long: 10
    };
  }//end constructor


  buttonBack() {
    this.props.history.goBack();
  }


  componentDidMount() {
    let id: number = this.props.match.params.eventId;
    let events = [];


    eventCategoryService.getEvent(id).then(event => {
      console.log('eventObject:', event[0])
      console.log('eventLatLong::', event[0].latitude, event[0].longitude);
      this.setState({
        event: event[0],
        lat: event[0].latitude,
        long: event[0].longitude
      });
    });
  };

  render() {

    let position = [this.state.lat, this.state.long];
    console.log('pos:', position);

    return (
      <div className="bottomFooter">
        <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
        <Grid>

          <Col sm={1} md={2} lg={2}> </Col>
          <Col sm={10} md={8} lg={8}>

            <div align="center">
              <h2>{this.state.event.title}</h2>
              <hr/>
            </div>

            <Col xs={12} sm={12} md={9} lg={9}>
              <EventMapComponent markers={[this.state.lat, this.state.long]} eventView={true}/>
            </Col>

            <Col xs={12} sm={12} md={3} lg={3}>

              <h3>Beskrivelse</h3>
              <p>{this.state.event.text}</p>

              <h3>Dato</h3>
              <p>{this.state.event.date}</p>

              <h3>Kontaktperson</h3>
              <p>{this.state.event.userMail}</p>
            </Col>



          </Col>

          <Col sm={1} md={2} lg={2}></Col>


        </Grid>
      </div>
    );
  }//end method


}


