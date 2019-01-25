// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import sinon from "sinon";

import {RegisterUser} from "../src/components/registeruser/registeruser";
import {CategorySelectList} from "../src/components/CategorySelectList/CategorySelectList";
import {ChangePassword} from "../src/components/ChangePassword/ChangePassword";
import {ChooseCategory} from "../src/components/ChooseCategory/ChooseCategory";
import {ChooseEventCategory} from "../src/components/ChooseEventCategory/ChooseEventCategory";
import {CountyList} from "../src/components/CountyList/CountyList";
import {Footer} from "../src/components/Footer/Footer";
import {MyIssuesNotificationSettingsForm} from "../src/components/MyIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";
import {NavbarMenu} from "../src/components/NavbarMenu/NavbarMenu";
import {NotificationSettingsForm} from "../src/components/NotificationSettingsForm/NotificationSettingsForm";
import {NotificationSettingsMyCountiesForm} from "../src/components/NotificationSettingsMyCountiesForm/NotificationSettingsMyCountiesForm";
import {PageHeader} from "../src/components/PageHeader/PageHeader";
import {RegisterCompany} from "../src/components/registercompany/registercompany";
import {RegisterEmployee} from "../src/components/registeremployee/RegisterEmployee";
import {RegNew} from "../src/components/regNew/RegNew";
import {SendTextMailWindow} from "../src/components/Mail/SendMail";
import {Alert} from "../src/widgets";
import {Button} from "react-bootstrap";
import {WizardFormFirstPage} from "../src/components/ReduxRegisterForm/WizardFormFirstPage";
import {WizardFormSecondPage} from "../src/components/ReduxRegisterForm/WizardFormSecondPage";
import {WizardFormThirdPage} from "../src/components/ReduxRegisterForm/WizardFormThirdPage";
import {CountySubscription} from "../src/views/MinSide/countySubscription/countySubscription";
import {ForgottenPassword} from "../src/views/login/forgottenPassword";
import {Frontpage} from "../src/views/frontpage/frontpage";
import {KontoOversikt} from "../src/views/MinSide/KontoOversikt/kontoOversikt";
import {User} from "../src/classTypes";
import {Login} from "../src/views/login/login";
import {MineSaker} from "../src/views/MinSide/mineSaker/mineSaker";
import {NotificationSettings} from "../src/views/NotificationSettings/NotificationSettings";
import {OversiktOverSak} from "../src/views/oversiktOverSak/oversiktOverSak";
import {AdminResetUserPassword} from "../src/views/admin/resetPassword";

describe('Test for RegisterUser component', () => {
    const wrapper = shallow(<RegisterUser />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('sets state on submit', () => {
        wrapper.find("#theButton").simulate('click');
        expect(wrapper.state().errorSomething).toBe(true);
    });
});

describe('Test for employeeHomepage view', () => {
    const wrapper = shallow(<employeeHomepage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for adminAddCategory component', () => {
    const wrapper = shallow(<adminAddCategory />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for CategorySelectList component', () => {
    const wrapper = shallow(<CategorySelectList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for ChangePassword component', () => {
    const wrapper = shallow(<ChangePassword />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for ChooseCategory component', () => {
    const wrapper = shallow(<ChooseCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for ChooseEventCategory component', () => {
    const wrapper = shallow(<ChooseEventCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for CountyList component', () => {
    const wrapper = shallow(<CountyList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for Footer component', () => {
    const wrapper = shallow(<Footer />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for MyIssuesNotificationSettingsForm component', () => {
    const wrapper = shallow(<MyIssuesNotificationSettingsForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for NavbarMenu component', () => {
    const wrapper = shallow(<NavbarMenu />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for NotificationSettingsForm component', () => {
    const wrapper = shallow(<NotificationSettingsForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

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

describe('Test for PageHeader component', () => {
    const wrapper = shallow(<PageHeader />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for RegisterCompany component', () => {
    const wrapper = shallow(<RegisterCompany />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for RegisterEmployee component', () => {
    const wrapper = shallow(<RegisterEmployee />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for RegNew component', () => {
    const wrapper = shallow(<RegNew />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for SendTextMailWindow component', () => {
    const wrapper = shallow(<SendTextMailWindow />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});


describe('Alert tests', () => {
    const wrapper = shallow(<Alert />);

    it('initially', () => {
        let instance: ?Alert = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });

    it('after danger', done => {
        Alert.danger('test');

        setTimeout(() => {
            let instance: ?Alert = Alert.instance();
            expect(typeof instance).toEqual('object');
            if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

            expect(wrapper.find('button.close')).toHaveLength(1);

            done();
        });
    });

    it('after clicking close button', () => {
        wrapper.find('button.close').simulate('click');

        let instance: ?Alert = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });
});

describe('Test for Button component', () => {
    let wrapper, buttonType, buttonSpy, children;
    beforeEach(() => {
        buttonType = 'danger';
        buttonSpy = sinon.spy();
        children = 'clickMe';
        wrapper = shallow(<Button id="button" onClick={() => buttonSpy}>children</Button>);
    });

    it('Testing clicking button', () => {
        wrapper.find('button').simulate('click');
        expect(buttonSpy.called);
    });
});

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

describe('Test for adminIssues view', () => {
    const wrapper = shallow(<adminIssues />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for adminPanel view', () => {
    const wrapper = shallow(<adminPanel />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for CountySubscription view', () => {
    const wrapper = shallow(<CountySubscription />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for editAccountInformation view', () => {
    const wrapper = shallow(<editAccountInformation />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for employeeManageUsers view', () => {
    const wrapper = shallow(<employeeManageUsers />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for ForgottenPassword view', () => {
    const wrapper = shallow(<ForgottenPassword />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for forside view', () => {
    const wrapper = shallow(<forside />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for Frontpage view', () => {
    const wrapper = shallow(<Frontpage />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for interactWithIssue view', () => {
    const wrapper = shallow(<interactWithIssue />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for KontoOversikt view', () => {
    const wrapper = shallow(<KontoOversikt user={new User('a@a.no', 'per', 'hansen', 'Private', '12345678', 2, 1, 1)} changePassword={false}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for Login view', () => {
    const handleChangeEmailSpy = sinon.spy(Login.prototype, "handleChangeEmail");
    const handleChangePasswordSpy = sinon.spy(Login.prototype, "handleChangePassword");
    const saveSpy = sinon.spy(Login.prototype, 'save');
    const mailEvent = {target: {name: "mailText", value: "test"}};
    const passwordEvent = {target: {name: "passText", value: "test"}};

    const wrapper = shallow(<Login />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('responds to mail input change', () => {
        wrapper.find("#mailText").simulate('change', mailEvent);
        expect(handleChangeEmailSpy.calledOnce).toBe(true)
    });

    it('responds to mail input change', () => {
        wrapper.find("#passText").simulate('change', passwordEvent);
        expect(handleChangePasswordSpy.calledOnce).toBe(true)
    });

    it('responds to save button click', () => {
        wrapper.find("#saveButton").simulate('click');
        expect(saveSpy.calledOnce).toBe(true)
    });

    it('updates state.email when handlechangeemail is called', () => {
        wrapper.find("#mailText").simulate('change', mailEvent);
        expect(wrapper.state().email).toBe('test')
    });

    it('updates state.password when handlechangepassword is called', () => {
        wrapper.find("#mailText").simulate('change', passwordEvent);
        expect(wrapper.state().password).toBe('test')
    })
});

describe('Test for mineSakerBedrift view', () => {
    const wrapper = shallow(<mineSakerBedrift />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });


});

describe('Test for MineSaker view', () => {
    const wrapper = shallow(<MineSaker />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for NotificationSettings view', () => {
    const wrapper = shallow(<NotificationSettings />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for OversiktOverSak view', () => {


    const wrapper = shallow(<OversiktOverSak match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for AdminResetUserPassword view', () => {
    const wrapper = shallow(<AdminResetUserPassword />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
