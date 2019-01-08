// @flow

import { Dao } from "../dao";

export class UserDao extends Dao {
  addUser(json: Object, callback: Function) {
    let val = [
      json.mail,
      json.typeName,
      json.phone,
      json.password,
      json.countyId
    ];
    super.query(
      "insert into user (mail, typeName, phone, password, points, countyId, active) values(?, ?, ?, ?, 0, ?, 1)",
      val,
      callback
    );
  }
}
