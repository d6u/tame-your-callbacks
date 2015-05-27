'use strict';

var AWS = require('aws-sdk');
var cred = require('./s3-cred.json');

module.exports = new AWS.S3({
  apiVersion: '2015-01-12',
  accessKeyId: cred.AccessKeyId,
  secretAccessKey: cred.secretAccessKey
});
