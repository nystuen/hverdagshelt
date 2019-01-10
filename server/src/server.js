// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {UserDao} from "./daos/userDao";
import {CountyDao} from "./daos/countyDao";
import userController from './controllers/userController.js';
import countyController from './controllers/countyController';
import * as mysql from "mysql2";

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

// connect to database
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql.stud.iie.ntnu.no",
    user: "magnusrm",
    password: "fKzwPFN3",
    database: "magnusrm",
    debug: false
});


let userDao = new UserDao(pool);
let countyDao = new CountyDao(pool);

// fire controllers
userController(app, userDao);
countyController(app, countyDao);
// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
    app.listen(3000, error => {
        console.log(error);
        if (error) reject(error.message);
        console.log('Server started');
        resolve();
    });
});