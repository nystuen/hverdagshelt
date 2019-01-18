//@flow
import React, { Component } from 'react';
import { Layout } from '../../../widgets';
import { Grid, Row, Col, ListGroup,ListGroupItem, Table, Image, Panel } from "react-bootstrap"
import {getAllCounties, getUsersCounties, deleteSubscription,addSubscription} from "../../../services";
import * as jwt from 'jsonwebtoken';
import Glyphicon from 'react-bootstrap/es/Glyphicon';
import Button from 'react-bootstrap/es/Button';
import css from './countySubscription.css';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import FormControl from "react-bootstrap/es/FormControl";
import Select from "react-select";


//Databasekall
//Få alle kommuner som finnes som er active og som bruker ikke abonerer på
// Få alle kommuner som den personen abonerer på
// On click add to


//Slett kommuner fra bruker
//Legg til kommuner på en bruker

// county(countId, name)

interface State {
  allCounties: Array<Object>,
  userCounties: Array<Object>,
}

interface Props {
}

export class countySubscription extends Component<Props, State> {

  state = {
    decoded: jwt.verify(window.localStorage.getItem('userToken'), 'shhhhhverysecret'),
    allCounties: [],
    userCounties: []
  };

  //fra Alle kommuner til abonerte kommuner
  addCounty = (name, index) => {
    console.log(this.state.decoded.email);

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    countyArray.splice(index, 1);
    this.setState({ allCounties: countyArray });

    userArray.push(name);
    this.setState({ userCounties: userArray });

  };

  //fra abonerte kommuner til alle kommuner
  deleteCounty = (name, index) => {
    let id: string = this.state.decoded.email;

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    userArray.splice(index, 1);
    countyArray.push(name);

    this.setState({ userCounties: userArray });
    this.setState({ allCounties: countyArray });
  };


  change = () => {
    let id: string = this.state.decoded.email;

    deleteSubscription(id);

    this.state.userCounties.map((e) => {
      let theBody: Object = {
        countyId: e.countyId,
        userMail: id
      };
      addSubscription(theBody);
    });

  };


  getInformation = async () => {
    let id: string = this.state.decoded.email;
    await getAllCounties(id).then((r: Array<Object>) => {
      console.log('all counties', r);
      this.setState({
        allCounties: r
      });
    });

    await getUsersCounties(id).then((r: Array<Object>) => {
      console.log('karies email(id),', id);
      console.log('karis counties', r);
      this.setState({
        userCounties: r
      });
    });

  };


  componentDidMount() {
    this.getInformation();
  }

  render() {
    let options = this.state.allCounties.map(r => {
        const data = {label: r.name, value: r.countyId, name: r.name, countyId: r.countyId}
        return (data);
    });

    let options2 = this.state.userCounties.map(r => {
        const data2 = {label: r.name, value: r.countyId, name: r.name, countyId: r.countyId}
        return (data2)
    });

    return (
      <div class="countySubscription">
        <Grid>
        <PageHeader title={"Kommuneinstillinger"}/>

          <Col md={2} >
          </Col>

          <Col md={8}>
          <Row>
            <Col xs={12} md={5}>
                <h5 align="center">Kommuner</h5>
              <Select
                  className={"allCounties"}
                  menuIsOpen
              options={options}
              onChange={this.addCounty}>
              </Select>
            </Col>

            <Col xs={12} md={2} align={"center"} className="arrows">

              <Row>
                <span> <Glyphicon glyph="arrow-left"/></span>
              </Row>
              <Row>
                <span> <Glyphicon glyph="arrow-right"/></span>
              </Row>


            </Col>

            <Col xs={12} md={5}>
                <h5 align="center">Mine Kommuner</h5>
              <div>
                <Select
                    menuIsOpen
                    className={"myCounties"}
                    options={options2}
                    onChange={this.deleteCounty}
                    maxOptions={3}

                >
                </Select>
              </div>
            </Col>
          </Row>

          <Row align={'right'}>
            <Button bsStyle="success" onClick={() => this.change()}>Lagre endringer</Button>
          </Row>
          </Col>

          <Col md={2}>
          </Col>

        </Grid>

      </div>

    );
  }

}


/* {
                                this.state.userCounties.map((r,i)=>{
                                   return <ListGroupItem key={i} >{r.name}</ListGroupItem>
                                })

                                  this.state.allCounties.map((r,i) =>{
                                    return <tr><td key={i}>{r.name}</td></tr>
                                })
                            }*/