//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Alert} from '../../src/widgets.js';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {ChooseCategory} from "../../src/components/ChooseCategory/ChooseCategory";


describe('Test for ChooseCategory component', () => {
    const wrapper = shallow(<ChooseCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});