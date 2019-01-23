let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, statisticsDao: Object) {
  app.get("/issueCategories", (req, res) => {
    console.log("Counting statuses in issues");
    statisticsDao.getNumberStatus((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/issuesDaily", (req, res) => {
    console.log("Counting issues pr day");
    statisticsDao.getIssuesDaily((status, data) => {
      res.status(status);
      res.json(data);
    })
  })
}
