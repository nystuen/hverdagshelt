// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {UserDao} from "./daos/userDao";
import categoryController from './controllers/categoryController.js';
import {CountyDao} from "./daos/countyDao";
import {IssueDao} from "./daos/issueDao";
import {NotificationSettingsDao} from "./daos/notificationSettingsDao";
import userController from './controllers/userController.js'
import issueController from "./controllers/issueController.js";
import countyController from "./controllers/countyController.js"
import notificationSettingsController from "./controllers/notificationSettingsController"
import * as mysql from "mysql2";
import {CategoryDao} from "./daos/catergoryDao";

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, "/../../client/public");

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

// connect to database
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql.stud.iie.ntnu.no",
    user: "annabesa",
    password: "fMxJCDSo",
    database: "annabesa",
    debug: false
});

let userDao = new UserDao(pool);
let issueDao = new IssueDao(pool);
let countyDao = new CountyDao(pool);
let categoryDao = new CategoryDao(pool);
let notificationSettingsDao = new NotificationSettingsDao(pool);



//fire controllers
issueController(app, issueDao);
userController(app, userDao);
countyController(app, countyDao);
categoryController(app, categoryDao);
notificationSettingsController(app, notificationSettingsDao);


// Hot reload application when not in production environment
if (process.env.NODE_ENV !== "production") {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
    app.listen(3000, error => {
        console.log(error);
        if (error) reject(error.message);
        console.log("Server started");
        resolve();
    });
});
