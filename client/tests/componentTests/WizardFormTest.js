// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import {WizardFormFirstPage} from "../../src/components/ReduxRegisterForm/WizardFormFirstPage";
import {WizardFormSecondPage} from "../../src/components/ReduxRegisterForm/WizardFormSecondPage";
import {WizardFormThirdPage} from "../../src/components/ReduxRegisterForm/WizardFormThirdPage";
import sinon from 'sinon';

describe('Test for WizardFormFirstPage view', () => {
    const wrapper = shallow(<WizardFormFirstPage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for WizardFormSecondPage view', () => {
    const wrapper = shallow(<WizardFormSecondPage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for WizardFormThirdPage view', () => {
    const wrapper = shallow(<WizardFormThirdPage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});