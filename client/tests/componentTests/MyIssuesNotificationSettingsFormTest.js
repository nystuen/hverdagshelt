// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {MyIssuesNotificationSettingsForm} from "../../src/components/MyIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";

describe('Test for MyIssuesNotificationSettingsForm component', () => {
    const wrapper = shallow(<MyIssuesNotificationSettingsForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});