// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {Login} from "../../src/views/login/login";

describe('Test for Login view', () => {
    const wrapper = shallow(<Login />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});