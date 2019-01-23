// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {NotificationSettingsForm} from "../../src/components/NotificationSettingsForm/NotificationSettingsForm";

describe('Test for NotificationSettingsForm component', () => {
    const wrapper = shallow(<NotificationSettingsForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});