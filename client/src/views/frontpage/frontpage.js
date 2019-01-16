import { Col, Button, Form, FormGroup, Label, Grid } from 'react-bootstrap';
import { CountyService } from '../../services';
import { Component } from 'react';
import * as React from 'react';
import { Alert } from '../../widgets';
import ReactDOM from 'react-dom';
//import {County} from "../../classTypes";
import css from './frontpage.css';

import Select from 'react-select';
import Row from 'react-bootstrap/es/Row';

let countyService = new CountyService();
let imageUrl = '../../../public/resources/osloBackground.png';


export class Frontpage extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      choosen: { label: 'Bergen', countyId: 1 },
      values: [
        { label: 'Bergen', countyId: 1 }
      ]
    };

    this.handleChangeCounty = this.handleChangeCounty.bind(this);
  }


  handleChangeCounty(e: Object) {
    console.log(e.value);
    this.setState({
      choosen: JSON.parse(e.value)
    });


  };

  componentWillMount() {
    var arr = [];
    countyService
      .getCounties()
      .then(county2 => {
        county2.map(e => {
          var elem = {
            name: e.name,
            countyId: e.countyId
          };
          arr = arr.concat(elem);

        });
        this.setState({
          values: arr
        });
      })
      .catch((error: Error) => Alert.danger(error.message));

  }

  render() {
    let optionTemplate = this.state.values.map(v => {
      var data = { label: v.name, value: v.countyId, countyId: v.countyId };
      return (data);
    });
    return (
      <div className="frontpage">
        <Grid>
          <FormGroup>
            <Select
              placeholder={'Klikk her for å velge kommune'}
              options={optionTemplate}
              className="frontpage-county"
              onChange={this.handleChangeCounty}
            />
          </FormGroup>
          <Button className={'frontpage-button'} href={'/#home/' + this.state.choosen}>Gå videre!</Button>
        </Grid>
      </div>
    );
  }

}
