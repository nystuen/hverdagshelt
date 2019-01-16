// @flow

import { Dao } from "../dao";

export class EventCategoryDao extends Dao {
  getEventCategory(callback: Function) {
    super.query("select * from eventCategory", [], callback);
  }
}
