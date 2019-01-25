// @flow

import { Dao } from "../dao";

const bcrypt = require("bcrypt-nodejs"); //to hash password

export class UserDao extends Dao {
  addUser(json: Object, hashed: string, callback: Function) {
    let val = [
      json.mail,
      json.firstName,
      json.lastName,
      hashed,
      json.typeName,
      json.phone,
      json.countyId
    ];
    super.query(
      "insert into user (mail, firstName, lastName, password, typeName, phone, points, countyId, active) values(?, ?, ?, ?, ?, ?, 0, ?, 1)",
      val,
      callback
    );
  } //end method

  getUserLogin(userMail: string, callback: Function) {
    super.query(
      "select mail, password, countyId, typeName, active from user where mail=?",
      [userMail],
      callback
    );
  } //end method

  getCompanyLogin(userMail: string, callback: Function) {
    super.query(
      "select companyMail, password,active from company where companyMail=?",
      [userMail],
      callback
    );
  }

  getCountyEmployee(id: number, callback: Function) {
    let val = ["Employee", id, 1];
    super.query(
      "SELECT * from user WHERE (typeName LIKE ? && countyId LIKE ? && active Like ?)",
      val,
      callback
    );
  } //end method

  getUser(userMail: string, callback: Function) {
    console.log("usermail, dao", userMail);
    super.query(
      "SELECT countyId, active, mail, firstName, lastName, password, typeName, phone, points, name AS 'county' FROM user NATURAL JOIN county where mail=? and active=1 ",
      [userMail],
      callback
    );
  } //end method}

  getCompany(userMail: string, callback: Function) {
    super.query(
      "select * from company where companyMail = ? and active = 1",
      [userMail],
      callback
    );
  }

  getHomeCounty(userMail: string, callback: Function) {
    super.query(
      "select countyId, name from user natural join county where mail=?",
      [userMail],
      callback
    );
  }



  getIssuesForOneUser(userMail: string, callback: Function) {
    super.query(
      "select * from issues where userMail=? and active=1 ORDER BY issueId DESC",
      [userMail],
      callback
    );
  } //end method

  getIssuesForAllUserWithCat(callback: Function) {
    super.query(
      "select * from issues,allCats where ((issues.categoryLevel=1 and issues.categoryId=allCats.categoryId) or (issues.categoryLevel=2 and issues.categoryId=allCats.category2Id)) and active=1 order by issueId DESC",
      [],
      callback
    );
  }

  getCompanyIssuesWithCat(companyMail: string, callback: Function) {
    super.query(
      "select * from issues,allCats where ((issues.categoryLevel=1 and issues.categoryId=allCats.categoryId) or (issues.categoryLevel=2 and issues.categoryId=allCats.category2Id)) and active=1 and issueId in (select issueId from companyIssues where companyMail =?)  order by issueId DESC",
      [companyMail],
      callback
    );
  }

  getCompanyIssues(companyMail: string, callback: Function) {
    super.query(
      "select * from issues where issueId in (select issueId from companyIssues where companyMail =?) ORDER BY issueId DESC",
      companyMail,
      callback
    );
  } //end method

    getCompanyCategories(categoryId: number, countyId: number,  callback: Function){
      console.log('category ' + categoryId + ' countyId ' + countyId);
      super.query("Select * from companyCategories natural join company where categoryId=? " +
          "and companyCategories.companyMail IN(SELECT companyCounties.companyMail FROM companyCounties WHERE companyCounties.countyId=?)",
          [categoryId, countyId], callback);
    }//end method

    assignIssueToCompany(issueId: number, companyMail: string, callback: Function){
      console.log('Assigning issue to company with mail ' + companyMail + ' and issueId ' + issueId);
      super.query("insert into companyIssues(issueId,companyMail) values(?,?)", [issueId,companyMail], callback);
    }//end method

  resetPassword(json: Object, hashed: string, callback: Function) {
    let val = [hashed, json];
    console.log("maildao", val);
    super.query(" UPDATE user SET password=? WHERE user.mail=?", val, callback);
  } //end method

  createNewPassword(json: Object, callback: Function) {
    let val = [json.newPassword, json.email];
    super.query(
      "UPDATE user SET password=? WHERE user.mail = ?",
      val,
      callback
    );
  }

  updateUser(email: string, json: Object, callback: Function) {
    let val = [json.firstName, json.lastName, json.phone, json.countyId, email];
    console.log("hei");
    console.log(val);
    super.query(
      "UPDATE user SET firstName =?, lastName=?, phone=?, countyId=? WHERE user.mail =?",
      val,
      callback
    );
  }


  updatePoints(json:Object, callback){
    let val = [json.points,json.userMail];
    super.query('Update user set points =? where user.mail =?',val,callback);
  }


  addCompany(json: Object, hashed: string, callback: Function) {
    let val = [
      json.companyMail,
      json.companyName,
      json.firstName,
      json.lastName,
      json.address,
      json.postNumber,
      hashed,
      json.phone,
      json.description,
      json.orgNumber
    ];
    super.query(
      "insert into company(companyMail, companyName, firstName, lastName, adresse, postnr, password,phone, description, orgNumber)values(?,?,?,?,?,?,?,?,?,?)",
      val,
      callback
    );
  }
} //end class
