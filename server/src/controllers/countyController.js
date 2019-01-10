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
    })
};