// @flow

import { Dao } from "../dao";

export class CategoryDao extends Dao {
  getUserLogin(userMail: string, callback: Function) {
    super.query(
      "select mail, password from user where mail=? ",
      [userMail],
      callback
    );
  }

  getCategory1(callback: Function) {
    super.query("select * from category", [], callback);
  }

  getCategory2(callback: Function) {
    super.query("select * from category2", [], callback);
  }

  getCategory3(callback: Function) {
    super.query("select * from category3", [], callback);
  }
}
