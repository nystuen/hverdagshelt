//@flow
import React, { Component } from 'react';
import { Layout } from '../../../widgets';
import { Grid, Row, Col, ListGroup,ListGroupItem, Table, Image, Panel, Glyphicon, Button } from "react-bootstrap"
import {CountyService, UserService, NotificationSettingsService} from "../../../services";
import * as jwt from 'jsonwebtoken';
import css from './countySubscription.css';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { User } from '../../../classTypes';

let countyService = new CountyService();
let userService = new UserService();
let notificationSettingsService = new NotificationSettingsService();
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
  user: User
}

interface Props {
}

export class CountySubscription extends Component<Props, State> {

  state = {
    allCounties: [],
    userCounties: [],
    user: new User('', '', '', '', '', -1, -1, -1)
  };

  //fra Alle kommuner til abonerte kommuner
  addCounty = (name, index) => {

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    countyArray.splice(index, 1);

    userArray.push(name);
    this.setState({
      userCounties: userArray,
      allCounties: countyArray
    });

  };

  //fra abonerte kommuner til alle kommuner
  deleteCounty = (name, index) => {

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    userArray.splice(index, 1);
    countyArray.push(name);

    this.setState({
      allCounties: countyArray,
      userCounties: userArray
    });
  };


  change = () => {

    countyService.deleteSubscription();

    this.state.userCounties.map((e) => {
      let theBody: Object = {
        countyId: e.countyId
      };
      countyService.addSubscription(theBody);
    });
    window.location.reload();

  };


  getInformation = async () => {
    let counties = [];

    await userService.getCurrentUser()
      .then(resources => {
        let user = resources[0];
        this.setState({
          user: user
        });
      });

    await countyService.getAllCounties().then((r: Array<Object>) => {
      r.map(e => {
        if (!(e.countyId === this.state.user.countyId)) {
          counties.push(e);
        }
      });
      this.setState({
        allCounties: counties
      });
    });

    await countyService.getUsersCounties().then((r: Array<Object>) => {
      this.setState({
        userCounties: r
      });
    });

  };

  componentDidMount() {
    this.getInformation();
  }

    render() {
        return (
            <div className="countySubscription">
                <Grid>
                    <PageHeader title={"Kommuneinstillinger"}/>

                    <Col md={2} >
                    </Col>

                    <Col md={8}>
                        <Row>
                            <Col xs={12} md={5}>
                                <h5 align="center">Kommuner</h5>
                                <FormControl
                                    type="text"
                                    id='allCounties'
                                    onKeyUp={this.filterAll}
                                    placeholder="Søk i alle kommuner"
                                />
                                <ListGroup id={"allCountiesList"}>
                                    {
                                        this.state.allCounties.map((r, i) => {
                                            return <li className="list-group-item" onClick={() => {
                                                this.addCounty(r, i);
                                            }} key={i}><a>{r.name}</a></li>;
                                        })
                                    }
                                </ListGroup>
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
                                <FormControl
                                    type="text"
                                    id='myCounties'
                                    onKeyUp={this.filterMine}
                                    placeholder="Søk i dine kommuner"
                                />
                                <ListGroup id="myCountiesList">
                                    {
                                        this.state.userCounties.map((r, i) => {
                                            return <li className="list-group-item" onClick={() => {
                                                this.deleteCounty(r, i);
                                            }} key={i}><a>{r.name}</a></li>;
                                        })
                                    }
                                </ListGroup>
                            </Col>
                        </Row>

            <div align="right">
          <Button bsStyle="primary" onClick={() => this.change()}>Lagre endringer</Button>
            </div>
          </Col>

        </Grid>

      </div>

    );
  }

    filterAll() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('allCounties');
        filter = input.value.toUpperCase();
        ul = document.getElementById("allCountiesList");
        li = ul.getElementsByTagName("li");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }

    filterMine() {
        // Declare variables
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById('myCounties');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myCountiesList");
        li = ul.getElementsByTagName("li");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
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