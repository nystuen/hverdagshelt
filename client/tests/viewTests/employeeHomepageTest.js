// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {employeeHomepage} from "../../src/views/employee/employeeHomepage/employeeHomepage";

describe('Test for employeeHomepage view', () => {
    const wrapper = shallow(<employeeHomepage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});