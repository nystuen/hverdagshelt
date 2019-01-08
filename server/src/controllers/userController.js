// @flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, userDao: Object) {

    app.post('/add_user', urlencodedParser, (req, res) => {
        console.log('got post request from add_user');
        userDao.addUser(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        })
    });
};