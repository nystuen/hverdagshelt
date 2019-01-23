// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {NotificationSettingsMyCountiesForm} from "../../src/components/NotificationSettingsMyCountiesForm/NotificationSettingsMyCountiesForm";
import sinon from 'sinon';

describe('Test for NotificationSettingsMyCountiesForm component', () => {



    it('renders correctly', () => {
        const wrapper = shallow(<NotificationSettingsMyCountiesForm />);
        expect(wrapper).toMatchSnapshot();

    });

    it('changes state when clicking counties sub button', () => {
        const wrapper = shallow(<NotificationSettingsMyCountiesForm />);
        wrapper.find('#countySubButton').simulate('click');
        expect(wrapper.state().countySubscriptionOpen).toBe(true);

        wrapper.find('#countySubButton').simulate('click');
        expect(wrapper.state().countySubscriptionOpen).toBe(false);
    });

});
