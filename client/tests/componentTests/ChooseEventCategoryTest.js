//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Alert} from '../../src/widgets.js';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {ChooseEventCategory} from "../../src/components/ChooseEventCategory/ChooseEventCategory";


describe('Test for ChooseEventCategory component', () => {
    const wrapper = shallow(<ChooseEventCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});