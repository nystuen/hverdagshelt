// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {adminPanel} from "../../src/views/admin/adminPanel";

describe('Test for adminPanel view', () => {
    const wrapper = shallow(<adminPanel />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});