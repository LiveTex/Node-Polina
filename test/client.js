var redis = require('node-redis');

var client = redis.createClient(6379, '192.168.48.14');

var i = 0;
var c = 1000000;

console.time('1');

function handleRequest(err, result) {
  if ((c -= 1) === 0) {
    console.timeEnd('1');
    process.exit();
  }
}

while (i < c/2) {
  client.smembers('me', handleRequest);
  client.get('kononenko', handleRequest);

  i += 1;
}