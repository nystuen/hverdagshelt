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

  getFreqCategories(callback: Function){
    super.query("SELECT issues.categoryId, allCats.name, COUNT(*) as ant from issues NATURAL JOIN allCats GROUP BY categoryId ORDER BY ant DESC",
      [],
      callback
    )
  }

  getFreqCategoriesOneCounty(countyId: number, callback: Function){
    super.query("SELECT issues.categoryId, allCats.name, COUNT(*) as ant from issues NATURAL JOIN allCats WHERE issues.countyId=? GROUP BY categoryId ORDER BY ant DESC",
      [countyId],
      callback
    )
  }

  getProcessingTime(countyId: number, callback: Function){
    super.query("SELECT date, completedDate from issues where countyId=?",
      [countyId],
      callback)
  }
}
