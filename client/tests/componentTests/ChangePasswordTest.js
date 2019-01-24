// @flow

import {shallow} from "enzyme/build";
import {ChangePassword} from "../../src/components/ChangePassword/ChangePassword";
import * as React from "react";

describe('Test for ChangePassword component', () => {
    const wrapper = shallow(<ChangePassword />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});