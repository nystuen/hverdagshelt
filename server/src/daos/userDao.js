// @flow

import {Dao} from "../dao";

const bcrypt = require('bcrypt-nodejs'); //to hash password

export class UserDao extends Dao {

    addUser(json: Object,hashed:string, callback: Function) {
        let val = [json.mail, json.firstName, json.lastName, hashed, json.typeName, json.phone, json.countyId];
        super.query(
            "insert into user (mail, firstName, lastName, password, typeName, phone, points, countyId, active) values(?, ?, ?, ?, ?, ?, 0, ?, 1)",
            val,
            callback);
    }

    getUserLogin(userMail: string, callback: Function) {
        super.query("select mail, password, typeName from user where mail=? ", [userMail], callback);
    }//end method

    getUser(userMail: string, callback: Function) {
        super.query("select * from user where mail=? ", [userMail], callback);
    }//end method}
}