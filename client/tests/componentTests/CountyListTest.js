// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {CountyList} from "../../src/components/CountyList/CountyList";

describe('Test for CountyList component', () => {
    const wrapper = shallow(<CountyList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});