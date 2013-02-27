var redis = require('node-redis');

var client = redis.createClient(6379, '127.0.0.1');

var i = 0;
var c = 500000;

console.time('1');

function handleRequest(err, result) {
  result = result.toString();

  if ((c -= 1) === 0) {
    console.timeEnd('1');
    process.exit();
  }
}

while (i < c/2) {
  client.get('kononenko', handleRequest);
  client.smembers('me', handleRequest);

  i += 1;
}