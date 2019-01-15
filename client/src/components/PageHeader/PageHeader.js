import { Component } from 'react-simplified';
import React from 'react';
import { Card, Col, Row, Button, Form, FormGroup, Label, Input, FormText, Table, Media, CardText } from 'reactstrap';

export class PageHeader extends Component<{ title: string }> {

  render() {
    return (
      <div align="center">
        <h3>{this.props.title}</h3>
        <hr/>
      </div>
    );
  }

}