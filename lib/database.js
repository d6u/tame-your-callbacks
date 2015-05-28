'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '192.168.99.100',
  user: 'root',
  password: '1234',
  database: 'tame_callbacks'
});

connection.connect();

module.exports.insert = function (data, done) {
  connection.query('INSERT INTO tame_callbacks SET ?', {
    image_url: data.image_url,
    upload_url: data.upload_url,
    emails: data.emails.join(',')
  }, done);
};

module.exports.destroy = function () {
  connection.destroy();
};
