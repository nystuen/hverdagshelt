// @flow

import React from 'react';
import {CategoryService, IssueService, UserService} from "../../services";
import Grid from "react-bootstrap/es/Grid";
import {Alert} from "../../widgets";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import {Status, User} from "../../classTypes";
import ProgressBar from "react-bootstrap/es/ProgressBar";
import Image from "react-bootstrap/es/Image";
import * as jwt from "jsonwebtoken";
import Button from "react-bootstrap/es/Button";
import {history} from "../../index";
import css from './oversiktOverSak.css';

let issueService = new IssueService();
let categoryService = new CategoryService();
let userService = new UserService();

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
}//end method

export class OversiktOverSak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: new User('', '', '', '', '', -1, -1, -1),
            issue: {},
            category1: {},
            category2: {},
            category3: {},
            status: {},
            statusName: '',
            categoryLevel: 1, //1 means the issue is not registered under any subcategories
            editCase: false, //if the issue is in progress or completed, user cannot edit issue
            editStatus: <div>
                <select onChange={this.setStatus}>
                    <option value="">Oppdater status</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed"> Completed</option>
                </select>
                <Button onClick={this.saveThisStatus}> Lagre status</Button>
            </div>
        };
    }//end constructor


    render() {
        let editStatus;
        if (this.state.user.typeName === 'Company') {
            editStatus = this.state.editStatus;
        }
        return (
            <Grid className="sak">
                <Col xs={12} md={4}>

                    <h3>Beskrivelse</h3>
                    <p>{this.state.issue.text}</p>

                    <h3>Status</h3>
                    <ProgressBar>
                        <ProgressBar bsStyle={this.state.status.progressBar} active now={this.state.status.progress}
                                     label={this.state.status.name} style={{color: 'black'}}/>
                    </ProgressBar>

                    <h3>Dato sendt inn</h3>
                    <p>{this.state.issue.date}</p>

                    <h3>Adresse</h3>
                    <p>{this.state.issue.address}</p>

                    <h3>Kategori</h3>
                    <p>{this.Categories()}</p>

                </Col>

                <Col xs={12} md={8}>
                    {this.showPic()}
                </Col>

                <Row>
                    <Col>
                        {editStatus}
                    </Col>
                </Row>
                <br/>
            </Grid>
        )
    }//end method


    componentWillMount() {

        userService.getCurrentUser()
            .then(resource => {
                let user = resource[0];
               this.setState({
                   user: user
               })
            });

        issueService.getIssueAndCounty(this.props.match.params.issueId).then(response => {
            this.setState({issue: response[0], categoryLevel: response[0].categoryLevel});
            if (response.statusName === 'Registered') this.setState({editCase: true});
            else this.setState({editCase: false});

            this.setState({status: new Status(response[0].statusName)});

            //if the category is not instance of any subcategories
            if (this.state.categoryLevel === 1) {
                categoryService.getOneCategory1(this.state.issue.categoryId).then(r => {
                    this.setState({category1: r[0]});
                }).catch((error: Error) => Alert.danger(error.message));


                //if the category is a subcategory, fetch it with it's belonging main category
            } else if (this.state.categoryLevel === 2) {
                categoryService.getOneCategory2(this.state.issue.categoryId).then(r => {
                    this.setState({category2: r[0]});
                    categoryService.getOneCategory1(r[0].categoryId).then(r2 => {
                        this.setState({category1: r2[0]});
                    }).catch((error: Error) => Alert.danger(error.message));
                }).catch((error: Error) => Alert.danger(error.message));

            } else { //if it's a subcategory of a subcategory, fetch all levels.
                categoryService.getOneCategory3(this.state.issue.categoryId).then(r => {
                    this.setState({category3: r[0]});
                    categoryService.getOneCategory2(r[0].category2Id).then(r2 => {
                        this.setState({category2: r2[0]});
                        categoryService.getOneCategory1(r2[0].categoryId).then(r3 => {
                            this.setState({category1: r3[0]});
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
        )
    };//end method

    setStatus = (event: Event) => {
        this.setState({statusName: event.target.value})
    };//end method

    saveThisStatus = () => {
        issueService.updateStatusOneIssue(this.state.issue.issueId, this.state.statusName).then(response => {
        }).catch((error: Error) => Alert.danger(error.message));
        history.push('/min_side/mine_sakerBedrift');
    };//end method
}//end class

