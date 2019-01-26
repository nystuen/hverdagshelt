import { Component } from 'react-simplified';
import React from 'react';
import css from './PageHeader.css';

export class PageHeader extends Component<{ title: string }> {

  render() {
    return (
      <div className="pageHeader" align="center">
        <h3 >{this.props.title}</h3>
        <hr/>
      </div>
    );
  }
}