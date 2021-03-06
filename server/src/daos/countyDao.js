// @flow

import {Dao} from "../dao";

export class CountyDao extends Dao {

  getAllCounties(callback: Function) {
    super.query('select * from county where active=1',
      [],
      callback
    );
  }

  getAllCountiesMinusUsers(id: string, callback: Function) {
    let val = [id, id];
    super.query('SELECT * from county where (county.countyId IN (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail != ?) AND county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail = ?)) OR county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties) AND active=1',
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

    addSubscription(id: string, json: Object, callback: Function){
        super.query("insert into userCounties(userMail, countyId) value (?,?)",[id, json.countyId],callback);
    }

    addCompanySubscription(json:Object, callback:Function){
        let body = [json.companyMail,json.countyId ];
        super.query("insert into companyCounties(companyMail, countyId) value (?,?)",body,callback);
    }


}

