// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {interactWithIssue} from "../../src/views/admin/adminIssues/interactWithIssue";

describe('Test for interactWithIssue view', () => {
    const wrapper = shallow(<interactWithIssue />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});