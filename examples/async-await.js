// babel-node --optional es7.asyncFunctions examples/async-await.js

var Bluebird = require('bluebird');

async function run() {
  console.log('1');
  await Bluebird.delay(1000);
  console.log('2');
}

run()
  .then(function () {
    console.log('3');
  });
