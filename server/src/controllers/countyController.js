// @flow

import * as jwt from "jsonwebtoken";

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

import {verifyToken} from "../helpers/verifyToken";
let privateKey = 'shhhhhverysecret';

module.exports = function (app: Object, countyDao: Object) {

    app.get('/getCounties/', (req, res)=>{
        console.log("getCounties got request");
        countyDao.getAllCounties((status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.get('/getAllCountiesMinusUsers/', verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log('got req from get_all_counties_minus_user');
                countyDao.getAllCountiesMinusUsers(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.get('/getSubscribedCounties/', verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log("get all counties that the user subscribe to got request");
                countyDao.getSubscribedCounties(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.delete('/deleteAllSubscribedCounties/', verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log("delete all subscribed counties request");
                countyDao.deleteAllSubscribedCounties(decoded.email, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.post('/addSubscription/', verifyToken, (req, res)=>{
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log('post all subscribed counties request');
                countyDao.addSubscription(decoded.email, req.body, (status, data) => {
                    res.status(status);
                    res.json(data);
                })
            }
        });
    });

    app.post('/add_companyCounties', (req, res)=>{
        console.log("post all subscribed counties from county request");
        countyDao.addCompanySubscription(req.body,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    })

};

