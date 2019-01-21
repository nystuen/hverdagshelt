let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app: Object, employeeDao: Object) {

    app.get('/getUsersInCounty/:countyId', (req, res)=>{
        console.log("get all users in county");
        employeeDao.getUsersInCounty (req.params.countyId, (status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.put('/blockUser/:mail', (req, res)=>{
        employeeDao.blockUser (req.params.mail, (status, data)=>{
            res.status(status);
            res.json(data);
        })
    });

    app.put('/unblockUser/:mail', (req, res)=>{
        employeeDao.unblockUser (req.params.mail, (status, data)=>{
            res.status(status);
            res.json(data);
        })
    });
}