var polina = require('../bin');

var client = new polina.redis.Client(6379);

var i  = 0;
var counter = 1;
console.time('1');

function handleRequest(result) {
 // console.log(result);
  //console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit with  " + i);
    process.exit();
  }
}

for(  var j = 0; j < counter; j++){
  client.smembers('setKey',handleRequest,handleRequest);
  //lrange('arr','0','-1', handleRequest, console.log);
}
