var polina = require('../bin');


var client = new polina.redis.Client(6379);

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

client.del([], console.info, console.error);
