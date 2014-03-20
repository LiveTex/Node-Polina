var polina = require('../bin');


var client = new polina.redis.Client(6379);

<<<<<<< HEAD
var s =(new Array(1024*10+1)).join('a');
=======
var keys = 1001;
var k = 1;
var l = 0;
var s = '';



while( k < keys){
  l = Math.round(Math.random() * (102400) );
  s =(new Array(l)).join('$');
  client.set(('Key'+ k),s ,console.log, console.log)
  k++;
}
console.log('end');


//client.scan('0',console.info, console.error,{COUNT:'2'})
//client.hscan('hashKey','0',console.info, console.error)


//var s =(new Array(1024*10+1)).join('a');
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950
//
client.set('long', s, console.info, console.error);
//client.get('be cool', console.info, console.error);

<<<<<<< HEAD
//client.get('OK', console.info, console.error);


=======
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950
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
