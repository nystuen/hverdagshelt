import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Container, Card, Col, Row, Button, Form, FormGroup, Label, Input, FormText , Table, Media, CardText} from 'reactstrap';
import {CountyService, UserService, getCounties} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";

let countyService = new CountyService();
let userService = new UserService();

interface State{
    mail: string;
    firstName: string;
    lastName: string;
    postnumber: number;
    password: string;
    password2: string;
    typeName: string;
    phone: string;
    points: number;
    county: County;
    countyName: string;
    active: number;
    isLoaded: boolean;
}
interface Props{
    match: Object,
}

export class RegisterUser extends Component<Props, State>{

    state = {
        mail: "",
        firstName: "",
        lastName: "",
        postnumber: -1,
        password: "",
        password2: "",
        typeName: "",
        phone: -1,
        points: -1,
        county: [],
        countyName: [],
        active: -1,
        isLoaded: false,
    }

    handleStringChange = (name: string) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [name]:event.target.value,
        })
    };

    handleNumberChange = (value: number) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [value]:event.target.value,
        })
    };

    handleChangeCounty = (event: SyntheticEvent<HTMLButtonElement>)=> {
        this.setState({
            // $FlowFixMe
            countyId : event.target.value,
        })
    }


    render(){
        return(
            <Container>
                <Form>
                    <Label>Registrer bruker</Label>
                    <Row>
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.firstName} placeholder="Fornavn"
                                           onChange={this.handleStringChange("firstName")}
                                    />
                                </Col>
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.lastName} placeholder="Etternavn"
                                           onChange={this.handleStringChange("lastName")}
                                    />
                                </Col>
                            </FormGroup>
                                {' '}
                    </Row>
                    <Row>
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.address} placeholder="Addresse"
                                           onChange={this.handleStringChange("address")}
                                    />
                                </Col>
                            </FormGroup>
                        {' '}
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.postnumber} placeholder="Postnummer"
                                           onChange={this.handleNumberChange("postnumber")}
                                    />
                                </Col>
                            </FormGroup>
                        {' '}
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.phone} placeholder="Telefonnummer"
                                onChange={this.handleNumberChange("phone")}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col xs="6">
                                <select className="selectpicker" data-style="btn-inverse" data-live-search="true">
                                    value={this.state.countyName}
                                    onChange={(e)=>this.handleChangeCounty(e)}>
                                    {this.state.countyName.map((r, i) => {
                                        return <option key={i} value={r}>{r}
                                        </option>
                                    })
                                    }
                                </select>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col sm="12">
                                <Input type="text" value={this.state.email} placeholder="Epost"
                                onChange={this.handleStringChange("email")}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.password} placeholder="Passord"
                                       onChange={this.handleStringChange("password")}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.password2} placeholder="Gjenta passord"
                                       onChange={this.handleStringChange("password2")}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                    </Row>
                    <Button type="button" onClick={this.checkPass}>Registrer</Button>
                </Form>
            </Container>
        );
    }
    checkPass(){
        if(this.state.password===this.state.password2){
            this.register();
            Alert.success();
        }else{
            //Alert.warning();
        }
    }

    componentDidMount() {
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => this.state.county.push(e.id, e.name));
                console.log(county2);
            this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

    }


    register = () => {
        console.log("test", this.state.phone)
        userService
            .addUser(this.user)
            .then(user =>(this.user = user))
            .catch((error: Error)=>Alert.danger(error.message))
    }
}
/**/