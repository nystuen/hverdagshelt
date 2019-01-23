import { Component } from 'react-simplified';
import React from 'react';

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