// @flow

import {Dao} from "../dao";

const bcrypt = require('bcrypt'); //to hash password

export class CountyDao extends Dao {

    getAllCounties(callback: Function){
        super.query("select * from county where active=1",
        [],
        callback
        )
    }
}