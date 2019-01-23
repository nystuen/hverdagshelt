// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {NotificationSettings} from "../../src/views/NotificationSettings/NotificationSettings";

describe('Test for NotificationSettings view', () => {
    const wrapper = shallow(<NotificationSettings />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});