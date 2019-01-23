// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {employeeManageUsers} from "../../src/views/employee/employeeManageUsers/employeeManageUsers";

describe('Test for employeeManageUsers view', () => {
    const wrapper = shallow(<employeeManageUsers />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});