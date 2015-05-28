'use strict';

var nodemailer = require('nodemailer');
var cred = require('./mail-cred.json');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  auth: {
    user: 'daiweilu123@gmail.com',
    pass: cred.mandrillToken
  }
});

exports.send = function (data, receiver, done) {
  var mailOptions = {
    from: 'Tame ✔ <your@callback.com>',
    to: receiver,
    subject: 'Having trouble with callbacks?',
    text: JSON.stringify(data)
  };

  transporter.sendMail(mailOptions, done);
};
