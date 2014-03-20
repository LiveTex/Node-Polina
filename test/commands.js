var polina = require('../bin');


var client = new polina.redis.Client(6379);

var s =(new Array(1024*10+1)).join('a');
//
client.set('long', s, console.info, console.error);
//client.get('be cool', console.info, console.error);

//client.get('OK', console.info, console.error);


//client.sadd('be cool', 'при вет', console.info, console.error);
//client.sadd('me', 'кононе нко', console.info, console.error);
//client.sadd('me', ',', console.info, console.error);
//client.lrange('arr','0','-1', console.info, console.error);
//
//client.get('be', console.info, console.error);
//


//client.registerScript('ms',' return  table.insert({},{})');
//client.execArray('ms','0',console.info,console.error);
//client.get('be cool', console.info, console.error);
