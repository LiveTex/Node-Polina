var polina = require('../bin');


var client = new polina.redis.Client(6379);

var i = 0;
var c = 500000;

console.time('1');

function handleRequest(result) {
  if ((c -= 1) === 0) {
    console.timeEnd('1');
    process.exit();
  }
}


while (i < c/2) {
  client.smembers('me', handleRequest, console.error);
  client.get('kononenko', handleRequest, console.error);

  i += 1;
}