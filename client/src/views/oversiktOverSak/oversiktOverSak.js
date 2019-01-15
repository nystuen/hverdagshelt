// @flow

import React from 'react';
import {CategoryService, IssueService} from "../../services";
import Grid from "react-bootstrap/es/Grid";
import {Alert} from "../../widgets";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import PageHeader from "react-bootstrap/es/PageHeader";

let issueService = new IssueService();
let categoryService = new CategoryService();


export class OversiktOverSak extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            issue:{},
            category1: {},
            category2: {},
            category3: {},
            categoryLevel: 1, //1 means the issue is not registered under any subcategories
            editCase: false //if the issue is in progress or completed, user cannot edit issue
        };
    }//end constructor


    render(){
        return(
           <Grid>
                <Row>
                    <Col>
                    <PageHeader>Sakoversikt</PageHeader>
                    </Col>
                </Row>
               <Row>
                   <Col>
                   <PageHeader> <small>Beskrivelse</small> </PageHeader>
                   </Col>
                   <Col>
                       {this.state.issue.text}
                   </Col>
               </Row>
               <Row>
                   <Col>
                       <PageHeader> <small>Kategori</small></PageHeader>
                   </Col>
                   <Col>
                       {this.Categories()}
                   </Col>
               </Row>
           </Grid>
        )
    }//end method


    componentWillMount(){
        issueService.getIssueAndCounty(this.props.match.params.issueId).then(response =>{
            this.setState({issue: response[0], categoryLevel: response[0].categoryLevel});
            if(response.statusName === 'Registered')this.setState({editCase: true});
            else this.setState({editCase:false});

            //if the category is not instance of any subcategories
            if(this.state.categoryLevel === 1){
                categoryService.getOneCategory1(this.state.issue.categoryId).then(r => {
                    this.setState({category1: r[0]});
                }).catch((error: Error) => Alert.danger(error.message));


                //if the category is a subcategory, fetch it with it's belonging main category
            }else if(this.state.categoryLevel === 2){
                categoryService.getOneCategory2(this.state.issue.categoryId).then(r => {
                    this.setState({category2: r[0]});
                    categoryService.getOneCategory1(r[0].categoryId).then(r2 => {
                        this.setState({category1: r2[0]});
                    }).catch((error: Error) => Alert.danger(error.message));
                }).catch((error: Error) => Alert.danger(error.message));

            }else{ //if it's a subcategory of a subcategory, fetch all levels.
                categoryService.getOneCategory3(this.state.issue.categoryLevel).then(r => {
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

     Categories(){
        if(this.state.categoryLevel === 1){
            return <p>{this.state.category1.name}</p>
        }else if(this.state.categoryLevel === 2){

        }else{

        }//end condition
    }//end method

    showCategory2(){
        if(this.state.categoryLevel === 3){

        }else{
            return <p>{this.state.category2.name}</p>
        }
    }//end method

}//end class