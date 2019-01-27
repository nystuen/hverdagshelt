// @flow

import {shallow} from "enzyme/build";
import * as React from "react";
import sinon from "sinon";

import {RegisterUser} from "../src/components/registeruser/registeruser";
import {CategorySelectList} from "../src/components/categorySelectList/CategorySelectList";
import {ChangePassword} from "../src/components/changePassword/ChangePassword";
import {ChooseCategory} from "../src/components/chooseCategory/ChooseCategory";
import {ChooseEventCategory} from "../src/components/chooseEventCategory/ChooseEventCategory";
import {CountyList} from "../src/components/countyList/CountyList";
import {Footer} from "../src/components/footer/Footer";
import {MyIssuesNotificationSettingsForm} from "../src/components/myIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";
import {NavbarMenu} from "../src/components/navbarMenu/NavbarMenu";
import {NotificationSettingsMyCountiesForm} from "../src/components/notificationSettingsMyCountiesForm/NotificationSettingsMyCountiesForm";
import {PageHeader} from "../src/components/pageHeader/PageHeader";
import {RegisterCompany} from "../src/components/registercompany/registercompany";
import {RegisterEmployee} from "../src/components/registeremployee/RegisterEmployee";
import {RegNew} from "../src/components/regNew/RegNew";
import {SendTextMailWindow} from "../src/components/mail/SendMail";
import {Alert} from "../src/widgets";
import {Button} from "react-bootstrap";
import {WizardFormFirstPage} from "../src/views/registerIssue/reduxRegisterForm/WizardFormFirstPage";
import {WizardFormSecondPage} from "../src/views/registerIssue/reduxRegisterForm/WizardFormSecondPage";
import {WizardFormThirdPage} from "../src/views/registerIssue/reduxRegisterForm/WizardFormThirdPage";
import {CountySubscription} from "../src/components/countySubscription/countySubscription";
import {ForgottenPassword} from "../src/views/login/forgottenPassword";
import {ChangeCounty} from "../src/views/changeCounty/changeCounty";
import {accountOverview} from "../src/views/myPage/accountOverview/accountOverview";
import {User} from "../src/classTypes";
import {Login} from "../src/views/login/login";
import {myIssues} from "../src/views/myPage/myIssues/myIssues";
import {notificationSettings} from "../src/views/notificationSettings/notificationSettings";
import {issueOverview} from "../src/views/issueOverview/issueOverview";
import {RegisterAdmin} from "../src/components/registeradmin/registeradmin";
import {WizardFormComplete} from "../src/views/registerIssue/reduxRegisterForm/WizardFormComplete";
import {InfoModule} from "../src/components/infoModule/InfoModule";
import {SetCategoryInactive} from "../src/views/admin/setCategoryInactive/SetCategoryInactive";
import {EditIssue} from "../src/views/myPage/myIssues/editIssue";

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

describe('Test for categorySelectList component', () => {
    const wrapper = shallow(<CategorySelectList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for changePassword component', () => {
    const wrapper = shallow(<ChangePassword />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for chooseCategory component', () => {
    const wrapper = shallow(<ChooseCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for chooseEventCategory component', () => {
    const wrapper = shallow(<ChooseEventCategory />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for countyList component', () => {
    const wrapper = shallow(<CountyList />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for footer component', () => {
    const wrapper = shallow(<Footer />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for myIssuesNotificationSettingsForm component', () => {
    const wrapper = shallow(<MyIssuesNotificationSettingsForm />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});

describe('Test for navbarMenu component', () => {
    const wrapper = shallow(<NavbarMenu />);


    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});


describe('Test for notificationSettingsMyCountiesForm component', () => {



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

describe('Test for pageHeader component', () => {
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

describe('Test for manageUsers view', () => {
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

describe('Test for welcomePage view', () => {
    const wrapper = shallow(<forside />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for ChangeCounty view', () => {
    const wrapper = shallow(<ChangeCounty />);

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

describe('Test for accountOverview view', () => {
    const wrapper = shallow(<accountOverview user={new User('a@a.no', 'per', 'hansen', 'Private', '12345678', 2, 1, 1)} changePassword={false}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for Login view', () => {
    const handleChangeEmailSpy = sinon.spy(Login.prototype, "handleChangeEmail");
    const handleChangePasswordSpy = sinon.spy(Login.prototype, "handleChangePassword");
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

    it('updates state.email when handlechangeemail is called', () => {
        wrapper.find("#mailText").simulate('change', mailEvent);
        expect(wrapper.state().email).toBe('test')
    });

    it('updates state.password when handlechangepassword is called', () => {
        wrapper.find("#mailText").simulate('change', passwordEvent);
        expect(wrapper.state().password).toBe('test')
    })
});

describe('Test for myIssuesCompany view', () => {
    const wrapper = shallow(<myIssuesCompany />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });


});

describe('Test for MyIssues view', () => {
    const wrapper = shallow(<myIssues />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for notificationSettings view', () => {
    const wrapper = shallow(<notificationSettings />);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Test for IssueOverview view', () => {


    const wrapper = shallow(<issueOverview match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});


describe('Test for RegisterAdmin component', () => {
    const wrapper = shallow(<RegisterAdmin/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
});

describe('Test for WizardFormComplete component', () => {
    const wrapper = shallow(<WizardFormComplete/>)

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
});

describe('Test for infoModule component', () => {
    const wrapper = shallow(<InfoModule/>)

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
});

describe('Test for SetCategoryInactive component', () => {
    const wrapper = shallow(<SetCategoryInactive/>)

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
});

describe('Test for EditIssue component', () => {
    const wrapper = shallow(<EditIssue match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>)

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
});

