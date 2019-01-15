/*//@flow
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
export class sendMail {

    sendMessage (json:Object,callback){
    console.log("inne i send mail"+ json.to," ", json.subject);
        const msg = {
            to: json.to,
            from: 'annabelle.almaas@gmail.com',
            subject: json.subject,
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        return sgMail.send(msg);
    }

};*/