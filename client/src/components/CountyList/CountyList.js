import {Col, Button, Form, FormGroup, Label, Grid} from 'react-bootstrap';
import {CountyService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
//import {County} from "../../classTypes";
import Select from "react-select";
import Row from "react-bootstrap/es/Row";

let countyService = new CountyService();


export class CountyList extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      choosen: {label: "Bergen", countyId: 1},
      values: [
        {label: "Bergen", countyId: 1}
      ]
    };

    this.handleChangeCounty = this.handleChangeCounty.bind(this)
  }


  handleChangeCounty(e: Object) {

    this.props.handleOnChangeCounty(JSON.parse(e.value));

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
          arr = arr.concat(elem)

        });
        this.setState({
          values: arr
        })
      })
      .catch((error: Error) => Alert.danger(error.message))

  }

  render() {
    let optionTemplate = this.state.values.map(v => {
      var data = {label: v.name, value: v.countyId, countyId: v.countyId};
      return (data)
    });
    return (
          <Select
            placeholder={'Hjemmekommune'}
            name="colors"
            options={optionTemplate}
            className="basic"
            classNamePrefix="select"
            onChange={this.handleChangeCounty}
          />
    );
  }
}