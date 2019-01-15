// @flow

import { Dao } from "../dao";

export class EventDao extends Dao {

    get10newestEvents(countyId:number, callback:Function){
        console.log(countyId + " nr sendt inn");
      super.query("select * from event where countyId = ? order by eventId desc Limit 10",[countyId],callback);
    };

};