// @flow

import { Dao } from '../dao';

const bcrypt = require('bcrypt-nodejs'); //to hash password

export class MailDao extends Dao {

  resetPassword(json: Object, hashed: string, callback: Function) {
    let val = [hashed, json];
    console.log('maildao',val);
    super.query(
      ' UPDATE user SET password=? WHERE user.mail=?',
      val,
      callback);
  }//end method
}
