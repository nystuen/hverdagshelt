// @flow

import {shallow} from "enzyme/build";
import {PageHeader} from "../../src/components/PageHeader/PageHeader";
import * as React from "react";

describe('Test for PageHeader component', () => {
    const wrapper = shallow(<PageHeader />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});