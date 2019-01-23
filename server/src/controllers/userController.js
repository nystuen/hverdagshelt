// @flow

let jwt = require("jsonwebtoken");
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcrypt-nodejs'); //to hash password

let privateKey = "shhhhhverysecret";


import {verifyToken} from "../helpers/verifyToken";


module.exports = function (app: Object, userDao: Object) {

    /*
    app.use("/user", (req, res, next) => {
        let token = req.body;
        console.log(req.body);
        console.log(token);
        jwt.verify(token, privateKey, (err, decoded) => {
            console.log(err.message);
            if (err) {
                console.log("Token IKKE ok");
                res.status(401);
                res.json({ error: "Not authorized" });
            } else {
                console.log("Token ok: " + decoded.userMail);
                next();
            }
        });
    });
*/
    app.post('/add_user', urlencodedParser, (req, res) => {
        console.log('got post request from add_user');

        let hashed = '';
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addUser(req.body, hashed, (status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });

    app.post('/registrateCompany', urlencodedParser, (req, res) => {
        console.log('got post request from registrateCompany');

        let hashed = '';
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addCompany(req.body, hashed, (status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });


    app.get('/verify_user/:email', urlencodedParser, (req, res) => {
        console.log('got get request from verify_user');
        userDao.getUserLogin(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/verify_company/:email', urlencodedParser, (req,res) => {
        console.log('got get request from verify_company')  ;
        userDao.getCompanyLogin(req.params.email, (status,data) => {
           res.status(status);
           res.json(data);
        });
    });


    app.post('/login/', urlencodedParser, (req, res) => {
        console.log('got login request');
        if (req.body) {
            console.log("Brukernavn & passord ok");
            let token = jwt.sign({email: req.body.userMail, typeId: req.body.typeId}, privateKey, {
                expiresIn: 2419200
            });
            res.json({jwt: token});
        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.status(401);
            res.json({error: "Not authorized"});
        }
    });

    app.get('/user/get_current_user/', verifyToken, (req, res) => {
        console.log('got req from get_user');
        jwt.verify(req.token, privateKey, (err, decoded) => {
            console.log('Type: ' + decoded.typeId);
            if(err) {
                res.sendStatus(401)
            } else {

                if (decoded.typeId === 'Company') {
                    userDao.getCompany(decoded.email, (status, data) => {
                        res.status(status);
                        res.json(data);
                    })
                } else {
                    userDao.getUser(decoded.email, (status, data) => {
                        res.status(status);
                        res.json(data);
                    })
                }
            }
        });
    });

    app.get('/user/getMyIssues', verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log('got req from getMyIssues');
                userDao.getIssuesForOneUser(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.get('/getHomeCounty', verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log('got req from getMyIssues');
                userDao.getHomeCounty(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.get('/getCompanyIssues/:email', urlencodedParser, (req,res) => {
        console.log('got request from getCompanyIssues', req.params.email);
        userDao.getCompanyIssues(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        })
    });

    app.get('/companyCategories/:categoryId/:countyId', (req,res) => {
        console.log('Got get request from companyCategories in county ' + req.params.countyId);
        userDao.getCompanyCategories(req.params.categoryId, req.params.countyId, (status,data) => {
           res.status(status);
           res.json(data);
        });
    });

    app.post('/assignIssue/:issueId/:companyMail', (req,res) => {
        console.log("Got post request from assignIssue with issueId " + req.params.issueId + ' and mail ' + req.params.companyMail);
        user.assignIssueToCompany(req.params.issueId,req.params.companyMail,(status,data)=> {
           res.status(status);
           res.json(data);
        });
    });

    app.put('/user/updateUser/', verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log('got req from updateUser');
                userDao.updateUser(decoded.email, req.body, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });
};