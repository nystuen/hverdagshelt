import {Dao} from "../dao";

export class StatisticsDao extends Dao {

  getNumberStatus(countyId: number, callback: Function){
    super.query(
      "SELECT statusName, COUNT(*) as ant from issues WHERE countyId=? AND active=1 GROUP BY statusName",
      [countyId],
      callback
    )
  }

  getIssuesDaily(countyId: number, callback: Function){
    super.query(
      "SELECT date, COUNT(*) as ant from issues WHERE countyId=? AND active=1  GROUP BY date",
      [countyId],
      callback
    )
  }
  getNumberStatusAllCounties(callback: Function){
    super.query(
      "SELECT statusName, COUNT(*) as ant from issues WHERE active=1 GROUP BY statusName",
      [],
      callback
    )
  }

  getIssuesDailyAllCounties(callback: Function){
    super.query(
      "SELECT date, COUNT(*) as ant from issues WHERE active=1  GROUP BY date",
      [],
      callback
    )
  }
}
