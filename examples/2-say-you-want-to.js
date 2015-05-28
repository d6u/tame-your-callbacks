var fs = require('fs');
var request = require('request');
var s3 = require('../lib/s3');
var database = require('../lib/database');
var mailer = require('../lib/mailer');

// Level 0
fs.readFile('data.json', function (err, buf) {
  var data = JSON.parse(buf.toString());

  // Level 1
  request(data.image_url, function (err, res, body) {

    // Level 2
    s3.putObject({
      Bucket: 'tame-your-callback',
      ContentType: 'image/svg+xml',
      ACL: 'public-read',
      Key: data.upload_url,
      Body: body
    }, function (err) {

      // Level 3
      database.insert(data, function (err) {

        var i = 0;

        function done() {
          i += 1;
          if (i < data.emails.length) {
            return;
          }

          // Level 5
          console.log('I am done!');
          database.destroy();
        }

        // Level 4
        data.emails.forEach(function (email) {
          mailer.send(data, email, done);
        });
      });
    });
  });
});
