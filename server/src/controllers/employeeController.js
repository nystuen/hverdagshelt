import * as jwt from "jsonwebtoken";

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
import {verifyToken} from "../helpers/verifyToken";
let privateKey = 'shhhhhverysecret';

module.exports = function (app: Object, employeeDao: Object) {

    app.get('/getUsersInCounty/:countyId', verifyToken, (req, res)=>{
        console.log("get all users in county");
        jwt.verify(req.token, privateKey, (err, decoded) => {
            if(err) {
                res.sendStatus(401)
            } else {
                console.log(decoded.typeId);
                if (decoded.typeId === 'Admin') {
                    employeeDao.getUsersInCountyAdmin(req.params.countyId, (status, data)=> {
                        res.status(status);
                        res.json(data);
                    })
                }
                 else if (decoded.typeId === 'Employee') {
                    employeeDao.getUsersInCounty (req.params.countyId, (status, data)=>{
                        res.status(status);
                        res.json(data);
                    })
                } else {
                     res.sendStatus(401)
                }
            }
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