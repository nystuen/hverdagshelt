// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {NavbarMenu} from "../../src/components/NavbarMenu/NavbarMenu";

describe('Test for NavbarMenu component', () => {
    const wrapper = shallow(<NavbarMenu />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});