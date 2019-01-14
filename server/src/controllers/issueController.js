//@flow

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, issueDao: Object) {
  app.post("/add_issue", urlencodedParser, (req, res) => {
    console.log("received post request from add_issue");
    issueDao.addIssue(req.body, (status, data) => {
      res.status(status);
    });
  });

  app.get("/Issues", (req, res) => {
    console.log("received get request from allIssues");
    issueDao.getAllIssues((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/UserIssues/:UserMail", (req, res) => {
    console.log("received get request from issue from one user");
    issueDao.getUserIssue(req.params.UserMail, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/Issues/:id", (req, res) => {
    console.log("received get request from issues/:id");
    issueDao.getOneIssue(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/CompanyIssues/:CompanyMail", (req, res) => {
    console.log("received get request from companyIssues");
    issueDao.getCompanyIssue(req.params.CompanyMail, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/CategoryIssues/:CategoryId", (req, res) => {
    console.log("received get request from categoryIssues");
    issueDao.getCategoryIssue(req.params.CategoryId, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/Categories", (req, res) => {
    console.log("received get request from category");
    issueDao.getAllCategories((status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
