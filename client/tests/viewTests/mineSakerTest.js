// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {MineSaker} from "../../src/views/MinSide/mineSaker/mineSaker";

describe('Test for MineSaker view', () => {
    const wrapper = shallow(<MineSaker />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});