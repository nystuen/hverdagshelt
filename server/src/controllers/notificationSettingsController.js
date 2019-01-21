// @flow

import * as jwt from 'jsonwebtoken';
import { verifyToken } from '../helpers/verifyToken';

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let privateKey = 'shhhhhverysecret';


module.exports = function(app: Object, notificationSettingsDao: Object) {

  app.get('/get_notification_settings', verifyToken, (req, res) => {
    console.log('got request from get_notification_settings');
    jwt.verify(req.token, privateKey, (err, decoded) => {
      console.log(decoded.typeId);
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.getNotificationSettings(decoded.email, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.delete('/delete_notification_settings', verifyToken, (req, res) => {
    console.log('got request from delete_notification_settings');

    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.deleteNotificationSettings(decoded.email, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.post('/add_notification_settings', verifyToken, (req, res) => {
    console.log('got request from add_notification_settings');
    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.addNotificationSettings(decoded.email, req.body, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.post('/add_issue_notification_settings', verifyToken, (req, res) => {
    console.log('got request from add_issue_notification_settings');
    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.addIssueNotificationSettings(decoded.email, req.body, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });

  });

  app.get('/get_issue_notification_settings', verifyToken, (req, res) => {
    console.log('got request from get_issue_notification_settings');

    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.getIssueNotificationSettings(decoded.email, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.get('/get_notification_settings_with_names', verifyToken, (req, res) => {
    console.log('got request from get_notification_settings_with_names');
    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.getNotificationSettingsWithNames(decoded.email, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.put('/update_issue_notification_settings', verifyToken, (req, res) => {
    console.log('got request from update_issue_notification_settings');
    jwt.verify(req.token, privateKey, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else if (decoded.typeId === 'Private') {
        notificationSettingsDao.updateIssueNotificationSettings(decoded.email, req.body, (status, data) => {
          res.status(status);
          res.json(data);
        });
      }
    });
  });

  app.get('/get_issue_notification_settings_from_user/:userMail', (req, res) => {
    console.log('got request from get_issue_notification_settings');
    notificationSettingsDao.getIssueNotificationSettingsFromUser(req.params.userMail, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};