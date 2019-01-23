// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {RegisterEmployee} from "../../src/components/registeremployee/RegisterEmployee";

describe('Test for RegisterEmployee component', () => {
    const wrapper = shallow(<RegisterEmployee />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});