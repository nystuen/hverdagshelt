// @flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function (app: Object, categoriesDao: Object) {

    app.get('/get_category1', urlencodedParser, (req, res) => {
        console.log('got request from get_user');

        categoriesDao.getCategory1((status, data) => {
            res.status(status);
            res.json(data);
        });
    });


    app.get('/get_category2', urlencodedParser, (req, res) => {
        console.log('got request from get_user');
        categoriesDao.getCategory2((status, data) => {
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
};