// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {ForgottenPassword} from "../../src/views/login/forgottenPassword";

describe('Test for ForgottenPassword view', () => {
    const wrapper = shallow(<ForgottenPassword />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});