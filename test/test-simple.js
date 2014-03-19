var polina = require('../bin');

var client = new polina.redis.Client(6379);
var s =(new Array(1024 * 1000 + 1)).join('$');
var i  = 0;
var sum = 0;
var counter = 100;
console.time('1');

function handleRequest(result) {
 //console.log(result);
 // console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit in " + i);
    process.exit();
  }
}

for(  var j = 0; j < counter/2; j++){
 //client.hget('me','1', handleRequest,handleRequest); //ERROR
 //client.set('OK','It,s OK!', handleRequest,handleRequest); // Simple OK
 //client.llen('arr',handleRequest,handleRequest);//Integer

  client.set('S',s, handleRequest,handleRequest); // Simple OK
  client.get('S', handleRequest,handleRequest); //Bulk
}
