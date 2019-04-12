var nodemailer = require("nodemailer");
var fs = require('fs');
var path = require('path');

var transport = nodemailer.createTransport({

    service: 'Gmail',
    auth: {
        user: "ketansethi786@gmail.com",
        pass: "anandeshwarbaba"
    }
});

console.log("SMTP Configured");

var mailOptions = {
    from: 'ketansethi786@gmail.com', // sender address
    to: 'ketansethi786@gmail.com', // list of receivers
    subject: 'Report for Test Result', // Subject line
    //text: info.body,
    text: 'Contains the test result for the smoke test in html file', // plaintext body
    attachments: [
        {

            'path': "C:/Users/ketan.sethi/git/cucumberjs-protractor/reports/json/report/index.html",

        }]
};
transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
        response.send(err);
    } else {
        console.log("Message sent: " + info.response);
        response.send(info);
    }

});