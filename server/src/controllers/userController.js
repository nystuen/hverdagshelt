// @flow
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require("bcrypt-nodejs"); //to hash password
let nodemailer = require("nodemailer");
import generator from "generate-password";

let privateKey = "shhhhhverysecret";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hverdagshelt.scrum@gmail.com",
        pass: "Dreamteam"
    }
});

import {verifyToken} from "../helpers/verifyToken";

module.exports = function (app: Object, userDao: Object) {

    //brukes for å registrere kommuneansatte også
    app.post('/add_admin', urlencodedParser, (req, res) =>{
        console.log('got post request from add_admin');
        console.log(req.body);
        console.log('got request from sendTextMail');
                let newPassword = generator.generate({length: 10, numbers: true});
                console.log('newPassword:', newPassword);

                let hashed = '';
                bcrypt.hash(newPassword, null, null, function (error, hash) {
                    console.log("HASH: " + newPassword);
                    hashed = hash;
                    userDao.addUser(req.body, hashed, (status, data) => {
                        res.status(status);
                        res.json(data);
                    });
                });

                let mailOptions = {
                    from: "hverdagshelt.scrum@gmail.com",
                    to: req.body.mail,
                    subject: "Hverdagshelt - Adminbruker",
                    text: "Ditt autogenererte passord er: " + newPassword + ""
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("her skjer feilen");
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
        });



    app.post("/add_employee", urlencodedParser, (req, res) => {
        console.log("got post request from add_admin");
        console.log(req.body);
        console.log("got request from sendTextMail");
        let newPassword = generator.generate({length: 10, numbers: true});
        console.log("newPassword:", newPassword);

        let hashed = "";
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            console.log(req.body.password);
            hashed = hash;
            userDao.addUser(req.body, hashed, (status, data) => {
                res.status(status);
                res.json(data);
            });
        });

        let mailOptions = {
            from: "hverdagshelt.scrum@gmail.com",
            to: req.body.mail,
            subject: "Hverdagshelt - Adminbruker",
            text: "Ditt autogenererte passord er: " + newPassword + ""
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    });

    app.post("/add_user", urlencodedParser, (req, res) => {
        console.log("got post request from add_user");

        let hashed = "";
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addUser(req.body, hashed, (status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });

    app.post("/registrateCompany", urlencodedParser, (req, res) => {
        console.log("got post request from registrateCompany");

        let hashed = "";
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addCompany(req.body, hashed, (status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });

    app.get("/verify_user/:email", urlencodedParser, (req, res) => {
        console.log("got get request from verify_user");
        userDao.getUserLogin(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });


    app.get("/verify_company/:email", urlencodedParser, (req, res) => {
        console.log("got get request from verify_company");
        userDao.getCompanyLogin(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post("/login/", urlencodedParser, (req, res) => {
        console.log("got login request");
        if (req.body) {
            console.log("Brukernavn & passord ok");
            let token = jwt.sign(
                {email: req.body.userMail, typeId: req.body.typeId},
                privateKey,
                {
                    expiresIn: 2419200
                }
            );
            res.json({jwt: token});
        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.status(401);
            res.json({error: "Not authorized"});
        }
    });

    app.get("/user/get_current_user/", verifyToken, (req, res) => {
        console.log("got req from get_user");
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                if (decoded.typeId === "Company") {
                    userDao.getCompany(decoded.email, (status, data) => {
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    userDao.getUser(decoded.email, (status, data) => {
                        res.status(status);
                        res.json(data);
                    });
                }
            }
        });
    });

    app.get("/user/getMyIssues", verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                console.log("got req from getMyIssues");
                userDao.getIssuesForOneUser(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.get("/getHomeCounty", verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                console.log("got req from getMyIssues");
                userDao.getHomeCounty(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.get("/getCompanyIssues/:email", urlencodedParser, (req, res) => {
        console.log("got request from getCompanyIssues", req.params.email);
        userDao.getCompanyIssues(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
          });
      });

    app.get("/user/getAllIssuesWithCat", verifyToken, (req, res) => {
      jwt.verify(req.token, privateKey, (err, decoded) => {
        if (err) {
          res.sendStatus(401);
        } else {
          console.log("got req from getAllIssuesWithCat");
          userDao.getIssuesForAllUserWithCat((status, data) => {
            res.status(status);
            res.json(data);
          });
        }
      });
    });

    app.put("/user/updateUser/", verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                console.log("got req from updateUser");
                userDao.updateUser(decoded.email, req.body, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.put('/updatePoints', urlencodedParser, (req, res) => {
        userDao.updatePoints(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/companyCategories/:categoryId/:countyId', (req, res) => {
        console.log('Got get request from companyCategories in county ' + req.params.countyId);
        userDao.getCompanyCategories(req.params.categoryId, req.params.countyId, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post('/assignIssue/:issueId/:companyMail', (req, res) => {
        console.log("Got post request from assignIssue with issueId " + req.params.issueId + ' and mail ' + req.params.companyMail);
        userDao.assignIssueToCompany(req.params.issueId, req.params.companyMail, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getEmployeeData/:countyId", urlencodedParser, (req, res) => {
        userDao.getCountyEmployee(req.params.countyId, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.put("/user/change_password", verifyToken, (req, res) => {
        jwt.verify(req.token, privateKey, (err, decoded) => {
            console.log(decoded.email);
            if (err) {
                res.sendStatus(401);
            } else {
                console.log("got req from change_password");
                let hashed = "";
                bcrypt.hash(req.body.newPassword, null, null, function (error, hash) {
                    hashed = hash;
                    userDao.createNewPassword(
                        {
                            newPassword: hashed,
                            email: decoded.email
                        },
                        (status, data) => {
                            res.status(status);
                            res.json(data);
                        }
                    );
                });
            }
        });
    });

    app.get("/getCompanyIssuesWithCat/:email", urlencodedParser, (req, res) => {
        console.log("got request from getCompanyIssues", req.params.email);
        userDao.getCompanyIssuesWithCat(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
          });
    });
};
