// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../../src/widgets.js';
import { shallow, mount } from 'enzyme';
import {Button} from 'react-bootstrap';
import {spy} from 'sinon';

describe('Alert tests', () => {
  const wrapper = shallow(<Alert />);

  it('initially', () => {
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });

  it('after danger', done => {
    Alert.danger('test');

    setTimeout(() => {
      let instance: ?Alert = Alert.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

      expect(wrapper.find('button.close')).toHaveLength(1);

      done();
    });
  });

  it('after clicking close button', () => {
    wrapper.find('button.close').simulate('click');

    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });
});

describe('Test for Button component', () => {
    let wrapper, buttonType, buttonSpy, children;
    beforeEach(() => {
        buttonType = 'danger';
        buttonSpy = spy();
        children = 'clickMe';
        wrapper = shallow(<Button id="button" onClick={() => buttonSpy}>children</Button>);
    });

    it('Testing clicking button', () => {
        wrapper.find('button').simulate('click');
        expect(buttonSpy.called);
    });
});
