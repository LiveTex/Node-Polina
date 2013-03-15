var polina = require('../bin');


var client = new polina.redis.Client(6379);
client.registerFallback(6379, '192.168.48.14');

var i = 0;
var c = 100000;

console.time('1');

function handleRequest(result) {
  if ((c -= 1) === 0) {
    console.timeEnd('1');

    /*client.resize(512);
    client.registerClient(0, 127, new polina.redis.Client(6379), 'remote');
    client.registerClient(128, 512, new polina.redis.Client(6379, '192.168.48.14'), 'local');

    client.smembers('me', console.info, console.error);
    client.get('kononenko', console.info, console.error);*/
  }
}



while (i < c/2) {
  setTimeout(function() {
    client.smembers('me', handleRequest, console.error);
    client.get('kononenko', handleRequest, console.error);
  }, i);

  i += 1;
}


/*
client.set('kononenko', 'фыщпрцу94390тлтР(?№"К:', console.info, console.error);
client.get('kononenko', console.info, console.error);

client.sadd('me', 'при вет', console.info, console.error);
client.sadd('me', 'кононе нко', console.info, console.error);
client.sadd('me', ',', console.info, console.error);
client.sadd('me', 'т ы', console.info, console.error);
client.sadd('me', 'кр ут', console.info, console.error);

client.smembers('me', console.info, console.error);
client.srem('me', ',', console.info, console.error);
client.smembers('me', console.info, console.error);

client.del('me', console.info, console.error);
client.del('kononenko', console.info, console.error);
*/


/*var socket = new net.Socket();
socket.connect(6379);*/