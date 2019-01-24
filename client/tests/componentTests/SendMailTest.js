// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {SendTextMailWindow} from "../../src/components/Mail/SendMail";

describe('Test for SendTextMailWindow component', () => {
    const wrapper = shallow(<SendTextMailWindow />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});