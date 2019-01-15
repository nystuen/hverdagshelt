// @flow

import {Dao} from "../dao";


export class CategoryDao extends Dao {


    getUserLogin(userMail: string, callback: Function) {
        super.query("select mail, password from user where mail=? ", [userMail], callback);
    }

    getCategory1(callback: Function){
        super.query("select * from category",[], callback);
    }

    getCategory2(callback: Function){
        super.query("select * from category2",[], callback);
    }

    getCategory3(callback: Function){
        super.query("select * from category3",[], callback);
    }



    addCategory1(json:Object, callback:Function){
        var body=[json.name, json.priority];
        super.query('insert into category(categoryId, name, priority, active) values (default,?,?,1)',body,callback);
    }

    addCategory2(json:Object, callback:Function){
        var body=[json.categoryId, json.name];
        super.query('insert into category2(categoryId, category2Id, name, active)values(?, default, ?,1)',body,callback);
    }

    addCategory3(json:Object, callback:Function){
        var body=[json.category2Id, json.name];
        super.query('insert into category3(category2Id,category3Id, name, active)values(?, default, ?, 1)',body,callback);
    }

}

