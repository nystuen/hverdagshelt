// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {RegisterUser} from "../../src/components/registeruser/registeruser";

describe('Test for RegisterUser component', () => {
    const wrapper = shallow(<RegisterUser />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});