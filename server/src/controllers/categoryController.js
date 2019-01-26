// @flow

import * as jwt from "jsonwebtoken";

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
import {verifyToken} from "../helpers/verifyToken";

let privateKey = 'shhhhhverysecret';

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

  app.post("/add_category1", verifyToken, (req, res) => {
      jwt.verify(req.token, privateKey, (err, decoded) => {
          if(err) {
              res.sendStatus(401)
          } else {
              if (decoded.typeId === 'Admin') {
                  console.log('got req from add_category1');
                  categoriesDao.addCategory1(req.body, (status, data) => {
                      res.status(status);
                      res.json(data);
                  })
              } else {
                  console.log(decoded.typeId + ' are not authorized to create categories');
                  res.sendStatus(401)
              }
          }
      });
  });
  app.put("/category1/updateCategory1", verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401)
            } else {
                console.log("got req from updateCategory");
                categoriesDao.updateCategory1(req.body.cat1Id, (status, data) => {
                    console.log("KOMMER HIT");
                    res.status(status);
                    res.json(data);
                })
            }
        });
  });

    app.put("/category1/updateCategory2", verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401)
            } else {
                console.log("got req from updateCategory");
                categoriesDao.updateCategory2before1(req.body.cat1Id, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

  app.put("/category2/updateCategory2", verifyToken, (req, res)=>{
      jwt.verify(req.token, privateKey, (err, decoded) => {
          if (err) {
              res.sendStatus(401)
          } else {
                console.log("got req from updateCategory");
                categoriesDao.updateCategory2(req.body.cat2Id, (status, data) => {
                    res.status(status);
                  res.json(data);
              })
          }
      });
  });


  app.post("/add_category2", verifyToken, (req, res) => {
      jwt.verify(req.token, privateKey, (err, decoded) => {
          if(err) {
              res.sendStatus(401)
          } else {
              if (decoded.typeId === 'Admin') {
                  console.log('got req from add_category2');
                  categoriesDao.addCategory2(req.body, (status, data) => {
                      res.status(status);
                      res.json(data);
                  })
              } else {
                  console.log(decoded.typeId + ' are not authorized to create categories');
                  res.sendStatus(401)
              }
          }
      });
  });

  app.post("/add_category3", verifyToken, (req, res) => {
      jwt.verify(req.token, privateKey, (err, decoded) => {
          if(err) {
              res.sendStatus(401)
          } else {
              if (decoded.typeId === 'Admin') {
                  console.log('got req from add_category3');
                  categoriesDao.addCategory3(req.body, (status, data) => {
                      res.status(status);
                      res.json(data);
                  })
              } else {
                  console.log(decoded.typeId + ' user types are not authorized to create categories');
                  res.sendStatus(401)
              }
          }
      });
  });

    app.post("/add_CompanyCategories", urlencodedParser, (req, res) => {
        console.log("got request from add user categories");
        categoriesDao.addCompanyCategories(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });
};
