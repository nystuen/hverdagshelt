//@flow

import React from 'react';
import { Grid, Col, Row, Button, Table, ProgressBar, Nav, NavItem, OverlayTrigger, Modal, Tooltip, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {IssueService, UserService} from '../../../services';
import { Filter } from '../../../components/Filter/Filter'
import { Status } from '../../../classTypes';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import {history} from "../../../index";

let userService = new UserService();
let issueService = new IssueService();
let filter = new Filter();

const toolTipAssign = (
    <Tooltip id="tooltip">
        Tildel sak til bedrift
    </Tooltip>
);

const toolTipDelete = (
  <Tooltip id="tooltip">
      Slett sak
  </Tooltip>
);

/**
 * @class adminIssues
 */
export class adminIssues extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            issues: [],
            user: {},
            companies: [],
            categories: [],
            selectedCompany: {},
            selectedIssue: {},
            showAssign: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setCompany = this.setCompany.bind(this);
        this.submit = this.submit.bind(this);
    }//end constructor


    componentWillMount(){
        userService.getCurrentUser().then(response => {
            if(response[0].typeName === "Private" || response[0].typeName===undefined){
                history.push('/');
            }
            this.setState({user: response[0]});
            issueService.getAllIssuesInThisCounty(response[0].countyId,1).then(r => {
                this.setState({issues: r});
                this.getSorted();
            }).catch((error: Error) => confirm(error.message));
        }).catch((error: Error) => confirm(error.message));
    }//end method

    buttonBack(){
      this.props.history.goBack();
    }

   render(){
        if(this.state.user.county !== undefined) {
            return (
                <div>
                  <i id="backButton"  onClick={()=> this.buttonBack()} className="fas fa-arrow-circle-left"></i>
                    <Grid>
                        <PageHeader title={'Alle saker i ' + this.state.user.county}/>
                        <div align="center">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton onClick={filter.showAll} bsStyle={"primary"} value={1}>Alle</ToggleButton>
                        <ToggleButton onClick={filter.filterRegistered} bsStyle={"primary"} value={2}>Registrerte</ToggleButton>
                        <ToggleButton onClick={filter.filterInProgress} bsStyle={"primary"} value={3}>Behandles</ToggleButton>
                        <ToggleButton onClick={filter.filterCompleted} bsStyle={"primary"} value={4}>Fullført</ToggleButton>
                        </ToggleButtonGroup>
                        </div>
                        <Table id={"myTable"}>
                            <thead>
                            <tr>
                                <th>
                                    Beskrivelse
                                </th>
                                <th>
                                    Kategori
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.issues.map((e, i) => {
                                return (
                                    <tr key={e.issueId}>
                                        <td style={{'max-width':'10px'}}>
                                            <Nav bsStyle="pills">
                                                <NavItem href={'/#min_side/sakoversikt/' + e.issueId}>
                                                    {e.text}
                                                </NavItem>
                                            </Nav>
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {this.updateStatus(e.statusName)}
                                            <ProgressBar>
                                                <ProgressBar bsStyle={this.status.progressBar}
                                                             active={this.status.inProgress} now={this.status.progress}
                                                             label={this.status.name} style={{color: 'black'}} key={1}/>
                                            </ProgressBar>
                                        </td>
                                        <td>
                                           <Col>
                                               <OverlayTrigger placement="top" overlay={toolTipAssign}>
                                                 <Button bsStyle="link"
                                                         onClick={() => this.handleShow(e.categoryId, e)} type="button">
                                                   <i className="glyphicon glyphicon-briefcase"></i>
                                                 </Button>
                                               </OverlayTrigger>
                                               <OverlayTrigger placement="top" overlay={toolTipDelete}>
                                                 <Button bsStyle="link" style={{color: 'darkred'}}
                                                         onClick={() => this.confirm(e.issueId)}>
                                                   <span className="glyphicon glyphicon-trash"></span>
                                                 </Button>
                                               </OverlayTrigger>
                                           </Col>

                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                        <Modal show={this.state.showAssign} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Tildel oppgave til bedrift</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Grid>
                                    <Row>
                                        <Col md={1} align={"left"}>
                                            {this.dropDownCompanies()}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <br/>
                                        <Col>
                                            <Button bsStyle={"primary"} bsSize={"small"} onClick={() => this.submit()}>Gi oppgave</Button>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Modal.Body>
                        </Modal>
                    </Grid>
                </div>
            )
        }else{
            return <div></div>
        }
    }//end method

    //To set progressbar
    updateStatus(status: string) {
        this.status = new Status(status);
    }//end method

    /**
     * Sorting view so completed issues are listed at the bottom
     *
     * @method getSorted
     * @returns void
     */
    getSorted = () => {
        let sorted: Object = [];
        this.state.issues.map(e => {
            if(e.statusName === 'Registered'){
                sorted.push(e)
            }
        });
        this.state.issues.map(e => {
            if(e.statusName === 'In progress'){
                sorted.push(e)
            }
        });
        this.state.issues.map(e => {
            if(e.statusName === 'Completed'){
                sorted.push(e)
            }
        });
        this.setState({issues: sorted});
    };//end method

    async handleShow(categoryId: number, issue: Object){
      await userService.getCompanyCategories(categoryId, this.state.user.countyId).then(response => {
            this.setState({companies: response, showAssign: true, selectedIssue: issue});
        }).catch((error: Error) => confirm(error.message));
    }//end method

    handleClose = () => {
        this.setState({showAssign: false});
    };//end method

    confirm(issueId: number){
        if(confirm('Vil du slette denne saken?')){
            this.handleDelete(issueId);
        }
    }//end method

    handleDelete(issueId: number){
           issueService.deleteThisIssue(issueId).then(response => {
           }).catch((error: Error) => confirm(error.message));
           window.location.reload();
    }//end method

    setCompany(event: Event){
        this.setState({selectedCompany: event.target.value});
    }//end method

    dropDownCompanies(){
        return(
            <select onChange={this.setCompany} placeholder="select">
                <option value="">Tildel oppgaven til en bedrift </option>
                {this.state.companies.map(e => {
                    return(
                        <option key={e.companyMail} value={e.companyMail}>{e.companyName}</option>
                    )
                })}
            </select>
        )
    }//end method

    submit(){
        if(confirm('Vil du tildele denne saken til bedrift med mail ' + this.state.selectedCompany + '?')) {
            userService.assignIssueToCompany(this.state.selectedIssue.issueId, this.state.selectedCompany).then(response => {
            }).catch((error: Error) => confirm(error.message));
            window.location.reload();
        }
    }//end method


}//end class