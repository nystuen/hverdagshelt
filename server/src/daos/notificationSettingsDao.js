// @flow

import {Dao} from "../dao";


export class NotificationSettingsDao extends Dao {

    getNotificationSettings(userMail: string, callback: Function) {
        super.query("select categoryId, name, countyId from pushAlerts natural join category where userMail=? ", [userMail], callback);
    }

    getNotificationSettingsSimple(userMail: string, callback: Function) {
        super.query("select categoryId, countyId from pushAlerts where userMail=?", [userMail], callback);
    }

    deleteNotificationSettings(userMail: string, callback: Function) {
        super.query("delete from pushAlerts where userMail=?", [userMail], callback);
    }

    addNotificationSettings(json: Object, callback: Function) {
        let val = [json.countyId, json.categoryId, json.userMail];
        super.query("insert into pushAlerts (countyId, categoryId, userMail ) values (?, ?, ?)", val, callback)
    }

    getIssueNotificationSettings(userMail: string, callback: Function) {
        super.query("select * from notifications where userMail=? ", [userMail], callback);
    }

    updateIssueNotificationSettings(json: Object, callback: Function) {
        let val = [json.registered, json.inProgress, json.completed, json.userMail];
        super.query("update notifications set registered=?, inProgress=?, completed=? where userMail=?", val, callback);
    }

    addIssueNotificationSettings(json: Object, callback: Function) {
        console.log(json);
        let val = [json.userMail, json.registered, json.inProgress, json.completed];
        super.query("insert into notifications (userMail, registered, inProgress, completed) values (?, ?, ?, ?)", val, callback);
    }

    getNotificationSettingsWithNames(userMail: string, callback: Function) {
        super.query("select category.categoryId, county.countyId, category.name as 'categoryName', county.name as 'countyName' " +
            "from county, category where category.categoryId in(select pushAlerts.categoryId from pushAlerts where pushAlerts.userMail = ?) and " +
            "county.countyId in(select pushAlerts.countyId from pushAlerts where pushAlerts.userMail= ?)", [userMail, userMail], callback);
    }
}
