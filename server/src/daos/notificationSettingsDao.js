// @flow

import {Dao} from "../dao";


export class NotificationSettingsDao extends Dao {

    getNotificationSettings(userMail: string, callback: Function) {
        super.query("select categoryId, name, countyId from pushAlerts natural join category where userMail=? ", [userMail], callback);
    }

    deleteNotificationSettings(userMail: string, callback: Function) {
        super.query("delete from pushAlerts where userMail=?", [userMail], callback);
    }

    addNotificationSettings(json: Object, callback: Function) {
        let val = [json.countyId, json.categoryId, json.userMail];
        super.query("insert into pushAlerts (countyId, categoryId, userMail )values (?, ?, ?)", val, callback)
    }
}