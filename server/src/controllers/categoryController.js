// @flow

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, categoriesDao: Object) {
  app.get("/get_category1", urlencodedParser, (req, res) => {
    console.log("got request from get_user");

    categoriesDao.getCategory1((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/get_category2", urlencodedParser, (req, res) => {
    console.log("got request from get_user");
    categoriesDao.getCategory2((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/get_category3", urlencodedParser, (req, res) => {
    console.log("got request from get_user");
    categoriesDao.getCategory3((status, data) => {
      res.status(status);
      res.json(data);
    });
  });
    app.get('/get_category3', urlencodedParser, (req, res) => {
        console.log('got request from get_user');
        categoriesDao.getCategory3((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/getOneCategory1/:id', urlencodedParser, (req,res) => {
        console.log('got request from getOneCategory1');
        categoriesDao.getOneCategory1(req.params.id, (status,data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/getOneCategory2/:id', urlencodedParser, (req,res) => {
        console.log('got request from getOneCategory2');
        categoriesDao.getOneCategory2(req.params.id, (status,data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/getOneCategory3/:id', urlencodedParser, (req,res) => {
        console.log('got request from getOneCategory3');
        categoriesDao.getOneCategory3(req.params.id, (status,data) => {
            res.status(status);
            res.json(data);
        });
    });

  app.post("/add_category1", urlencodedParser, (req, res) => {
    console.log("got request from get_user");
    categoriesDao.addCategory1(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/add_category2", urlencodedParser, (req, res) => {
    console.log("got request from get_user");
    categoriesDao.addCategory2(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/add_category3", urlencodedParser, (req, res) => {
    console.log("got request from get_user");
    categoriesDao.addCategory3(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
