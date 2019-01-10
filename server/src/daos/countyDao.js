// @flow

import {Dao} from "../dao";

const bcrypt = require('bcrypt'); //to hash password

export class UserDao extends Dao {

    getAllCounties(callback: (status: string, data: string)=>void){
        super.query("select id, name from county",
        [],
        callback
        )
    }
}