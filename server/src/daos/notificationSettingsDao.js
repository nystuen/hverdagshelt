// @flow

import {Dao} from "../dao";


export class NotificationSettingsDao extends Dao {

    getNotificationSettings(userMail: string, callback: Function) {
        super.query("select name from pushAlerts natural join category where userMail=? ", [userMail], callback);
    }
}