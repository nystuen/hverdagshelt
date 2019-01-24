import {Dao} from "../dao";

export class StatisticsDao extends Dao {

  getNumberStatus(countyId: number, callback: Function){
    super.query(
      "SELECT statusName, COUNT(*) as ant from issues WHERE countyId=? GROUP BY statusName",
      [countyId],
      callback
    )
  }

  getIssuesDaily(countyId: number, callback: Function){
    super.query(
      "SELECT date, COUNT(*) as ant from issues WHERE countyId=? GROUP BY date",
      [countyId],
      callback
    )
  }
}
