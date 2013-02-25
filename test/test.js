var polina = require('../bin');


var chunk = '*5\r\n:1\r\n:2\r\n:3\r\n:4\r\n$6\r\nfooba';

var handler = new polina.redis.PacketHandler(console.log);
chunk = handler.process(chunk);

console.log(chunk);

handler.process(chunk + 'r\r\n');

//////////////////////

/*handler = new polina.redis.PacketHandler(console.log);

chunk = handler.process(chunk);
//console.log(chunk);

handler = new polina.redis.PacketHandler(console.log);

chunk += 'lo!\r\ndfty';
chunk = handler.process(chunk);
console.log(chunk);*/