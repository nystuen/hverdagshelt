// @flow

import {shallow} from "enzyme/build";
import {RegisterCompany} from "../../src/components/registercompany/registercompany";
import * as React from "react";

describe('Test for RegisterCompany component', () => {
    const wrapper = shallow(<RegisterCompany />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});