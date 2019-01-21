// @flow

import * as bcrypt from 'bcrypt-nodejs';
import generator from 'generate-password';

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});


let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hverdagshelt.scrum@gmail.com',
    pass: 'Dreamteam'
  }
});


module.exports = function (app: Object, userDao: Object) {

  app.post('/sendTextMail', urlencodedParser, (req, res) => {
    console.log('got request from sendTextMail');

    let mailOptions = {
      from: 'hverdagshelt.scrum@gmail.com',
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  app.post('/sendResetPasswordMail', urlencodedParser, (req, res) => {
    console.log('got request from sendTextMail');
    let newPassword = generator.generate({length: 10, numbers: true});
    console.log('newPassword:',newPassword);

    let hashed = '';
    bcrypt.hash(newPassword, null, null, function (error, hash) {
      hashed = hash;

      userDao.resetPassword(req.body.to, hashed, (status, data) => {
        res.status(status);
        res.json(data);
      });
    });

    let mailOptions = {
      from: 'hverdagshelt.scrum@gmail.com',
      to: req.body.to,
      subject: 'Hverdagshelt - Tilbakestilling av passord',
      text: 'Ditt autogenererte passord er:' + newPassword + ''
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
    app.post('/sendResetPasswordMail', urlencodedParser, (req, res) => {
        console.log('got request from sendTextMail');
        let newPassword = generator.generate({length: 10, numbers: true});
        console.log('newPassword:',newPassword);

        let hashed = '';
        bcrypt.hash(newPassword, null, null, function (error, hash) {
            hashed = hash;

            userDao.resetPassword(req.body.to, hashed ,(status, data) => {
                res.status(status);
                res.json(data);
            });
        });

        let mailOptions = {
            from: 'hverdagshelt.scrum@gmail.com',
            to: req.body.to,
            subject: 'Hverdagshelt - Tilbakestilling av passord',
            text: 'Ditt autogenererte passord er:' + newPassword + ''
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

  app.post('/sendIssueCompleteMail', urlencodedParser, (req, res) => {
    console.log('got request from sendTextMail');

    let mailOptions = {
      from: 'hverdagshelt.scrum@gmail.com',
      to: req.body.to,
      subject: 'Hverdagshelt - Sak er registrert',
      text: 'Hei! Din sak er nå fullført. Takk for tiden din, du er en hverdagshelt!',
      html: "<p>Hei!</p><p>Din sak er nå fullført.</p><p>Takk for tiden din, du er en hverdagshelt!</p>"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  app.post('/sendIssueRegistratedMail', urlencodedParser, (req, res) => {
    console.log('got request from sendTextMail');

    let mailOptions = {
      from: 'hverdagshelt.scrum@gmail.com',
      to: req.body.to,
      subject: 'Hverdagshelt - Sak er registrert',
      text: 'Hei! Din sak er nå registrert. Dersom du har innstillinger som tilsier det, vil du få flere oppdateringer etterhvert. Takk for tiden din, du er en hverdagshelt!',
      html: "<p>Hei!</p><p>Din sak er nå fullført. Dersom du har instillinger som tilsier det, vil du få flere oppdateringer etterhvert.</p><p>Takk for tiden din, du er en hverdagshelt!</p>"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  app.post('/sendIssueInProgressMail', urlencodedParser, (req, res) => {
    console.log('got request from sendTextMail');

    let mailOptions = {
      from: 'hverdagshelt.scrum@gmail.com',
      to: req.body.to,
      subject: 'Hverdagshelt - Sak er registrert',
      text: 'Hei! Din sak er nå under behandling. Dersom du har innstillinger som tilsier det, vil du få flere oppdateringer etterhvert. Takk for tiden din, du er en hverdagshelt!',
      html: "<p>Hei!</p><p>Din sak er nå under behandling. Dersom du har instillinger som tilsier det, vil du få flere oppdateringer etterhvert.</p><p>Takk for tiden din, du er en hverdagshelt!</p>"
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });


};
