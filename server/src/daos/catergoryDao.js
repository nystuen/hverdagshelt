// @flow

import {Dao} from "../dao";
import {verifyToken} from "../helpers/verifyToken";

export class CategoryDao extends Dao {

  //Skal vekk men vet ikke om den er i bruk
  getUserLogin(userMail: string, callback: Function) {
    super.query(
      "select mail, password from user where mail=? ",
      [userMail],
      callback
    );
  }

  updateCategory1(id:number, callback: Function){
      super.query('Update category2 SET active=0 WHERE categoryId=?',
          [id],
          callback
      );
  }
  updateCategory2before1(id:number, callback: Function){
      super.query('Update category SET active=0 WHERE categoryId=?',
          [id],
          callback
      )
  }

  updateCategory2(id:number, callback: Function){
      console.log("Det her er kategoriID: "+id);
      super.query('Update category2 SET active=0 WHERE category2Id=?',
          [id],
          callback
    );
  }



    getCategory1(callback: Function) {
        super.query("select * from category where active=1", [], callback);
    }

  getCategory2(callback: Function) {
    super.query("select * from category2 where active =1", [], callback);
  }

  //Skal ikke brukes så tas ikke med i testing
  getCategory3(callback: Function) {
    super.query("select * from category3", [], callback);
  }


    getOneCategory1(categoryId: number, callback: Function){
        super.query("select * from category where categoryId=? and active=1",[categoryId], callback);
    }

    getOneCategory2(categoryId: number, callback: Function) {
        super.query("select * from category2 where category2Id=? and active=1", [categoryId], callback);
    }


    //Skal ikke brukes så tas ikke med i testing
    getOneCategory3(categoryId: number, callback: Function){
        super.query("select * from category3 where category3Id=?",[categoryId], callback);
    }


    addCategory1(json: Object, callback: Function) {
        let body = [json.name, json.priority];
        super.query('insert into category(categoryId, name, priority, active) values (default,?,?,1)', body, callback);
    }

    addCategory2(json: Object, callback: Function) {
        let body = [json.categoryId, json.name];
        super.query(
            "insert into category2(categoryId, category2Id, name, active)values(?, default, ?,1)",
            body,
            callback
        );
    }

  //Skal ikke brukes så tas ikke med i testing
  addCategory3(json: Object, callback: Function) {
    let body = [json.category2Id, json.name];
    super.query(
      "insert into category3(category2Id,category3Id, name, active)values(?, default, ?, 1)",
      body,
      callback
    );
  }

    addCompanyCategories(json: Object, callback: Function) {
        let body = [json.companyMail, json.categoryId];
        super.query("insert into companyCategories(companyMail,categoryId)values (?,?)", body, callback);
    }

}
