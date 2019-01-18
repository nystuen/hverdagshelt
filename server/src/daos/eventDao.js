// @flow

import { Dao } from "../dao";

export class EventDao extends Dao {
  get10newestEvents(countyId: number, callback: Function) {
    console.log(countyId + " nr sendt inn");
    super.query(
      "select * from event where countyId = ? order by eventId desc Limit 10",
      [countyId],
      callback
    );
  }

  addEvent(json: Object, callback: Function) {
    let val = [
      json.title,
      json.text,
      json.latitude,
      json.longitude,
      json.date,
      json.userMail,
      json.countyId,
      json.eventCategoryId
    ];
    super.query(
      "insert into event (title, text, latitude, longitude, date, userMail, countyId, eventCategoryId, active) values(?, ?, ?, ?, ?, ?, ?, ?, 1)",
      val,
      callback
    );
  }
}
