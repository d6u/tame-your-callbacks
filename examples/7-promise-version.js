var Bluebird = require('bluebird');
var fs = require('fs');
var request = require('request');
var s3 = require('../lib/s3');
var database = require('../lib/database');
var mailer = require('../lib/mailer');

Bluebird.promisifyAll(fs);
var requestAsync = Bluebird.promisify(request);
Bluebird.promisifyAll(database);
Bluebird.promisifyAll(mailer);

// Level 0
fs.readFileAsync('data.json')
  .bind({})
  .then(function (buf) {
    this.data = JSON.parse(buf.toString());
    return requestAsync(this.data.image_url);
  })
  .spread(function (res, body) {
    return s3.putObject({
      Bucket: 'tame-your-callback',
      ContentType: 'image/svg+xml',
      ACL: 'public-read',
      Key: this.data.upload_url,
      Body: body
    });
  })
  .then(function () {
    return database.insertAsync(this.data);
  })
  .then(function () {
    return this.data.emails;
  })
  .each(function (email) {
    return mailer.sendAsync(this.data, email);
  })
  .then(function () {
    console.log('I am done!');
    database.destroy();
  });
