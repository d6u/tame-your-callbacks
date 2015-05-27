var data;

fs.readFile('data.json')

  .then(function (buf) {
    data = JSON.parse(buf.toString());
    return request(data.imageUrl);
  })

  .then(function (body) {
    return s3.putObject({
      Bucket: 'tame-your-callback',
      ContentType: 'image/svg+xml',
      ACL: 'public-read',
      Key: data.uploadUrl,
      Body: body
    });
  })

  .then(function () {
    return database.insert(data);
  })

  .then(function () {
    return data.emails.map(function (email) {
      return Mailer.send(data, email);
    });
  })

  .then(function () {
    console.log('I am done!');
  })

  .catch(function (err) {
    // Catch all previous errors
  });
