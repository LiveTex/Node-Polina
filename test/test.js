//var client = require('redis').createClient();
var client = new (require('../bin')).redis.Client(6379);

var i = 0;
var c = 100000;

console.time('1');

function handleRequest(result) {
  if ((c -= 1) === 0) {
    console.timeEnd('1');
    process.exit();
  }
}

while (i < c/2) {
  client.smembers('me', handleRequest);
  client.get('1', handleRequest);

  i += 1;
}
