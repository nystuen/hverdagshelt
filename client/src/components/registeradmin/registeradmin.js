import {Col, Button, Form, FormGroup, Label, Grid} from 'react-bootstrap';
import {CountyService, NotificationSettingsService, UserService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";
import {FormControl, PageHeader} from "react-bootstrap";
import Select from "react-select";
import {history} from "../../index";

let countyService = new CountyService();
let userService = new UserService();
let notificationSettingService = new NotificationSettingsService();


export class RegisterAdmin extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            errorSomething: false,
            countyIsChanged: false,
            mail: "",
            mail2:"",
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
            choosen: JSON.parse(e.value),
            countyIsChanged: true
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

    handleNumberChange = (value: number) => (event: SyntheticEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if(event.target.value === '' ||re.test(event.target.value)){
            this.setState({
                // $FlowFixMe
                [value]: event.target.value
            });
        }
    };

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

    getValidationStateFirstName() {
        const firstNameLength = this.state.firstName.length;
        let decimal=/^[A-Za-zÆØÅæøå]*[A-Za-zÆØÅæøå][A-Za-zÆØÅæøå]*$/;

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
        let dec=/^[A-Za-zÆØÅæøå]*[A-Za-zÆØÅæøå][A-Za-z ÆØÅæøå]*$/;

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

    buttonBack(){
        this.props.history.goBack();
    }
    render(){
        let optionTemplate = this.state.values.map(v => {
            const data = {label: v.name, value: v.countyId, countyId: v.countyId};
            return(data)
        });
        let alert_something;
        if (this.state.errorSomething) {
            alert_something = (
                <Alert bsStyle="danger">
                    <h6>Pass på at alle felt er fylt ut korrekt</h6>
                </Alert>);
        } else {
            alert_something = (
                <p></p>
            );
        }
        let register_success;
        if (this.state.registerSuccess) {
            register_success = (
                <Alert bsStyle="success">
                    <p id="SuccessLogin">Bruker ble registrert</p>
                </Alert>
            )
        }
        return(
          <div>
            <i id="backButton"  onClick={()=> this.buttonBack()} className="fas fa-arrow-circle-left"></i>
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
                                    <FormGroup validationState={this.getValidationStateFirstName()}>
                                        <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                                     onChange={this.handleStringChange("firstName")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateLastName()}>
                                        <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                                     onChange={this.handleStringChange("lastName")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={12}>
                                    <FormGroup validationState={this.getValidationAddress()}>
                                        <FormControl type="text" value={this.state.address} placeholder="Addresse"
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
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationPhone()}>
                                        <FormControl type="text" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleNumberChange("phone")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
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
                                        <FormControl.Feedback/>
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
                                <Col md={4}>
                                {alert_something}
                                {register_success}
                                </Col>
                                <Col md={4}/>
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
          </div>
        );
    }
    checkInput = () =>{
        //console.log(this.getValidationStateFirstName()||this.getValidationStateFirstName()==='warning'||this.getValidationStateLastName()==='warning'||this.getValidationPhone()==='warning'||this.getValidationStateEmail()||this.getValidationStateEmail2()==='warning'||this.getValidationStatePassword()==='warning'||this.getValidationStatePassword2()==='warning');
        if(this.state.countyIsChanged===false||this.getValidationStateFirstName()==='warning'||this.getValidationStateLastName()==='warning'||this.getValidationPhone()==='warning'||this.getValidationStateEmail()==='warning'||this.getValidationStateEmail2()==='warning'||this.getValidationPostNumber()==='warning'||this.getValidationAddress()==='warning'){
            this.setState({
                errorSomething:true
            })
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
            mail: newAdmin.mail,
            registered: 1,
            inProgress: 0,
            completed: 1
        };
        notificationSettingService.addIssueNotificationSettings(theBody);
        this.setState({errorSomething: false, registerSuccess: true});
        this.goToRegNew();

    };
    goToRegNew= () => {
        setTimeout(
            function () {
                history.push('admin/registrertSuksess');
            }, 2000
        )
    }
}