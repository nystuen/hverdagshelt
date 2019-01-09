// @flow

import { Dao } from "../dao";

export class IssueDao extends Dao {
  addIssue(json: Object, callback: Function) {
    let val = [
      json.userMail,
      json.latitude,
      json.longitude,
      json.text,
      json.pic,
      json.date,
      json.statusName,
      json.categoryId,
      json.countyId
    ];
    super.query(
      "insert into issues (userMail, latitude, longitude, text, pic, date, statusName, categoryId, countyId, active) values(?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
      val,
      callback
    );
  }

  getAllIssues(callback: Function) {
    super.query("select * from issues", [], callback);
  }

  getUserIssue(id: String, callback: Function) {
    super.query("select * from issues where userMail = ?", [id], callback);
  }

  getCompanyIssue(id: String, callback: Function) {
    super.query(
      "select * from issues NATURAL JOIN companyIssues where companyMail = ?",
      [id],
      callback
    );
  }

  getCategoryIssue(id: number, callback: Function) {
    super.query("select * from issues where categoryId = ?", [id], callback);
  }
}
