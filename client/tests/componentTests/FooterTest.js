// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {Footer} from "../../src/components/Footer/Footer";

describe('Test for Footer component', () => {
    const wrapper = shallow(<Footer />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});