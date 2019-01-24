//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Alert} from '../../src/widgets.js';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {adminAddCategory} from "../../src/components/AdminAddCategory/adminAddCategory";


describe('Test for adminAddCategory component', () => {
    const wrapper = shallow(<adminAddCategory />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});