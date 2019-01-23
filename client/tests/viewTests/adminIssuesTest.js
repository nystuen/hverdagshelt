// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {adminIssues} from "../../src/views/admin/adminIssues/adminIssues";

describe('Test for adminIssues view', () => {
    const wrapper = shallow(<adminIssues />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});