// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {mineSakerBedrift} from "../../src/views/MinSide/mineSaker/mineSakerBedrift";

describe('Test for mineSakerBedrift view', () => {
    const wrapper = shallow(<mineSakerBedrift />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });


});