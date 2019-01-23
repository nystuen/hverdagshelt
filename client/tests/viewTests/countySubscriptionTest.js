// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {CountySubscription} from "../../src/views/MinSide/countySubscription/countySubscription";

describe('Test for CountySubscription view', () => {
    const wrapper = shallow(<CountySubscription />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});