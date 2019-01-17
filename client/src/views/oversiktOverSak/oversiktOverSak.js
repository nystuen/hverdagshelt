// @flow

import React from 'react';
import { CategoryService, IssueService } from '../../services';
import Grid from 'react-bootstrap/es/Grid';
import { Alert } from '../../widgets';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import PageHeader from 'react-bootstrap/es/PageHeader';
import Table from 'react-bootstrap/es/Table';
import { Status } from '../../classTypes';
import ProgressBar from 'react-bootstrap/es/ProgressBar';
import Image from 'react-bootstrap/es/Image';
import css from './oversiktOverSak.css';

let issueService = new IssueService();
let categoryService = new CategoryService();


export class OversiktOverSak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      category1: {},
      category2: {},
      status: {},
      categoryLevel: 1, //1 means the issue is not registered under any subcategories
      editCase: false //if the issue is in progress or completed, user cannot edit issue
    };
  }//end constructor


  render() {
    return (
      <Grid className="sak">

        <Col xs={12} md={4}>

          <h3>Beskrivelse</h3>
          <p>{this.state.issue.text}</p>

          <h3>Status</h3>
          <ProgressBar bsStyle={this.state.status.progressBar} now={this.state.status.progress}
                       label={this.state.issue.statusName}/>

          <h3>Dato sendt inn</h3>
          <p>{this.state.issue.date}</p>

          <h3>Adresse</h3>
          <p>{this.state.issue.address}</p>

          <h3>Kategori</h3>
          <p>{this.CategoriesAdne()}</p>

        </Col>

        <Col xs={12} md={8}>
          {this.showPic()}
        </Col>


        <br/>
      </Grid>
    );
  }//end method


  componentWillMount() {
    issueService.getIssueAndCounty(this.props.match.params.issueId).then(response => {
      this.setState({ issue: response[0], categoryLevel: response[0].categoryLevel });
      if (response.statusName === 'Registered') this.setState({ editCase: true });
      else this.setState({ editCase: false });

      this.setState({ status: new Status(response[0].statusName) });

      //if the category is not instance of any subcategories
      if (this.state.categoryLevel === 1) {
        categoryService.getOneCategory1(this.state.issue.categoryId).then(r => {
          this.setState({ category1: r[0] });
        }).catch((error: Error) => Alert.danger(error.message));


        //if the category is a subcategory, fetch it with it's belonging main category
      } else if (this.state.categoryLevel === 2) {
        categoryService.getOneCategory2(this.state.issue.categoryId).then(r => {
          this.setState({ category2: r[0] });
          categoryService.getOneCategory1(r[0].categoryId).then(r2 => {
            this.setState({ category1: r2[0] });
          }).catch((error: Error) => Alert.danger(error.message));
        }).catch((error: Error) => Alert.danger(error.message));

      } else { //if it's a subcategory of a subcategory, fetch all levels.
        categoryService.getOneCategory3(this.state.issue.categoryId).then(r => {
          this.setState({ category3: r[0] });
          categoryService.getOneCategory2(r[0].category2Id).then(r2 => {
            this.setState({ category2: r2[0] });
            categoryService.getOneCategory1(r2[0].categoryId).then(r3 => {
              this.setState({ category1: r3[0] });
            }).catch((error: Error) => Alert.danger(error.message));
          }).catch((error: Error) => Alert.danger(error.message));
        }).catch((error: Error) => Alert.danger(error.message));
      }//end condition
    }).catch((error: Error) => Alert.danger(error.message));
  }//end method

  CategoriesAdne() {
    if (this.state.categoryLevel === 1) {
      return (<p>{this.state.category1.name}</p>);
    } else if (this.state.categoryLevel === 2) {
      return (<p>{this.state.category1.name} - {this.state.category2.name}</p>);
    } else if (this.state.categoryLevel === 3) {
      return (<p>{this.state.category1.name} - {this.state.category2.name} - {this.state.category3.name}</p>);
    }
  }

  Categories() {
    if (this.state.categoryLevel === 1) {
      return <h3><b>{this.state.issue.categoryId}.0 </b> {this.state.category1.name}</h3>;
    } else {
      return (
        <div>
          {this.showCategory2()}
        </div>

      );
    }//end condition
  }//end method

  showCategory2() {
    if (this.state.categoryLevel === 3) {
      return <div>{this.showCategory3()}</div>;
    } else {
      return (
        <Table striped bordered condensed hover>
          <tbody>
          <tr>
            <th>
              <h3><b>{this.state.issue.categoryId}.0 </b> {this.state.category1.name}</h3>
            </th>
          </tr>
          <tr>
            <th>
              <Col xsOffset={1}>
                <h4><b>{this.state.issue.categoryId}.{this.state.category2.category2Id} </b>
                  {this.state.category2.name}</h4>
              </Col>
            </th>
          </tr>
          </tbody>
        </Table>
      );
    }//end condition
  }//end method

  showCategory3() {
    return (
      <Table striped bordered condensed hover>
        <tbody>
        <tr>
          <th>
            <h3><b>{this.state.issue.categoryId}.0 </b> {this.state.category1.name}</h3>
          </th>
        </tr>
        <tr>
          <th>
            <Col xsOffset={1}>
              <h4><b>{this.state.issue.categoryId}.{this.state.category2.category2Id} </b>
                {this.state.category2.name}</h4>
            </Col>
          </th>
        </tr>
        <tr>
          <th>
            <Col xsOffset={2}>
              <h5><b>
                {this.state.issue.categoryId}.{this.state.category2.category2Id}.{this.state.category3.category3Id}
              </b> {this.state.category3.name}</h5>
            </Col>
          </th>
        </tr>
        </tbody>
      </Table>
    );
  }//end method

  showPic() {
    if (this.state.issue.pic !== null) {
      return <Image className="picture" src={this.state.issue.pic} rounded/>;
    }
  }//end method

}//end class

