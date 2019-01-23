// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {NotificationSettingsMyCountiesForm} from "../../src/components/NotificationSettingsMyCountiesForm/NotificationSettingsMyCountiesForm";

describe('Test for NotificationSettingsMyCountiesForm component', () => {
    const wrapper = shallow(<NotificationSettingsMyCountiesForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});