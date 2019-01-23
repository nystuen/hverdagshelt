//@flow
import React, {Component} from "react";
import {CategorySelectList} from "../CategorySelectList/CategorySelectList";
import {
  Grid, Row, Col, ListGroup, Radio, Alert, Checkbox, FormGroup, FormControl,PageHeader,Button, ControlLabel
} from "react-bootstrap"

import {CategoryService} from "../../services";


let categoryService = new CategoryService();

interface State {

  newCategoryName: string,
}

interface Props {
}

//Prioritet 1,2,3

export class adminAddCategory extends Component<Props, State> {


  constructor() {
    super();
    this.state = {
      newCategoryName: {},
      selectedCategoryId: {},
      selectedCategoryType: 1,
      newPriority: {},
      mainCategory: false,
      error: false
    };
  }


  onChangeCategoryHeader = (name1, name2) => {
    this.setState({ selectedCategoryId: name1, selectedCategoryType: name2 });
    console.log(this.state.selectedCategoryId + ' hei' + this.state.selectedCategoryType);

  };

  onClickHovedkategori = () => {
    this.setState({
      mainCategory: !this.state.mainCategory
    });
  };

  handleChange = (statename: string) => (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      // $FlowFixMe
      [statename]: event.target.value
    });
  };

  handlePriority = (pri: number) => {
    this.setState({ newPriority: pri });
  };

  saveCategory = () => {


    if (this.state.mainCategory) {

      if (this.state.newCategoryName == '') {
        this.setState({ error: true });
        return;
      }

      let theBody1: Object = {
        name: this.state.newCategoryName,
        priority: this.state.newPriority
      };

      console.log('body', theBody1);
      categoryService.addCategory1(theBody1).then(res => {
        console.log('added cat1', res);
        this.setState({ error: false });
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    } else {

      if (this.state.newCategoryName == '') {
        this.setState({ error: true });
        return;
      }

      let theBody2: Object = {
        categoryId: this.state.selectedCategoryType,
        name: this.state.newCategoryName
      };
      categoryService.addCategory2(theBody2).then(res => {
        console.log('added cat2', res);
        this.setState({ error: false });
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    }
  };


  onChangeCategory = (label, name) => {

    this.setState({ selectedCategoryId: name, selectedCategoryType: label });
  };


  render() {

    let mainCat;
    if (this.state.mainCategory) {
      mainCat = <div>
        <FormGroup>

          <div><ControlLabel>Prioritet</ControlLabel></div>
          <Radio onClick={() => this.handlePriority(1)} name="radioGroup" inline>
            Meget viktig
          </Radio>{' '}
          <Radio onClick={() => this.handlePriority(2)} name="radioGroup" inline>
            Viktig
          </Radio>{' '}
          <Radio onClick={() => this.handlePriority(3)} name="radioGroup" inline>Lite viktig
          </Radio>
        </FormGroup>
      </div>;

    } else {
      mainCat = <div><ControlLabel>Velg overkategori</ControlLabel>
        <CategorySelectList handleOnChangeCategory={this.onChangeCategory.bind(this)}/></div>;
    }

    let alert;
    if (this.state.error) {
      alert = (
        <Alert bsStyle="danger">
          <h6>Noe gikk galt, er du sikkert på at du har valg alt du skal velge?</h6>
        </Alert>);
    } else {
      <span></span>;
    }


    return (
      <Grid>

        <Col xs={0} md={2}></Col>

        <Col xs={12} md={8}>
          <FormGroup className="text-center">
            <PageHeader>Legg til en kategori</PageHeader>
            <ControlLabel>Kategori navn</ControlLabel>
            <FormControl type="text" placeholder="Skriv inn kategorinavn"
                         onChange={this.handleChange('newCategoryName')}></FormControl>
            <ListGroup>

              <br/>

              <FormGroup>
                <Checkbox inline onClick={() => this.onClickHovedkategori()}>Registrer som hovedkategori</Checkbox>
              </FormGroup>

            </ListGroup>


            {mainCat}

          </FormGroup>

          <div align="center">
            <Button bsStyle="primary" onClick={() => this.saveCategory()}>Lagre kategori</Button>
          </div>
          {alert}
        </Col>

        <Col xs={0} md={2}></Col>
      </Grid>
    );

  }


}