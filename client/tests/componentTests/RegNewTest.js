// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {RegNew} from "../../src/components/regNew/RegNew";

describe('Test for RegNew component', () => {
    const wrapper = shallow(<RegNew />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});