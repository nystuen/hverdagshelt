// @flow

import {shallow} from "enzyme/build";
import {CategorySelectList} from "../../src/components/CategorySelectList/CategorySelectList";
import * as React from "react";

describe('Test for CategorySelectList component', () => {
    const wrapper = shallow(<CategorySelectList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});