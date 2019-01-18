import {CountyService, UserService, addSubscription, CategoryService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {Category, County} from "../../classTypes";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Button from "react-bootstrap/es/Button";
import FormGroup from "react-bootstrap/es/FormGroup";
import {Form, FormControl, Label, PageHeader} from 'react-bootstrap';
import ControlLabel from "react-bootstrap/es/ControlLabel";
import Grid from "react-bootstrap/es/Grid";
import Checkbox from "react-bootstrap/es/Checkbox";
import Select from "react-select";


let categoryService = new CategoryService();
let countyService = new CountyService();
let userService = new UserService();


export class RegisterCompany extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            category: [],
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
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ],
            description: "",
            orgNumber: "",
            countySubscription:[],
            categorySubscription:[]


        };

        this.handleChangeCounty = this.handleChangeCounty.bind(this);
        this.onChangeCountySubscription = this.onChangeCountySubscription.bind(this);
        this.onChangeCategorySubscription = this.onChangeCategorySubscription.bind(this);
    }


    handleChangeCounty(e: Object){
        this.setState({
            choosen: JSON.parse(e.value)
        })
    };


    componentWillMount() {
        var arr = [];
        let kat1 = [];
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
            .catch((error: Error)=>Alert.danger(error.message));

        categoryService.getCategory1().then(resources => {
            resources.map(r => {
                let elem: Category = {
                    name: r.name,
                    categoryId: r.categoryId,
                    priority: r.priority,
                    active: r.active,
                    open: false
                };
                kat1 = kat1.concat(elem);
            });

            this.setState({
                category: kat1
            });
        });

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


    onChangeCountySubscription(value){
        this.setState({
            countySubscription: value
        });
    };

    onChangeCategorySubscription(value){
        this.setState({
            categorySubscription: value
        });
    };

    render(){
        let optionTemplate = this.state.values.map(v => {
            const data = {label: v.name, value: v.countyId};
            return(data)
        });
        let optionTemplateCategory = this.state.category.map(s => {
            const data2 = {label: s.name, value: s.categoryId};
            return(data2)
        });

        return(
            <Grid>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form horizontal>

                        <FormGroup controlId="formHorizontalEmail">
                            <FormGroup>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <PageHeader>
                                        Registrer bedrift
                                    </PageHeader>
                                </Col>
                                <Col md={3}></Col>
                            </FormGroup>
                            <FormGroup>
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
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.address} placeholder="Addresse"
                                                     onChange={this.handleStringChange("address")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.postNumber} placeholder="Postnummer"
                                                     onChange={this.handleNumberChange("postNumber")}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.companyName} placeholder="Bedriftens navn"
                                                     onChange={this.handleStringChange("companyName")}
                                        />
                                    </FormGroup>
                                </Col>
                                {'  '}
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleStringChange("phone")}
                                        />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                                     onChange={this.handleStringChange("mail")}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.orgNumber} placeholder="Organisasjonsnummer"
                                                     onChange={this.handleStringChange("orgNumber")}/>
                                    </FormGroup>
                                </Col>

                                <Col md={12}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.description} placeholder="Beskrivelse"
                                                     onChange={this.handleStringChange("description")}/>

                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="password" value={this.state.password} placeholder="Passord"
                                                     onChange={this.handleStringChange("password")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="password" value={this.state.password2} placeholder="Gjenta passord"
                                                     onChange={this.handleStringChange("password2")}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>
                                            Hjemmekommune
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Hjemmekommune"}
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.handleChangeCounty}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>

                                        <Label>Velg andre kommuner</Label>
                                    </FormGroup>
                                    <FormGroup>

                                        <Select
                                            placeholder={"Kommuner å følge"}
                                            isMulti
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"


                                            onChange={this.onChangeCountySubscription}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Velg arbeidsområder</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Kategorier"}
                                            isMulti
                                            name="colors"
                                            options={optionTemplateCategory}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.onChangeCategorySubscription}
                                        />
                                    </FormGroup>
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
            this.checkPass();
        }
    };

    checkPass = () => {

        if (this.state.password !== this.state.password2) {
            console.log("To ulike passord");
            Alert.warning("Du skrev to ulike passord");

        }
        else {
            let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if(this.state.password.match(decimal))
            {
                this.register();
            }
            else
            {
                Alert.warning('Password has to be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
            }
        }
    };




    register = async () => {
        let theBody3: Object={
            companyMail : this.state.mail,
            companyName : this.state.companyName,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            adresse: this.state.address,
            postnr: this.state.postNumber,
            password:this.state.password,
            phone: this.state.phone,
            description:this.state.description,
            orgNumber:this.state.orgNumber,
        };

        await userService.addCompany(theBody3);


        await this.state.countySubscription.map((e) => {
            let theBody : Object={
                companyMail : this.state.mail,
                countyId : e.value,
            };
            countyService.addCompanyCounties(theBody);
        });

        await this.state.categorySubscription.map((e) => {
            let theBody2 : Object={
                companyMail : this.state.mail,
                categoryId : e.value,
            };
            categoryService.addCompanyCategories(theBody2);
        });
    };
}

