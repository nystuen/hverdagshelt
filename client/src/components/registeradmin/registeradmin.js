import {Col, Button, Form, FormGroup, Label, Grid} from 'react-bootstrap';
import {CountyService, UserService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import {FormControl, PageHeader} from "react-bootstrap";
import Checkbox from "react-bootstrap/es/Checkbox";
import Select from "react-select";

let countyService = new CountyService();
let userService = new UserService();


export class RegisterAdmin extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            firstName: "",
            lastName: "",
            address: "",
            postNumber: "",
            password: "",
            password2: "",
            typeName: "",
            phone: "",
            points: 0,
            active: 0,
            isLoaded: false,
            choosen: {label: "Bergen", countyId: 1},
            values:[
                {label: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ]
        }

        this.handleChangeCounty = this.handleChangeCounty.bind(this)
    }


    handleChangeCounty(e: Object){
        this.setState({
            choosen: JSON.parse(e.value)
        })
    };

    componentWillMount() {
        var arr = [];
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => {
                    var elem = {
                        name: e.name,
                        countyId: e.countyId
                    };
                    arr = arr.concat(elem)

                });
                this.setState({
                    values: arr
                })
            })


            //this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

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

    /*;*/
    /*;*/

    /*let optionTemplate = this.state.values.map(v => {
        var data = {label: v.name, countyId: v.countyId}
        return(  <Select
            placeholder={"Hjemmekommune"}
            name="colors"
            options={optiontem}
            className="basic-multi-select"
            classNamePrefix="select"
        />)})*/
    render(){
        let optionTemplate = this.state.values.map(v => {
            const data = {label: v.name, value: v.countyId, countyId: v.countyId};
            return(data)
        });
        return(
            <Grid>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <FormGroup>
                                <FormGroup>
                                    <Col md={3}></Col>
                                    <Col md={6}>
                                        <PageHeader>
                                            Registrer admin
                                        </PageHeader>
                                    </Col>
                                    <Col md={3}></Col>
                                </FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                                     onChange={this.handleStringChange("firstName")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                                     onChange={this.handleStringChange("lastName")}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleStringChange("phone")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                                     onChange={this.handleStringChange("mail")}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.address} placeholder="Addresse"
                                                     onChange={this.handleStringChange("address")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="number" value={this.state.postNumber} placeholder="Postnummer"
                                                     onChange={this.handleNumberChange("postNumber")}/>
                                    </FormGroup>
                                </Col>
                        </FormGroup>
                            <FormGroup>
                                <Col md={4}>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Søk hjemmekommune"}
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.handleChangeCounty}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}/>
                                <Col md ={4}>
                                    <Button type="button" onClick={this.checkMail}>Registrer</Button>
                                </Col>
                                <Col md={4}>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Grid>
        );
    }
    checkMail = () =>{
        var validator = require("email-validator");

        if(!(validator.validate(this.state.mail))){
            Alert.warning("Eposten eksisterer ikke")
        }else{
            this.register();
        }
    };


    register = () => {
        console.log("test", this.state);

        const newAdmin = {
            mail: this.state.mail,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            typeName: 'Admin',
            address: this.state.address,
            postNumber: this.state.postNumber,
            phone: this.state.phone,
            countyId: this.state.choosen,
        };

        console.log("county", this.state.choosen);
        userService
            .addAdmin(newAdmin)
            .then(user => (this.state = user)).then(Alert.success('Bruker registrert'))
            .catch((error: Error) => Alert.danger(error.message));

        let theBody: Object = {
            countyId: newAdmin.countyId,
            userMail: newAdmin.mail
        };

        countyService.addSubscription(theBody);

    };
}
/*
* <DropdownButton title="Hjemmekommune">
                                     value={this.state.countyName}
                                              onChange={(e)=>this.handleChangeCounty(e)}>
                                        {this.state.countyName.map((r, i) => {
                                            return <option key={i} value={r}>{r}
                                            </option>
                                        })
                                        }

                                </DropdownButton>

    checkPass(){
        console.log(state);
        if(this.state.password==this.state.password2){
            this.register();
            Alert.success();
        }else{
            Alert.warning();
        }
    }

                                    <FormGroup>
                                        <Label>Velg arbeidsområder</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Checkbox inline>Vann og avløp</Checkbox><Checkbox>Veiarbeid</Checkbox><Checkbox>Strømbrudd</Checkbox>
                                    </FormGroup>

                                                                        <FormGroup>
                                        <Label>Velg kommuner du vil følge</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Checkbox inline>Oslo</Checkbox><Checkbox>Trondheim</Checkbox><Checkbox>Bergen</Checkbox>
                                    </FormGroup>

*/