//@flow

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, issueDao: Object) {
  app.post("/add_issue", urlencodedParser, (req, res) => {
    console.log("got post request from add_issue");
    issueDao.addIssue(req.body, (status, data) => {
      res.status(status);
    });
  });

  app.get("/allIssues", (req, res) => {
    console.log("got get request from allIssues");
    issueDao.getAllIssues((status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
