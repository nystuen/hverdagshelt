// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {AdminResetUserPassword} from "../../src/views/admin/resetPassword";

describe('Test for AdminResetUserPassword view', () => {
    const wrapper = shallow(<AdminResetUserPassword />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});