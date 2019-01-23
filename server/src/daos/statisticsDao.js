import {Dao} from "../dao";

export class StatisticsDao extends Dao {

  getNumberStatus(callback: Function){
    super.query(
      "SELECT statusName, COUNT(*) as ant from issues GROUP BY statusName",
      [],
      callback
    )
  }

  getIssuesDaily(callback: Function){
    super.query(
      "SELECT date, COUNT(*) as ant from issues GROUP BY date",
      [],
      callback
    )
  }

}
