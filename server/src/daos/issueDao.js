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
    super.query("select * from issues where active=1", [], callback);
  }

  getOneIssue(id: number, callback: Function) {
    super.query(
      "select * from issues where issueId = ? and active=1",
      [id],
      callback
    );
  }

  getIssueAndCounty(id: number, callback: Function) {
    super.query(
      "select * from issues natural join county where issueId=? and issues.active=1",
      [id],
      callback
    );
  } //end method

  getAllIssuesInCounty(id: number, categoryLevel: number, callback: Function) {
    //Get the oldest first, have created view allCats(All categories)
    super.query(
      "select issues.issueId,issues.text,allCats.name, issues.statusName,allCats.categoryId " +
        "from issues,allCats where issues.countyId =? and issues.active=1 and issues.issueId NOT IN(SELECT issueId from companyIssues)" +
        "and ((issues.categoryLevel=1 AND issues.categoryId=allCats.categoryId) OR " +
        "(issues.categoryLevel=2 AND issues.categoryId=allCats.category2Id)) order by issues.issueId ASC",
      [id],
      callback
    );
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
      "select * from issues NATURAL JOIN companyIssues where companyMail = ? and issues.active=1",
      [id],
      callback
    );
  }

  getCategoryIssue(id: number, callback: Function) {
    super.query(
      "select * from issues where categoryId = ? and active=1",
      [id],
      callback
    );
  }

  updateStatusOneIssue(id: number, statusName: string, callback: Function) {
    if (statusName == "Completed") {
      let day = new FindDate();
      let currentDay = day.day + "." + day.month + "." + day.year;
      super.query(
        "update issues SET completedDate =?, statusName=? where issueId=?",
        [currentDay, statusName, id],
        callback
      );
    } else {
      super.query(
        "update issues set statusName=? where issueId=?",
        [statusName, id],
        callback
      );
    }
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
  } //end method

  updateIssue(issueId: number, text: string, callback: Function) {
    console.log("text: " + text.text);
    console.log("hei");
    super.query(
      "update issues set text=? where issueId=?",
      [text.text, issueId],
      callback
    );
  }
} //end class

class FindDate {
  day;
  month;
  year;

  constructor() {
    var today = new Date();
    this.day = today.getDate();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
  }
}
