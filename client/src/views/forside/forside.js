import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Image,
  Panel,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import { CountyService, EventCategoryService } from '../../services';
import css from './forside.css';
import { Event } from '../../classTypes';
import { CategorySelectList } from '../../components/CategorySelectList/CategorySelectList';
import { InfoModule } from '../../components/InfoModule/InfoModule';

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
  }

  register() {
    return <InfoModule/>;
  }

  login() {
    if (window.localStorage.getItem('userToken') === '') {
      return <div>
        <Button id="homepageButton" bsStyle="primary" href={'/#/registreringsvalg'} onClick={this.register}>Bli en
          hverdagshelt!</Button>
      </div>;
    }
  }

  render() {
    return (
      <div className="forside backgroundImage">
        <Grid align="center" className="forsideText">

          <h1>VELKOMMEN TIL HVERDAGSHELT</h1>

          <p>
            Dette er en felles portal på tvers av alle kommuner i Norge for å melde inn,
            se statistikk og ha oversikt over alle mangler og feil som er i din kommune.
          </p>
          <p>
            {this.login()}
          </p>
        </Grid>


      </div>

    );
  }
}