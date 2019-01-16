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
      json.categoryLevel,
      json.countyId
    ];
    super.query(
      "insert into issues (userMail, latitude, longitude, text, pic, date, statusName, categoryId, categoryLevel, countyId, active) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
      val,
      callback
    );
  }

  getAllIssues(callback: Function) {
    super.query("select * from issues", [], callback);
  }

  getOneIssue(id: number, callback: Function) {
    super.query("select * from issues where issueId = ?", [id], callback);
  }

  getIssueAndCounty(id: number, callback: Function){
    super.query("select * from issues natural join county where issueId=?", [id], callback);
  }//end method


  getAllCategories(callback: Function) {
    super.query("select * from category", [], callback);
  }

  getUserIssue(id: String, callback: Function) {
    super.query("select * from issues where userMail = ? and active=1", [id], callback);
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

  updateStatusOneIssue(id: number,statusName: string, callback: Function){
    super.query("update issues set statusName=? where issueId=?", [statusName,id], callback);
  }//end method
}//end class
