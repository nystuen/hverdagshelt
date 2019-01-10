// @flow

let jwt = require("jsonwebtoken");
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, userDao: Object) {

    app.post('/add_user', urlencodedParser, (req, res) => {
        console.log('got post request from add_user');
        userDao.addUser(req.body, (status, data) => {
            res.status(status);
            res.json(data);
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
        console.log(req.body);
        if (req.body) {
            console.log("Brukernavn & passord ok");
            let token = jwt.sign({ userEmail: req.body.userEmail }, {
                expiresIn: 2419200
            });
            res.json({ jwt: token });
        } else {
            console.log("Brukernavn & passord IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        }
    });

    app.get('/get_user/:email', urlencodedParser, (req, res) => {
        console.log('got request from get_user');
        userDao.getUser(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });
};