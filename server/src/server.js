// @flow

import express from "express";
import path from "path";
import reload from "reload";
import fs from "fs";
import { UserDao } from "./daos/userDao";
import categoryController from "./controllers/categoryController.js";
import { CountyDao } from "./daos/countyDao";
import { IssueDao } from "./daos/issueDao";
import userController from "./controllers/userController.js";
import issueController from "./controllers/issueController.js";
import countyController from "./controllers/countyController.js";
const notificationController = require("./controllers/notificationController");
import { CategoryDao } from "./daos/catergoryDao";
import * as mysql from "mysql2";
import { EventDao } from "./daos/eventDao";
import eventController from "./controllers/eventController.js";
import { EventCategoryDao } from "./daos/eventCategoryDao";
import eventCategoryController from "./controllers/eventCategoryController.js";

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
let countyDao = new CountyDao(pool);
let issueDao = new IssueDao(pool);
let categoryDao = new CategoryDao(pool);
let eventDao = new EventDao(pool);
let eventCategoryDao = new EventCategoryDao(pool);

//fire controllers
issueController(app, issueDao);
categoryController(app, categoryDao);
eventController(app, eventDao);
userController(app, userDao);
countyController(app, countyDao);
countyController(app, countyDao);
categoryController(app, categoryDao);
eventCategoryController(app, eventCategoryDao);

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
