import {Container, Card, Col, Row, Button, Form, FormGroup, Label, Input, FormText , Table, Media, CardText} from 'reactstrap';
import {CountyService, UserService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';

let countyService = new CountyService();
let userService = new UserService();

export class RegisterUser extends Component{

    user = {};

    render(){
        return(
            <Container>
                <Form>
                    <Label>Registrer bruker</Label>
                    <Row>
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.user.firstName} placeholder="Fornavn"
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                               if(this.user) this.user.firstName = event.target.value;
                                           }}
                                    />
                                </Col>
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.user.lastName} placeholder="Etternavn"
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                               if(this.user) this.user.lastName = event.target.value;
                                           }}
                                    />
                                </Col>
                            </FormGroup>
                                {' '}
                    </Row>
                    <Row>
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.user.address} placeholder="Addresse"
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                               if(this.user) this.user.address = event.target.value;
                                           }}
                                    />
                                </Col>
                            </FormGroup>
                        {' '}
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.user.postNumber} placeholder="Postnummer"
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                               if(this.user) this.user.postNumber = event.target.value;
                                           }}
                                    />
                                </Col>
                            </FormGroup>
                        {' '}
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.user.phone} placeholder="Telefonnummer"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                if(this.user) this.user.phone = event.target.value;
                                }}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Col>

                            </Col>
                        </FormGroup>
                        {' '}

                        <FormGroup>
                            <Col sm="12">
                                <Input type="text" value={this.user.email} placeholder="Epost"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                if(this.user) this.user.email = event.target.value;
                                }}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.user.password} placeholder="Passord"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                           if(this.user) this.user.password = event.target.value;
                                       }}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.user.password2} placeholder="Gjenta passord"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                           if(this.user) this.user.password2 = event.target.value;
                                       }}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                    </Row>
                    <Button type="button" onClick={this.register}>Registrer</Button>
                </Form>
            </Container>
        );
    }

    componentDidMount() {
        countyService
            .getCounties()
            .then(county2 => {
                this.county = county2;
                console.log(county2)})
    }

    register = () => {
        console.log("test", this.user)
        userService
            .addUser(this.user)
            .then(user =>(this.user = user))
            .catch((error: Error)=>Alert.danger(error.message))
    }
}
/*<Input type="select" value={this.user.county} placeholder="Hjemmekommune"
onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
if(this.user) this.user.county = event.target.value;
}}
{this.county.map(county1=>(
<option key=
{county1.county}>{county1.county}</option>
))}/>*/