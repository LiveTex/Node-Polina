var polina = require('../bin');


var client = new polina.redis.Client(6379);

var str = '$123\r\n';
var len = 0;
var i = 1;
buf = new Buffer(str);
console.log(buf);

while(buf[i] !== 13){
  len = (len * 10) + (buf[i]  - 48);
  i++;
}
console.log(len);



client.set('be cool', '123', console.info, console.error);
client.get('be cool', console.info, console.error);

//client.sadd('be cool', 'при вет', console.info, console.error);
client.sadd('me', 'кононе нко', console.info, console.error);
//client.sadd('me', ',', console.info, console.error);
client.lrange('arr','0','-1', console.info, console.error);
//
//client.get('be', console.info, console.error);
//


client.registerScript('ms',' return  table.insert({},{})');
client.execArray('ms','0',console.info,console.error);
client.get('be cool', console.info, console.error);
