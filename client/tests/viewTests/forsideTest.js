// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {forside} from "../../src/views/forside/forside";

describe('Test for forside view', () => {
    const wrapper = shallow(<forside />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});