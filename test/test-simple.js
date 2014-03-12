var polina = require('../bin');

var client = new polina.redis.Client(6379);

var i  = 0;
var counter = 300000;
console.time('1');

function handleRequest(result) {
 // console.log(result);
 // console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit in " + i);
    process.exit();
  }
}

for(  var j = 0; j < counter/3; j++){
  client.hget('me','1', handleRequest,handleRequest); //ERROR
  client.set('OK','It,s OK!', handleRequest,handleRequest); // Simple OK
  client.llen('arr',handleRequest,handleRequest);//Integer
}
