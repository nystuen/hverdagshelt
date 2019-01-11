//@flow
import React, {Component} from "react";
import { Layout } from "../widgets";
import {
Grid, Row, Col, ListGroup,ListGroupItem, Table, Image, Panel
} from "react-bootstrap"
import {MyPage, getAllCounties, getUsersCounties, deleteSubscription,addSubscription} from "../services";


const myPage = new MyPage();
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

interface Props{}


export class countySubscription extends Component<Props,State> {

    state = {
       allCounties: [],
       userCounties: [],
    };



    //fra Alle kommuner til abonerte kommuner
    addCounty = (name, index) =>{

       const userArray =this.state.userCounties;
       const countyArray = this.state.allCounties;

       countyArray.splice(index,1);
       this.setState({allCounties: countyArray});

       userArray.push(name);
       this.setState({userCounties:userArray});

    };

    //fra abonerte kommuner til alle kommuner
    deleteCounty = (name, index) =>{
        let id:string = this.props.match.params.userMail;

        const userArray =this.state.userCounties;
        const countyArray = this.state.allCounties;

        userArray.splice(index,1);
        countyArray.push(name);

        this.setState({userCounties:userArray});
        this.setState({allCounties:countyArray});
    };



    change = () =>{
        let id:string = this.props.match.params.userMail;

        deleteSubscription(id);

        console.log(this.state.userCounties);
        console.log(this.state.allCounties);


        this.state.userCounties.map((e)=>{
            let theBody: Object = {
                countyId : e.countyId,
                userMail : id
            };
            addSubscription(theBody);
        });




    };









    getInformation = async ()=>{
        let id:string = this.props.match.params.userMail;
        console.log('id: '+id);
        await getAllCounties(id).then((r: Array<Object>) => {
            console.log(r);
            this.setState({
               allCounties: r
            });
            console.log(this.state.allCounties);
        });

        await getUsersCounties(id).then((r: Array<Object>)=> {
            console.log(r)
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
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <ListGroup> Kommuner
                            {
                                this.state.allCounties.map((r,i)=>{
                                    return <ListGroupItem onClick={()=>{this.addCounty(r,i)}} key={i}>{r.name}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <div className="container">
                        <Col xs={6} md={4}>
                            <Image src="/" circle />
                        </Col>
                        <Col xs={6} md={4}>
                            <Image src="/" circle />
                        </Col>
                        </div>
                    </Col>
                    <Col xsHidden md={4}>
                        <ListGroup > Mine kommuner
                            {
                                this.state.userCounties.map((r,i)=>{
                                    return <ListGroupItem onClick={() =>{this.deleteCounty(r,i)}} key={i} >{r.name}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <button className="col order-3" onClick={()=> this.change()}>Lagre endringer</button>

            </Grid>

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