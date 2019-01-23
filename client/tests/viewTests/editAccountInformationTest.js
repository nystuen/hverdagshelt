// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {editAccountInformation} from "../../src/views/MinSide/KontoOversikt/editAccountInformation";

describe('Test for editAccountInformation view', () => {
    const wrapper = shallow(<editAccountInformation />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});