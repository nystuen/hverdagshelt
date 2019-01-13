import mysql from "mysql2";
import runsqlfile from './runSqlFile';
import {IssueDao} from "../src/daos/issueDao";

// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "abc123",
    database: "testdb",
    debug: false,
    multipleStatements: true
});

let issueDao = new IssueDao(pool);


beforeAll(done => {
    runsqlfile("tests/sqlFiles/createTables.sql", pool, () => {
        runsqlfile("tests/sqlFiles/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
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
        userMail: 'petter@usermail.com',
        latitude: 23.234,
        longitude: 40.91,
        text: 'TEST',
        pic: 'TEST ',
        date: 'TEST ',
        statusName: 'In progress',
        categoryId: 1,
        countyId: 1,
        active: 1
    };

    issueDao.addIssue(post, callback);

});

test("check if added issue is added", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].userMail).toBe("petter@usermail.com");
        expect(data[0].latitude).toBe(23.234);
        expect(data[0].longitude).toBe(40.91);
        expect(data[0].text).toBe('TEST');
        expect(data[0].pic).toBe('TEST');
        expect(data[0].date).toBe('TEST');
        expect(data[0].statusName).toBe('In progress');
        expect(data[0].categoryId).toBe(1);
        expect(data[0].countyId).toBe(1);
        expect(data[0].active).toBe(1);
        done();
    }
    issueDao.getOneIssue(3, callback);
});