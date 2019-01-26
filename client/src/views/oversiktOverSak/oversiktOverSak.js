// @flow

import React from 'react';
import { CategoryService, IssueService, UserService } from '../../services';
import { Alert } from '../../widgets';
import { Status } from '../../classTypes';
import * as jwt from 'jsonwebtoken';
import { ImageService } from '../../services';
import { history } from '../../index';
import css from './oversiktOverSak.css';
import { MailService } from '../../services';
import { FormGroup, Grid, ProgressBar, FormControl, Button, Image, Col, Row } from 'react-bootstrap';
import { User } from '../../classTypes';
import axios from 'axios';
import { NotificationSettingsService } from '../../services';
import { OneIssueMapComponent } from '../../components/map/Map';
import { PageHeader } from '../../components/PageHeader/PageHeader';

let issueService = new IssueService();
let categoryService = new CategoryService();
let userService = new UserService();
let imageService = new ImageService();
let mailService = new MailService();
let notificationSettingsService = new NotificationSettingsService();

interface State {
  user: Object,
  issue: Object[];
  category1: Object[];
  category2: Object[];
  category3: Object[];
  status: Status;
  statusName: string;
  categoryLevel: number;
  editCase: boolean;
  comment: string;
  image: Image;
  addCommentOpen: boolean;
}//end method

class FindDate {
  day;
  month;
  year;

  constructor() {
    var today = new Date();
    this.day = today.getDate();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
  }
}


export class OversiktOverSak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User('', '', '', '', '', -1, -1, -1),
      issue: {},
      image: {},
      category1: {},
      category2: {},
      category3: {},
      latitude: '',
      longitude: '',
      status: {},
      statusName: '',
      comment: '',
      issueComments: [],
      addCommentOpen: false,
      categoryLevel: 1, //1 means the issue is not registered under any subcategories
      editCase: false, //if the issue is in progress or completed, user cannot edit issue
      editStatus: <div className="editStatus">
        <FormControl onChange={this.setStatus} componentClass="select" placeholder="select">
          <option value="">Oppdater status</option>
          <option value="In progress">Behandles</option>
          <option value="Completed"> Fullført</option>
        </FormControl>

        <Button onClick={this.saveThisStatus}> Lagre status</Button>
      </div>
    };
  }//end constructor


  buttonBack() {
    this.props.history.goBack();
  }

  renderCommentArea() {
    if (this.state.addCommentOpen && this.state.user.typeName !== 'Private') {
      return <div align="center">
        <br/>
        <FormGroup>
          <FormControl componentClass="textarea" value={this.state.comment} placeholder="Legg til kommentar til sak"
                       onChange={this.editComment}/>
          <Button onClick={this.addComment} bsStyle={'primary'}> Legg til kommentar</Button>
        </FormGroup>
      </div>;
    }
  }


  renderCommentFeed(length: number) {

    let renderComment;
    if (!this.state.addCommentOpen && this.state.user.typeName !== 'Private') {
      renderComment = <div align="center"><Button bsStyle="primary" onClick={() => {
        this.setState({ addCommentOpen: !this.state.addCommentOpen });
      }} bsSize={'md'}>Legg til kommentar</Button></div>;
    }
    if (length > 0) {
      return <div>
        <hr/>
        <div align="center">
          <h3>Kommentarer</h3>
        </div>
        <br/>
        {this.state.issueComments.map(e => {
          return (

            <div className="comment">
              <Col>
                <h4><b>{e.mail}</b></h4>
                <h4><i>{e.text}</i></h4>
              </Col>
            </div>
          );
        })}
        {renderComment}
      </div>;
    }
  }


  render() {
    let editStatus;
    if (this.state.user.typeName !== 'Private') {
      editStatus = this.state.editStatus;
    }

    console.log(this.state.image)


    return (
      <div className="bottomFooter">
        <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
        <Grid className="sak">


          <Col>

            <PageHeader title={'Saksinformasjon'}/>

            <Col sm={12} md={8} lg={8}>
              <img width={'100%'} src={'image/' + this.state.image}/>
              <Row>
                <Col sm={6} md={6}>
                  <h3>Kategori</h3>
                  <p>{this.Categories()}</p>


                  <h3>Beskrivelse</h3>
                  <p>{this.state.issue.text}</p>

                </Col>
                <Col sm={6} md={6}>


                  <h3>Status</h3>
                  <ProgressBar>
                    <ProgressBar bsStyle={this.state.status.progressBar} active={this.state.status.inProgress}
                                 now={this.state.status.progress}
                                 label={this.state.status.name} style={{ color: 'black' }}/>
                  </ProgressBar>

                  {editStatus}

                  <h3>Dato sendt inn</h3>
                  {this.state.issue.date}

                </Col>

              </Row>
            </Col>

            <Col sm={12} md={4} lg={4}>
              <OneIssueMapComponent markers={[this.state.latitude, this.state.longitude]}/>
              <h3>Adresse</h3>
              <p>{this.state.issue.address}</p>
            </Col>




            <Col>
              {this.renderCommentFeed(this.state.issueComments.length)}
              {this.renderCommentArea()}
            </Col>

          </Col>


        </Grid>
      </div>
    );
  }//end method


  componentWillMount() {

    userService.getCurrentUser()
      .then(resource => {
        let user = resource[0];
        this.setState({
          user: user
        });
      });

    issueService.getIssueAndCounty(this.props.match.params.issueId).then(response => {
      this.setState({
        issue: response[0],
        latitude: response[0].latitude,
        longitude: response[0].longitude,
        categoryLevel: response[0].categoryLevel,
        image: response[0].pic
      });
      issueService.getCompanyComments(response[0].issueId).then(r => {
        this.setState({ issueComments: r });
      }).catch((error: Error) => Alert.danger(error.message));

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


  sendPoints() {
    if (this.state.statusName === 'Completed') {
      let newPoints: number = (this.state.user.points + 10);
      let theBody = {
        userMail: this.state.issue.userMail,
        points: newPoints
      };
      userService.updatePoints(theBody);
    }
  }

  editComment = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ comment: event.target.value });
  };//end method

  addComment = () => {

    if (this.state.comment != '') {
      issueService.addCommentToIssue(this.state.issue.issueId, this.state.comment, this.state.user.mail).then(response => {
      }).catch((error: Error) => Alert.danger(error.message));
      window.location.reload();

      this.setState({ addCommentOpen: !this.state.addCommentOpen });

    }

  };

  setStatus = (event: Event) => {
    this.setState({ statusName: event.target.value });
  };//end method


  saveThisStatus = () => {


    notificationSettingsService.getIssueNotificationSettingsFromUser(this.state.issue.userMail).then(res => {
      issueService.updateStatusOneIssue(this.state.issue.issueId, this.state.statusName, res[0]).then(response => {
        window.location.reload();
      }).catch((error: Error) => Alert.danger(error.message));
    });


    this.sendPoints();

  };//end method
}//end class



