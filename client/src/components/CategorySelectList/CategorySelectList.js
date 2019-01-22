import { Component } from 'react';
import { CategoryService } from '../../services';
import * as React from 'react';
import { Alert } from '../../widgets';
import Select from 'react-select';

let categoryService = new CategoryService();


export class CategorySelectList extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      choosen: {},
      values: [
        {}
      ]
    };

    this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
  }


  handleOnChangeCategory(e: Object) {
    this.props.handleOnChangeCategory(e.value, e.label);

  };

  componentWillMount() {
    var arr = [];
    categoryService
      .getCategory1()
      .then(cat1 => {
        cat1.map(e => {
          var elem = {
            name: e.name,
            categoryId: e.categoryId
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
      var data = { label: v.name, value: v.categoryId };
      return (data);
    });
    return (
      <Select
        placeholder={'Kategorier'}
        name="colors"
        options={optionTemplate}
        className="basic"
        classNamePrefix="select"
        onChange={this.handleOnChangeCategory}
      />
    );
  }
}