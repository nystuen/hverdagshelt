// @flow

import { Dao } from "../dao";

export class IssueDao extends Dao {
  addIssue(json: Object, callback: Function) {
    let val = [
      json.userMail,
      json.latitude,
      json.longitude,
      json.address,
      json.text,
      json.pic,
      json.date,
      json.statusName,
      json.categoryId,
      json.categoryLevel,
      json.countyId
    ];
    super.query(
      "insert into issues (userMail, latitude, longitude, address, text, pic, date, statusName, categoryId, categoryLevel, countyId, active) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
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

  getIssueAndCounty(id: number, callback: Function) {
    super.query(
      "select * from issues natural join county where issueId=?",
      [id],
      callback
    );
  } //end method

  getAllIssuesInCounty(id: number, categoryLevel: number, callback: Function) {
    if (categoryLevel === 1) {
      super.query(
        "select * from issues natural join category where issues.countyId =? and issues.active=1",
        [id],
        callback
      );
    } else {
      super.query(
        "select * from issues natural join category2 where issues.countyId=? and issues.active=1",
        [id],
        callback
      );
    } //end condition
  } //end method

  getCompanyComments(id: number, callback: Function) {
    super.query("select * from companyComment where issueId=?", [id], callback);
  } //end method

  getAllCategories(callback: Function) {
    super.query("select * from category", [], callback);
  }

  getUserIssue(id: String, callback: Function) {
    super.query(
      "select * from issues where userMail = ? and active=1",
      [id],
      callback
    );
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

  updateStatusOneIssue(id: number, statusName: string, callback: Function) {
    super.query(
      "update issues set statusName=? where issueId=?",
      [statusName, id],
      callback
    );
  } //end method

  addCommentToIssue(
    issueId: number,
    text: string,
    mail: string,
    callback: Function
  ) {
    super.query(
      "insert into companyComment(issueId,text, mail) values(?,?,?)",
      [issueId, text, mail],
      callback
    );
  } //end method

  deleteIssue(issueId: number, callback: Function) {
    super.query(
      "update issues set active=0 where issueId=?",
      [issueId],
      callback
    );
  }
} //end class
