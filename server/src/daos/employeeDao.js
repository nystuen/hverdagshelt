// @flow

import {Dao} from "../dao";

export class EmployeeDao extends Dao {

    getUsersInCounty(countyId: number, callback: Function){
        super.query("SELECT * FROM user WHERE countyId = ? AND typeName='Private' ORDER BY active DESC", countyId, callback)
    }

    blockUser(mail: string, callback: Function){
        super.query("UPDATE user SET active = 0 WHERE mail=?", mail, callback)
    }

    unblockUser(mail: string, callback: Function){
        super.query("UPDATE user SET active = 1 WHERE mail=?", mail, callback)
    }

    getUsersInCountyAdmin(countyId: number, callback: Function){
        super.query("SELECT * FROM user WHERE countyId = ? AND typeName='Private' OR typeName='Employee' ORDER BY active DESC", countyId, callback)
    }

}