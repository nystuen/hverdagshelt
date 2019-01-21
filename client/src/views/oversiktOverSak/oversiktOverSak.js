// @flow

import React from 'react';
import { CategoryService, IssueService } from '../../services';
import Grid from 'react-bootstrap/es/Grid';
import { Alert } from '../../widgets';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import { Status } from '../../classTypes';
import ProgressBar from 'react-bootstrap/es/ProgressBar';
import Image from 'react-bootstrap/es/Image';
import * as jwt from 'jsonwebtoken';
import Button from 'react-bootstrap/es/Button';
import { ImageService } from '../../services';
import { history } from '../../index';
import css from './oversiktOverSak.css';
import FormControl from 'react-bootstrap/es/FormControl';
import {MailService} from '../../services';

let issueService = new IssueService();
let categoryService = new CategoryService();
let imageService = new ImageService();
let mailService = new MailService();

interface State {
  issue: Object[];
  category1: Object[];
  category2: Object[];
  category3: Object[];
  status: Status;
  statusName: string;
  categoryLevel: number;
  editCase: boolean;
  image: Image;
}//end method

export class OversiktOverSak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      issue: {},
      category1: {},
      category2: {},
      category3: {},
      status: {},
      statusName: '',
      categoryLevel: 1, //1 means the issue is not registered under any subcategories
      editCase: false, //if the issue is in progress or completed, user cannot edit issue
      editStatus:
        <div>
          <FormControl onChange={this.setStatus} componentClass="select" placeholder="select">
            <option value="">Oppdater status</option>
            <option value="In progress">Behandling</option>
            <option value="Completed">Fullført</option>
          </FormControl>
          <Button onClick={this.saveThisStatus} block> Lagre status</Button>
        </div>
    };
  }//end constructor


  render() {
    let editStatus;
    let decoded = jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret');
    if (decoded.typeId === 'Company' || decoded.typeId === 'Admin' || decoded.typeId === 'Employee') {
      editStatus = this.state.editStatus;
    }


    return (
      <Grid className="sak">

        <Col sm={1} md={2} lg={2}></Col>

        <Col sm={10} md={8} lg={8}>
          <img width={'100%'} src={'image/' + this.state.image}/>

          <Col sm={6} md={6}>
            <h3>Kategori</h3>
            <p>{this.Categories()}</p>

            <h3>Adresse</h3>
            <p>{this.state.issue.address}</p>

            <h3>Beskrivelse</h3>
            <p>{this.state.issue.text}</p>


          </Col>
          <Col sm={6} md={6}>

            <h3>Status</h3>
            <ProgressBar>
              <ProgressBar bsStyle={this.state.status.progressBar} active now={this.state.status.progress}
                           label={this.state.status.name} style={{ color: 'black' }}/>
            </ProgressBar>

            {editStatus}

            <h3>Dato sendt inn</h3>
            <p>{this.state.issue.date}</p>

          </Col>
        </Col>

        <Col sm={1} md={2} lg={2}></Col>

      </Grid>
    );
  }//end method


  componentWillMount() {
    issueService.getIssueAndCounty(this.props.match.params.issueId).then(response => {
      this.setState({ issue: response[0], categoryLevel: response[0].categoryLevel, image: response[0].pic });
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

  Categories() {
    if (this.state.categoryLevel === 1) {
      return (<p>{this.state.category1.name}</p>);
    } else if (this.state.categoryLevel === 2) {
      return (<p>{this.state.category1.name} - {this.state.category2.name}</p>);
    }//end condition
  }//end method


  showPic() {
    if (this.state.issue.pic !== null) {
      return <Image className="picture" src={this.state.issue.pic} rounded/>;
    }
  }//end method

  editStatus() {
    return (
      <div>
        <select>
          <option value="" onChange={this.setStatus('')}>Oppdater status</option>
          <option value="In progress" onChange={this.setStatus('In progress')}>In progress</option>
          <option value="Completed" onChange={this.setStatus('Completed')}> Completed</option>
        </select>
        <Button onClick={this.saveThisStatus}> Lagre status</Button>
      </div>
    );
  };//end method

  setStatus = (event: Event) => {
    this.setState({ statusName: event.target.value });
  };//end method

  saveThisStatus = () => {


    issueService.updateStatusOneIssue(this.state.issue.issueId, this.state.statusName,this.props.match.params.email ).then(response => {


    }).catch((error: Error) => Alert.danger(error.message));


    this.props.history.goBack();
  };//end method
}//end class

