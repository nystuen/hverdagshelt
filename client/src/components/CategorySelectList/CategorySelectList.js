import { Col, Button, Form, FormGroup, Label, Grid } from 'react-bootstrap';
import { Component } from 'react';
import * as React from 'react';
import { Alert } from '../../widgets';
import ReactDOM from 'react-dom';
import { CategoryService } from '../../services';
import Select from 'react-select';
import Row from 'react-bootstrap/es/Row';

let categoryService = new CategoryService();


export class CategorySelectList extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      chosenCategory: {},
      values: [{}]
    };

    this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
  }


  handleOnChangeCategory(e: Object) {
    this.props.handleOnChangeCategory(e.label, e.value);

  };

  componentWillMount() {
    var arr = [];
    categoryService
      .getCategory1()
      .then(cat => {
        cat.map(e => {
          var elem = {
            name: e.name,
            categoryId: e.categoryId,
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
      var data = {label: v.name, value: v.categoryId};
      return (data);
    });
    return (
      <Select
        placeholder={'Kategorier'}
        name="colors"
        options={optionTemplate}
        className="basic"
        classNamePrefix="select"
        onChange={this.handleOnChangeCategory.bind(this)}
      />
    );
  }
}