// @flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, countyDao: Object) {

    app.get('/getCounties', (req, res)=>{
        console.log("getCounties got request");
        countyDao.getAllCounties((status, data)=>{
            res.status(status);
            res.json(data);
        })
    });



    app.get('/getAllCountiesMinusUsers/:UserMail', (req, res)=>{
        console.log("get all counties that the user dosnt subscribe to got request");
        countyDao.getAllCountiesMinusUsers(req.params.UserMail,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.get('/getSubscribedCounties/:UserMail', (req, res)=>{
        console.log("get all counties that the user subscribe to got request");
        countyDao.getSubscribedCounties(req.params.UserMail,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.delete('/deleteAllSubscribedCounties/:UserMail', (req, res)=>{
        console.log("delete all subscribed counties request");
        countyDao.deleteAllSubscribedCounties(req.params.UserMail,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.post('/addSubscription', (req, res)=>{
        console.log("post all subscribed counties request");
        countyDao.addSubscription(req.body,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    })

    app.post('/add_companyCounties', (req, res)=>{
        console.log("post all subscribed counties from county request");
        countyDao.addCompanySubscription(req.body,(status, data)=>{
            res.status(status);
            res.json(data);
        })
    })

};

