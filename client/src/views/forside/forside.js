import {Category, Event} from "../../classTypes";
import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup,ListGroupItem, Table, Image, Panel, Button, ButtonGroup } from "react-bootstrap"
import {getAllCounties, getImportantEvents} from "../../services"
import css from './forside.css';
// get viktige hendelser
export class forside extends Component{

    state={
      countyId : -1,
      importantEvents:[],
    };

    getInformation = async () => {
        let id: number = this.props.match.params.countyId;
        let eventer = [];
            getImportantEvents(id).then(resources => {

                resources.map(r => {
                    let elem: Event = {
                        eventId: r.eventId,
                        title: r.title,
                        text: r.text,
                        longitude: r.longitude,
                        latitude: r.latitude,
                        date: r.date,
                        userMail: r.userMail,
                        countyId: r.countyId,
                        active: r.active
                    };
                    eventer = eventer.concat(elem);
                });

                this.setState({
                    importantEvents: eventer
                });
                console.log(this.state.importantEvents[0].title);
            });


    };


    componentDidMount() {
        this.getInformation();
    };

    render(){
        return(
          <div className="frontpage">
            <Grid >
                <Col md={4} ></Col>
                <Col xs={12} md={4} align={"center"} >

                    <ButtonGroup vertical block>
                        <Row className="show-grid">
                            <Button href={"/#wizardForm"} bsSize="large" block >Meld om feil</Button>
                        </Row>
                        <Row className="show-grid">
                            <Button href={"#"} bsSize="large" block>Kart</Button>
                        </Row>
                        <Row>
                            <Button href={"#"} bsSize="large" block>Statistikk</Button>
                        </Row>
                    </ButtonGroup>
                </Col>
                <Col md={4}>
                <h4 align="center">Viktige hendelser</h4>

                    <ListGroup>
                        {
                            this.state.importantEvents.map((r, i)=>{
                               return <ListGroupItem href={"#"} className="text-center" key={i}>{r.title}</ListGroupItem>
                            })
                        }
                    </ListGroup>

                </Col>

            </Grid>

          </div>

        );
    }
}