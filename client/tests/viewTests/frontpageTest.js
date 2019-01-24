// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {Frontpage} from "../../src/views/frontpage/frontpage";

describe('Test for Frontpage view', () => {
    const wrapper = shallow(<Frontpage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});