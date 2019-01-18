//import mysql from "mysql2";

let mysql = require("mysql");
import runsqlfile from './runSqlFile';
import {IssueDao} from "../src/daos/issueDao";
import {UserDao} from "../src/daos/userDao";



// GitLab CI Pool
let pool = mysql.createPool({
  connectionLimit: 2,
  host: "mysql.stud.iie.ntnu.no",
  user: "aadneny",
  password: "W9d7XVXV",
  database: "aadneny",
  debug: false,
  multipleStatements: true
});

let issueDao = new IssueDao(pool);
let userDao = new UserDao(pool);

beforeAll(done => {
  runsqlfile("tests/sqlFiles/createTables.sql", pool, () => {
    runsqlfile("tests/sqlFiles/createTestData.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});


//ISSUE-TESTING
//-----------------------------------------------------------------
test("check if  issue is exist", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].userMail).toBe("ola@usermail.com");
    done();
  }
  issueDao.getOneIssue(1, callback);
});


test("Add a issue to database", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }


  let post = {
    userMail: 'ola@usermail.com',
    latitude: 23.234,
    longitude: 40.91,
    address: 'test adresse',
    text: 'TEST',
    pic: 'TEST',
    date: 'TEST',
    statusName: 'In progress',
    categoryId: 1,
    categoryLevel: 1,
    countyId: 1,
    active: 1
  };

  issueDao.addIssue(post, callback);

});


test("check if ola added an issue", done => {
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
    expect(data[0].countyId).toBe(1);
    expect(data[0].active).toBe(1);

    done();
  }
  issueDao.getOneIssue(3, callback);
});


//USER-TESTING
//-----------------------------------------------------------------

test("Add a user to database", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
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

  userDao.addUser(post,'hashedpassword..', callback);
});

test("check if nina@usermail.com is added as user", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data[0].mail).toBe('nina@usermail.com');
    done();
  }
  userDao.getUser('nina@usermail.com', callback);
});

//EVENT-TESTING
//-----------------------------------------------------------------

//COUNTY-TESTING
//-----------------------------------------------------------------


//CATEGORY-TESTING
//-----------------------------------------------------------------