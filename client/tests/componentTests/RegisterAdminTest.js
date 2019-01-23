// @flow

import {shallow} from "enzyme/build";
import {RegisterAdmin} from "../../src/components/registeradmin/registeradmin";
import * as React from "react";

describe('Test for RegisterAdmin component', () => {
    const wrapper = shallow(<RegisterAdmin />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});