import {CountyService, UserService, CategoryService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {Category, County} from "../../classTypes";
import {Form, FormControl, Label, PageHeader, Col, HelpBlock, Alert, Button, FormGroup, Checkbox, DropdownButton, MenuItem, Row, ControlLabel, Grid } from 'react-bootstrap';
import Select from "react-select";
import {history} from "../../index";


let categoryService = new CategoryService();
let countyService = new CountyService();
let userService = new UserService();


export class RegisterCompany extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            errorSomething: false,
            countyIsChanged: false,
            companyName: "",
            category: [],
            mail: "",
            mail2: "",
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
            openPassword:'password',
            openPassword2:'password',
            isLoaded: false,
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ],
            description: "",
            orgNumber: "",
            orgNumber2: "",
            countySubscription:[],
            categorySubscription:[]


        };

        this.handleChangeCounty = this.handleChangeCounty.bind(this);
        this.onChangeCountySubscription = this.onChangeCountySubscription.bind(this);
        this.onChangeCategorySubscription = this.onChangeCategorySubscription.bind(this);
    }


    handleChangeCounty(e: Object){
        this.setState({
            choosen: JSON.parse(e.value),
            countyIsChanged: true
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
    handleNumberChange = (value: number) => (event: SyntheticEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if(event.target.value === '' ||re.test(event.target.value)){
            this.setState({
                // $FlowFixMe
                [value]: event.target.value
            });
        }
    };


    getValidationStateOrgNumber(){
        const orgNumber = this.state.orgNumber.length;
        let decimal =/^(\d|,)*\d*$/;
        if(orgNumber ===9 && this.state.phone.match(decimal)) {
            return 'success';
        }
        else if(orgNumber===0)return ;
        else{
            return 'warning';
        }
    }
    getValidationStateOrgNumber2(){
        if(this.state.orgNumber2.length===0) return;
        if(this.state.orgNumber2===this.state.orgNumber){
            return 'success'
        }else return 'warning';
    }

    getValidationStateEmail(){
        var validator = require('email-validator');
        const length = this.state.mail.length;
        const bool = validator.validate(this.state.mail);
        if(length==0) return ;
        else if(!(bool)) return 'warning';
        else if(bool) return 'success';
    }

    getValidationStateEmail2(){
        var validator = require('email-validator');
        const length = this.state.mail2.length;
        const bool = validator.validate(this.state.mail2);
        if(length==0)return;
        else if(!(bool)) return 'warning';
        else if(bool && this.state.mail===this.state.mail2) return 'success';
        else return 'warning';
    }


    getValidationStatePassword(){
        const length = this.state.password.length;
        let decimal = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!., æøå/@<>"¤=#$%^&*()]*$/;
        if (this.state.password.match(decimal)) return 'success';
        else if(length==0)return ;
        else return 'warning';
    }

    getValidationStatePassword2(){
        const password2Length = this.state.password2.length;
        if(password2Length==0) return;
        else{
            if(this.state.password !== this.state.password2) return 'warning';
            else return 'success';
        }
    }
    getValidationStateFirstName() {
        const firstNameLength = this.state.firstName.length;
        let decimal=/^[A-Za-z _æøå]*[A-Za-zæøå][A-Za-z _æøå]*$/;

        if(firstNameLength===1){
            return 'warning';
        } else if(firstNameLength===0) return ;
        else if(this.state.firstName.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    getValidationStateLastName() {
        const lastNameLength = this.state.lastName.length;
        let dec=/^[A-Za-z _æøå]*[A-Za-zæøå][A-Za-z _æøå]*$/;

        if(lastNameLength===1){
            return 'warning';
        } else if(lastNameLength===0) return ;
        else if(this.state.lastName.match(dec)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    getValidationPhone(){
        const phoneLength = this.state.phone.length;
        let decimal =/^(\d|,)*\d*$/;
        if(phoneLength ==8 && this.state.phone.match(decimal)) {
            return 'success';
        }
        else if(phoneLength==0)return ;
        else{
            return 'warning';
        }
    }
    getValidationAddress(){
        const addressLength = this.state.address.length;
        let decimal=/^[A-Za-z0-9 _æøå]*[A-Za-z0-9æøå][A-Za-z0-9 _æøå]*$/;

        if(addressLength<4 && addressLength>0){
            return 'warning';
        } else if(addressLength===0) return ;
        else if(this.state.address.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    getValidationPostNumber(){
        const postNumberLength= this.state.postNumber.length;
        let decimal =/^(\d|,)*\d*$/;
        if(postNumberLength ==4 && this.state.postNumber.match(decimal)) {
            return 'success';
        }
        else if(postNumberLength==0)return ;
        else{
            return 'warning';
        }
    }

    getValidationDescription(){
        const descriptionLength = this.state.description.length;
        let decimal=/^[A-Za-z _æøå]*[A-Za-zæøå][A-Za-z _æøå]*$/;

        if(descriptionLength===1){
            return 'warning';
        } else if(descriptionLength===0) return ;
        else if(this.state.description.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }

    getValidationCompanyName(){
        const companyNameLength= this.state.companyName.length;
        let decimal=/^[A-Za-z0-9 _æøå]*[A-Za-z0-9æøå][A-Za-z0-9 _æøå]*$/;

        if(companyNameLength===1){
            return 'warning';
        } else if(companyNameLength===0) return ;
        else if(this.state.companyName.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }



    handleStringChange = (name: string) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [name]:event.target.value,
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


  handleClickPassword1=()=>{
    if(this.state.openPassword == "text"){
      this.setState({openPassword: "password"})
    }else{
      this.setState({openPassword: "text"})
    }
  };

  handleClickPassword2=()=>{
    if(this.state.openPassword2 == "text"){
      this.setState({openPassword2: "password"})
    }else{
      this.setState({openPassword2: "text"})
    }
  };

    render(){

      let changeIcon1;

      if (this.state.openPassword == "text") {
        changeIcon1 = (<i className="fas fa-eye"></i>);
      } else {
        changeIcon1 = (<i className="fas fa-eye-slash"></i>);
      }


      let changeIcon2;

      if (this.state.openPassword2 == "text") {
        changeIcon2 = (<i className="fas fa-eye"></i>);
      } else {
        changeIcon2 = (<i className="fas fa-eye-slash"></i>);
      }

        let optionTemplate = this.state.values.map(v => {
            const data = {label: v.name, value: v.countyId};
            return(data)
        });
        let optionTemplateCategory = this.state.category.map(s => {
            const data2 = {label: s.name, value: s.categoryId};
            return(data2)
        });
        let register_success;
        if (this.state.registerSuccess) {
            register_success = (
                <Alert bsStyle="success">
                    <p>Bruker ble registrert</p>
                </Alert>
            )
        }
        let alert_something;
        if (this.state.errorSomething) {
            alert_something = (
                <Alert bsStyle="danger">
                    <h6>Pass på at alle felt er fylt ut korrekt</h6>
                </Alert>);
        } else {
            alert_something= (
                <p></p>
            );
        }


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
                                    <FormGroup validationState={this.getValidationStateFirstName()}>
                                        <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                                     onChange={this.handleStringChange("firstName")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6} >
                                    <FormGroup validationState={this.getValidationStateLastName()}>
                                        <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                                     onChange={this.handleStringChange("lastName")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationAddress()}>
                                        <FormControl type="text" value={this.state.address} placeholder="Adresse"
                                                     onChange={this.handleStringChange("address")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationPostNumber()}>
                                        <FormControl type="text" value={this.state.postNumber} placeholder="Postnummer"
                                                     onChange={this.handleNumberChange("postNumber")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationCompanyName()}>
                                        <FormControl type="text" value={this.state.companyName} placeholder="Bedriftens navn"
                                                     onChange={this.handleStringChange("companyName")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationPhone()}>
                                        <FormControl type="text" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleNumberChange("phone")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6} >
                                    <FormGroup validationState={this.getValidationStateEmail()}>
                                        <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                                     onChange={this.handleStringChange("mail")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6} >
                                    <FormGroup validationState={this.getValidationStateEmail2()}>
                                        <FormControl type="text" value={this.state.mail2} placeholder="Gjenta epost"
                                                     onChange={this.handleStringChange("mail2")}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateOrgNumber()}>
                                        <FormControl type="text" value={this.state.orgNumber} placeholder="Organisasjonsnummer"
                                                     onChange={this.handleNumberChange("orgNumber")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateOrgNumber2()}>
                                        <FormControl type="text" value={this.state.orgNumber2} placeholder="Gjenta organisasjonsnummer"
                                                     onChange={this.handleNumberChange("orgNumber2")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.description} placeholder="Beskrivelse av bedrift"
                                                     onChange={this.handleStringChange("description")}/>

                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                      <InputGroup>
                                        <InputGroup.Button>
                                          <Button type="button" onClick={()=> this.handleClickPassword1()}>{changeIcon1}</Button>
                                        </InputGroup.Button>
                                        <FormControl type={this.state.openPassword} value={this.state.password} placeholder="Passord"
                                                     onChange={this.handleStringChange("password")}
                                        />
                                        <FormControl.Feedback/>
                                      </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>

                                    <FormGroup validationState={this.getValidationStatePassword2()}>
                                      <InputGroup>
                                        <InputGroup.Button>
                                          <Button type="button" onClick={()=> this.handleClickPassword2()}>{changeIcon2}</Button>
                                        </InputGroup.Button>
                                        <FormControl type={this.state.openPassword2} value={this.state.password2} placeholder="Gjenta passord"
                                                     onChange={this.handleStringChange("password2")}/>
                                        <FormControl.Feedback/>
                                      </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <HelpBlock>Passord må ha en lengde på 8 tegn og inneholde minst et tall, en stor og en liten bokstav</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}>
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
                                <Col md={4}>
                                </Col>
                                <Col md={4}>
                                    {alert_something}
                                    {register_success}
                                </Col>
                                <Col md={4}>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}/>
                                <Col md ={4}>
                                    <Button type="button" onClick={this.checkInput}>Registrer</Button>
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




    checkInput = () =>{
        //console.log(this.getValidationStateFirstName()||this.getValidationStateFirstName()==='warning'||this.getValidationStateLastName()==='warning'||this.getValidationPhone()==='warning'||this.getValidationStateEmail()||this.getValidationStateEmail2()==='warning'||this.getValidationStatePassword()==='warning'||this.getValidationStatePassword2()==='warning');
        if(this.state.countyIsChanged===false||this.getValidationStateFirstName()==='warning'||this.getValidationStateFirstName()==='warning'||this.getValidationStateFirstName()==='warning'||this.getValidationStateLastName()==='warning'||this.getValidationPhone()==='warning'||this.getValidationStateEmail()==='warning'||this.getValidationStateEmail2()==='warning'||this.getValidationStatePassword()==='warning'||this.getValidationStatePassword2()==='warning'||this.getValidationCompanyName()==='warning'||this.getValidationPostNumber()==='warning'){
            this.setState({
                errorSomething:true
            })
        }else{
            this.register();
        }
    };




    register = async () => {
        let theBody3: Object={
            companyMail : this.state.mail,
            companyName : this.state.companyName,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            address: this.state.address,
            postNumber: this.state.postNumber,
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
        this.setState({errorSomething: false, registerSuccess: true});
        this.goToLogin();
    };
    goToLogin = () => {
        setTimeout(
            function () {
                history.push('/login');
            }, 4000
        )
    }
}

