import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { Layout } from "../widgets";

import {
  Card,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table,
  Media,
  CardText
} from "reactstrap";

export class RegisterIssue extends Component {
  userMail = "";
  latitude = "";
  longitude = "";
  text = "";
  picture = "";
  date = "";
  statusName = "";
  categoryId = "";
  countyId = "";

  render() {
    return (
      <div style={{ margin: "100px", left: "150px" }}>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  value={this.userMail}
                  placeholder="UserMail"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.userMail = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.latitude}
                  placeholder="Latitude"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.latitude = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.longitude}
                  placeholder="longitude"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.longitude = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.text}
                  placeholder="Text"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.text = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.picture}
                  placeholder="Picture"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.picture = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.date}
                  placeholder="Date"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.date = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.statusName}
                  placeholder="StatusName"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.statusName = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.categoryId}
                  placeholder="Category ID"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.categoryId = event.target.value;
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={this.countyId}
                  placeholder="County ID"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.countyId = event.target.value;
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <button type="button" class="btn btn-primary" onClick={this.save}>
          Registrer
        </button>
      </div>
    );
  }

  save() {
    console.log(this.userMail);
    fetch("http://localhost:3000/add_issue", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        userMail: this.userMail,
        latitude: this.latitude,
        longitude: this.longitude,
        text: this.text,
        pic: this.picture,
        date: this.date,
        statusName: this.statusName,
        categoryId: this.categoryId,
        countyId: this.countyId
      })
    });
  }
}
