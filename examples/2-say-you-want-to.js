var fs = require('fs');
var request = require('request');
var s3 = require('../lib/s3');

// Level 0
fs.readFile('data.json', function (err, buf) {
  var data = JSON.parse(buf.toString());

  // Level 1
  request(data.imageUrl, function (err, res, body) {

    // Level 2
    s3.putObject({
      Bucket: 'tame-your-callback',
      ContentType: 'image/svg+xml',
      ACL: 'public-read',
      Key: data.uploadUrl,
      Body: body
    }, function (err, data) {

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
        }

        // Level 4
        data.emails.forEach(function (email) {
          Mailer.send(data, email, done);
        });

      });

    });

  });

});
