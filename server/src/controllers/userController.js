// @flow

let jwt = require("jsonwebtoken");
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcrypt-nodejs'); //to hash password

let privateKey = "shhhhhverysecret";


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
        console.log(req.body);

        let hashed = '';
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addUser(req.body, hashed ,(status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });


    app.post('/registrateCompany', urlencodedParser, (req, res) => {
        console.log('got post request from registrateCompany');
        console.log(req.body);

        let hashed = '';
        bcrypt.hash(req.body.password, null, null, function (error, hash) {
            hashed = hash;
            userDao.addCompany(req.body, hashed ,(status, data) => {
                res.status(status);
                res.json(data);
            });
        });
    });


    app.get('/verify_user/:email', urlencodedParser, (req,res) => {
        console.log('got get request from verify_user');
        userDao.getUserLogin(req.params.email,(status,data) => {
            res.status(status);
            res.json(data);
        });
    });


    app.post('/login/', urlencodedParser, (req, res) => {
        console.log('got login request');
        if (req.body) {
            console.log("Brukernavn & passord ok");
            let token = jwt.sign({ email: req.body.userMail, typeId: req.body.typeId }, privateKey, {
                expiresIn: 2419200
            });
            res.json({ jwt: token });
        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        }
    });

    app.get('/user/get_user/:email', urlencodedParser, (req, res) => {
        console.log('got request from get_user');
        userDao.getUser(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/user/getMyIssues/:email', urlencodedParser, (req,res) => {
       console.log('got request from getMyIssues');
       userDao.getIssuesForOneUser(req.params.email, (status, data) => {
           res.status(status);
           res.json(data);
       })
    });


};


/*
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
};
*/