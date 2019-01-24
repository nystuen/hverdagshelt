// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {OversiktOverSak} from "../../src/views/oversiktOverSak/oversiktOverSak";

describe('Test for OversiktOverSak view', () => {


    const wrapper = shallow(<OversiktOverSak match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});