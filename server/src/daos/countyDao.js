// @flow

import {Dao} from "../dao";


export class CountyDao extends Dao {

    getAllCounties(callback: Function){
        super.query("select * from county where active=1",
            [],
            callback
        );
    }


    getAllCountiesMinusUsers(id:string, callback: Function){
        var val= [id, id];
        super.query("SELECT * from county where (county.countyId IN (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail != ?) AND county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail = ?)) OR county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties)",
            val,
            callback
        );
    }

    getSubscribedCounties(id: string, callback: Function){
        super.query("SELECT * FROM county NATURAL JOIN userCounties where userCounties.userMail = ?", [id], callback);
    }

    deleteAllSubscribedCounties(id:string, calback: Function){
        super.query("delete from userCounties where userMail =?",[id],calback);
    }

    addSubscription(json: Object, callback: Function){
        var body = [json.userMail,json.countyId ];
        super.query("insert into userCounties(userMail, countyId) value (?,?)",body,callback);
    }

}
