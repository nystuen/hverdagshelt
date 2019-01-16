// @flow

import { Dao } from "../dao";

export class EventDao extends Dao {
  addEvent(json: Object, callback: Function) {
    let val = [
      json.title,
      json.text,
      json.latitude,
      json.longitude,
      json.date,
      json.userMail,
      json.countyId
    ];
    super.query(
      "insert into event (title, text, latitude, longitude, date, userMail, countyId, active) values(?, ?, ?, ?, ?, ?, ?, 1)",
      val,
      callback
    );
  }
}
