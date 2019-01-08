import mysql from "mysql2";
import runsqlfile from './runSqlFile';
import {UserDao} from "../src/daos/userDao";

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

let userDao = new UserDao(pool);


beforeAll(done => {
    runsqlfile("tests/sqlFiles/createTables.sql", pool, () => {
        runsqlfile("tests/sqlFiles/createTestData.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("Add a user to database", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
    }

    function callback2(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].mail).toBe("halo");
        done();
    }

    let post = {
        mail: 'halo',
        firstName: 'TEST ',
        lastName: 'TEST ',
        typeName: 'TEST  ',
        phone: 'TEST ',
        password: 'TEST ',
        points: 0,
        countyId: 1,
        active: 1
    };

    userDao.addUser(post, callback);
    userDao.getUser(callback2);


});
