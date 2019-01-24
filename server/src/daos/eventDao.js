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

  getEvent(eventId: number, callback: Function) {
    console.log(eventId + " getRqeuest event");
    super.query(
      "select * from event where eventId = ?",
      [eventId],
      callback
    );
  }

  getAllEventsInOneCounty(countyId: number, callback: Function){
    console.log('Events in county ' + countyId);
    super.query("Select * from event natural join eventCategory where event.countyId=? and event.active=1", [countyId], callback);
  }//end method

  updateEvent(event: Object, callback: Function){
    console.log('Updating event with id ' + event.eventId);
    let val = [event.title, event.text, event.eventCategoryId, event.eventId];
    super.query("Update event set title=?, text=?, eventCategoryId=? where eventId=?", val, callback)
  }//end method
}
