// @flow

import {shallow} from "enzyme/build";
import {KontoOversikt} from "../../src/views/MinSide/KontoOversikt/kontoOversikt";
import {User} from "../../src/classTypes";
import * as React from "react";

describe('Test for KontoOversikt view', () => {
    const wrapper = shallow(<KontoOversikt user={new User('a@a.no', 'per', 'hansen', 'Private', '12345678', 2, 1, 1)} changePassword={false}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});