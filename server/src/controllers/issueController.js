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

  app.get("/oversiktOverSak/:id", (req,res) => {
    console.log('received get request from /oversiktOverSak');
    issueDao.getIssueAndCounty(req.params.id, (status,data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/companyComments/:id", (req,res) => {
    console.log('Received get request from /companyComments');
    issueDao.getCompanyComments(req.params.id, (status,data) => {
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

  app.post("/updateStatusOneIssue/:id", (req,res) => {
    console.log("received update request for status on issue " + req.params.id);
    console.log(req.body.statusName);
    issueDao.updateStatusOneIssue(req.params.id, req.body.statusName, (status,data) => {
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

  app.post("/addIssueComments", (req, res) => {
    console.log('Received post request from addIssueComments');
    issueDao.addCommentToIssue(req.body.id,req.body.text, (status,data) => {
      res.status(status);
      res.json(data);
    });
  });
};
