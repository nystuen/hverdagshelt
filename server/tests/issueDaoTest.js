//import mysql from "mysql2";

let mysql = require("mysql");
import runsqlfile from './runSqlFile';
import {IssueDao} from "../src/daos/issueDao";
import {UserDao} from "../src/daos/userDao";
import {CountyDao} from "../src/daos/countyDao";
import {CategoryDao} from "../src/daos/catergoryDao";
import {EventDao} from '../src/daos/eventDao';
import {EventCategoryDao} from '../src/daos/eventCategoryDao';
import {MailDao} from '../src/daos/mailDao';
import {NotificationSettingsDao} from '../src/daos/notificationSettingsDao';

// GitLab CI Pool
let pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql.stud.iie.ntnu.no",
  user: "aadneny",
  password: "W9d7XVXV",
  database: "aadneny",
  debug: false,
  multipleStatements: true
});





beforeAll( async () => {
  await runsqlfile("tests/sqlFiles/createTables.sql", pool,() => {
     runsqlfile("tests/sqlFiles/createTestData.sql", pool);
  });
});




afterAll(() => {
  pool.end();
});

let issueDao = new IssueDao(pool);
//ISSUE-TESTING
//-----------------------------------------------------------------


/*test("check funk", async ()=>{
  function callback(status, data){
    expect(data.length).toBeGreaterThanOrEqual(0);
  }
  await issueDao.getOneIssue(1,callback);
});*/

test("check all issues with one category", async() => {
  function callback(status, data) {

    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
  }

  await issueDao.getCategoryIssue(1, callback);
});

 test("check get all issue",  async() => {
  function callback1(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);

  };
  await issueDao.getAllIssues(callback1);
});


test("check if issue exist", async() => {
  function callback2(status, data) {
    console.log("Test callback: status=" + status + ", data=" + JSON.stringify(data));
    expect(data[0].issueId).toBe(1);
    expect(data[0].statusName).toBe('In progress');
    expect(data[0].userMail).toBe('ola@usermail.com');
  }
  await issueDao.getOneIssue(1, callback2);
});


test("Add a issue to database", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  let post = {
    "userMail": 'ola@usermail.com',
    "latitude": 23.234,
    "longitude": 40.91,
    "address": 'test adresse',
    "text": 'TEST',
    "pic": 'TEST',
    "date": 'TEST',
    "statusName": 'In progress',
    "categoryId": 1,
    "categoryLevel": 1,
    "countyId": 2,
  };

  await issueDao.addIssue(post, callback);

});


test("check if ola added an issue", async ()=> {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].issueId).toBe(3);
    expect(data[0].userMail).toBe("ola@usermail.com");
    expect(data[0].latitude).toBe(23.234);
    expect(data[0].longitude).toBe(40.91);
    expect(data[0].address).toBe('test adresse');
    expect(data[0].text).toBe('TEST');
    expect(data[0].pic).toBe('TEST');
    expect(data[0].date).toBe('TEST');
    expect(data[0].statusName).toBe('In progress');
    expect(data[0].categoryId).toBe(1);
    expect(data[0].categoryLevel).toBe(1);
    expect(data[0].countyId).toBe(2);
    expect(data[0].active).toBe(1);
  }
  await issueDao.getOneIssue(3, callback);
});


test("check if one of olas issues have county in Trondheim", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].userMail).toBe("ola@usermail.com");
    expect(data[0].latitude).toBe(23.234);
    expect(data[0].longitude).toBe(40.91);
    expect(data[0].address).toBe('test adresse');
    expect(data[0].text).toBe('TEST');
    expect(data[0].pic).toBe('TEST');
    expect(data[0].date).toBe('TEST');
    expect(data[0].statusName).toBe('In progress');
    expect(data[0].categoryId).toBe(1);
    expect(data[0].categoryLevel).toBe(1);
    expect(data[0].countyId).toBe(2);
    expect(data[0].active).toBe(1);
    expect(data[0].active).toBe(1);
    expect(data[0].name).toBe('Trondheim');
  }
  await issueDao.getIssueAndCounty(3, callback);
});


test("check get all issues from one user", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
    expect(data[0].issueId).toBe(1);
    expect(data[1].issueId).toBe(3);
    expect(data[0].text).toBe('en tekst');
    expect(data[1].text).toBe('TEST');
  }
  await issueDao.getUserIssue('ola@usermail.com', callback);
});


test("check all issues a company have", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].issueId).toBe(1);
  }
  await issueDao.getCompanyIssue('company1@company.com', callback);
});




test("check adding a comment to issue", async() => {
  function callback(status,data){
    console.log("Test adding comment to issue. Status: " + status + ". Data: " + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
  }
  await issueDao.addCommentToIssue(1, 'TEST', '7heaven@companymail.com', callback);
});


test("check getting comments for an issue", async() => {
  function callback(status,data) {
    console.log("Test getting comments for issue. Status: " + status + ". Data: " + JSON.stringify(data));
    expect(data.length).toBeGreaterThanOrEqual(1);
  }
  await issueDao.getCompanyComments(1,callback);
});

test("check getting all issues in one county", async() => {
  function callback(status,data) {
    console.log("Testing getting issues in one county. Status: " + status + ". Data: " + JSON.stringify(data));
//ToDo
    expect(data.length).toBeGreaterThanOrEqual(0);
  }
  await issueDao.getAllIssuesInCounty(2,1,callback);
});

test("check deleting one issue", async() => {
  function callback(status,data) {
    console.log("Testing deleting one issue. Status: " + status + ", Data: " + data);
    expect(data.affectedRows).toBe(1);
  }
  await issueDao.deleteIssue(1,callback);
});



let userDao = new UserDao(pool);
//USER-TESTING
//-----------------------------------------------------------------

 test("Add a user nina@usermail.com to database", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    }

    let post = {
      mail: 'nina@usermail.com',
      firstName: 'TEST ',
      lastName: 'TEST ',
      typeName: 'Private-user',
      phone: 'TEST ',
      points: 0,
      countyId: 1,
      active: 1
    };

    await userDao.addUser(post,'hashedpassword..', callback);
  });

//Kan legge inn getUserLogin men er veldig lik som getUser

  test("check if nina@usermail.com is added as user", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data[0].mail).toBe('nina@usermail.com');
      expect(data[0].county).toBe('Oslo');
    }
    await userDao.getUser('nina@usermail.com', callback);
  });



  test("check get all issues from one user", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.length).toBe(0);
    }
    await userDao.getIssuesForOneUser('nina@usermail.com', callback);
  });



  test("check resetPassword", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    }
    function callback2(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data[0].password).toBe('passord123');
    }
    await userDao.resetPassword('nina@usermail.com','passord123', callback);
    await userDao.getUser('nina@usermail.com', callback2);
  });

  test("check update user", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    }

    function callback2(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data[0].firstName).toBe('Nina');
      expect(data[0].lastName).toBe('Larsen');
      expect(data[0].phone).toBe('90192384');
    }

    let post = {
      firstName: 'Nina',
      lastName: 'Larsen',
      phone: '90192384',
      countyId: 2,
    };

   await userDao.updateUser('nina@usermail.com', post,callback);
    await userDao.getUser('nina@usermail.com', callback2);
  });

//Finner ikke getCompany hvor er den eller skal den legges til?
  test("check add company", async() => {
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    }

    let post = {
      companyMail: 'hverdagshelt@company.com',
      companyName: 'Hverdagshelt',
      firstName: 'Thea',
      lastName: 'Pettersen',
      adresse: 'adresseveien 65',
      postnr: 1234,
      phone:'19283028',
      description:'dette er en beskrivelse',
      orgNumber:2345678,
    };

   await userDao.addCompany(post,'detteErEtPassord', callback);
  });



  test("check add points to user" , async() =>{
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data.affectedRows).toBe(1);
    }

    let post={
      userMail: 'ola@usermail.com',
      points: 10,
    };

   await userDao.updatePoints(post, callback);
  });


  test("check get county employee" , async() =>{
    function callback(status, data) {
      console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
      );
      expect(data[0].firstName).toBe("Thea");
      expect(data[0].lastName).toBe("Larsen");
      expect(data[0].mail).toBe("thea@usermail.com");
    }


    await userDao.getCountyEmployee(1, callback);
  });



let countyDao = new CountyDao(pool);

//COUNTY-TESTING
//-----------------------------------------------------------------


test("check get all counties", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(3);
  }
  await countyDao.getAllCounties(callback);
});


test("check add subscription counties", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);

    expect(data[0].name).toBe('Oslo');
    expect(data[1].name).toBe('Trondheim');
  }

  let post = {
  countyId: 2,
  };

  await countyDao.addSubscription('kari@usermail.com',post, callback);
  await countyDao.getSubscribedCounties('kari@usermail.com',callback2);
});



test("check get all counties where the user that the user dos not subscribe to", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].name).toBe('Kristiansand');
  }

  await countyDao.getAllCountiesMinusUsers('kari@usermail.com',callback);
});



test("check delete all subscribed counties for one user", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(0);
  }

  await countyDao.deleteAllSubscribedCounties('kari@usermail.com',callback);
  await countyDao.getSubscribedCounties('kari@usermail.com',callback2);
});


test("check add countysubscription for companies", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  let post = {
    companyMail: 'company1@company.com',
    countyId: 1,
  };
  await countyDao.addCompanySubscription(post,callback);
});


let categoryDao = new CategoryDao(pool);
//CATEGORY-TESTING
//-----------------------------------------------------------------

test("check get all from category1", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
    expect(data[0].name).toBe('Strøm');
    expect(data[1].name).toBe('Vann og avløp');
    expect(data[0].priority).toBe(1);
    expect(data[1].priority).toBe(2);
  }

  await categoryDao.getCategory1(callback);
});


test("check get all from category2", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
    expect(data[0].name).toBe('Strømbrudd');
    expect(data[1].name).toBe('Vannstopp');

    expect(data[0].categoryId).toBe(1);
    expect(data[1].categoryId).toBe(2);
  }

  await categoryDao.getCategory2(callback);
});


test("check add one to category1 and get one from category1", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].name).toBe('Brann');
    expect(data[0].priority).toBe(1);
  }

  let post = {
    name: 'Brann',
    priority: 1,
  };

  await categoryDao.addCategory1(post,callback);
  await categoryDao.getOneCategory1(3, callback2);

});


test("check add one to category2 and get one from category2", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].name).toBe('Brann i skogen');
    expect(data[0].categoryId).toBe(3);
  }

  let post = {
    categoryId:3,
    name: 'Brann i skogen',
  };

  await categoryDao.addCategory2(post,callback);
  await categoryDao.getOneCategory2(3, callback2);

});

test("check add categories to a company", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  let post = {
    companyMail:'company1@company.com',
    categoryId: 2,
  };

  await categoryDao.addCompanyCategories(post, callback);
});


let eventCategoryDao = new EventCategoryDao(pool);
//EVENTCATEGORYY-TESTING
//-----------------------------------------------------------------
test("check get all eventCategories", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    //expect(data.length).toBeGreaterThanOrEqual(1);
  }

 await eventCategoryDao.getEventCategory(callback);
});

let eventDao = new EventDao(pool);
//EVENT-TESTING
//-----------------------------------------------------------------

test("check get 10 newest events", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeLessThanOrEqual(10);
    expect(data.length).toBe(0);
  }

  await eventDao.get10newestEvents(1,callback);
});


test("check add event", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
    expect(data[0].title).toBe('Konsert på Solsiden');
  }
  let post = {
      title:'Konsert på Solsiden',
      text:'kl 18:00-23:00 den 21.01 vil det være trafikk inn og ut av Solsiden',
      latitude:45.12,
      longitude:27.23,
      date:'21.01.2019',
      userMail:'kari@usermail.com',
      countyId:2,
      eventCategoryId:1,

  };
  await eventDao.addEvent(post,callback);
  await eventDao.get10newestEvents(2,callback2);
});




let notificationSettingsDao = new NotificationSettingsDao(pool);
//NOTIFICATION SETTINGS-TESTING
//-----------------------------------------------------------------


test("check add notificationsettings(pushalert)",async() => {
   function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);

  };

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].categoryId).toBe(1);
    expect(data[0].countyId).toBe(1);
    expect(data[0].name).toBe('Strøm');
 };

  let post = {
      countyId:1,
      categoryId: 1,
  };
 await notificationSettingsDao.addNotificationSettings('kari@usermail.com',post,callback);
  await notificationSettingsDao.getNotificationSettings('kari@usermail.com', callback2);
});


test("check add notificationsettings(pushalert) check get simple", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);

  }


  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(2);
    expect(data[1].categoryId).toBe(2);
    expect(data[1].countyId).toBe(2);
  }


  let post2 = {
    countyId:2,
    categoryId: 2,
  };
  await notificationSettingsDao.addNotificationSettings('kari@usermail.com',post2,callback);
  await notificationSettingsDao.getNotificationSettingsSimple('kari@usermail.com', callback2);

});



test("check get pushalert with name on county and category", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );

    expect(data[0].categoryId).toBe(1);
    expect(data[0].countyId).toBe(1);
    expect(data[0].categoryName).toBe('Strøm');
    expect(data[0].countyName).toBe('Oslo');
  }


  await notificationSettingsDao.getNotificationSettingsWithNames('kari@usermail.com',callback);
});


test("check delete pushalert", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(0);
  }

  await notificationSettingsDao.deleteNotificationSettings('kari@usermail.com',callback);
  await notificationSettingsDao.getNotificationSettingsSimple(2,callback2);
});




test("check add notification", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].registered).toBe(1);
    expect(data[0].inProgress).toBe(1);
    expect(data[0].completed).toBe(0);
  }


  let post = {
    registered: true,
    inProgress:true,
    completed:false,
  };

  await notificationSettingsDao.addIssueNotificationSettings('kari@usermail.com',post,callback);
  await notificationSettingsDao.getIssueNotificationSettings('kari@usermail.com',callback2);
});



test("check update notification", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }

  function callback2(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].registered).toBe(1);
    expect(data[0].inProgress).toBe(1);
    expect(data[0].completed).toBe(1);
  }


  let post = {
    registered: true,
    inProgress:true,
    completed:true,
  };

  await notificationSettingsDao.updateIssueNotificationSettings('kari@usermail.com',post,callback);
  await notificationSettingsDao.getIssueNotificationSettings('kari@usermail.com',callback2);
});




let mailDao = new MailDao(pool);
//MAIL-TESTING
//-----------------------------------------------------------------



test("check reset password", async() => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
  }


  await mailDao.resetPassword('ola@usermail.com','detteErEtNyttPassord',callback);
});


