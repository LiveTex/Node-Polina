var polina = require('../bin');

var client = new polina.redis.Client(6379);

//var s =(new Array(1024 * 10 + 1)).join('a');
//client.set('long',s, console.info, console.error);
//client.sadd('setKey', s, console.info, console.error);

var i  = 0;
var counter = 500000;
console.time('1');
var sum = 0;

function handleRequest(result) {
//console.log(result);
//  console.log(i);
  i+=1;
  if (i == counter){
    console.timeEnd('1');
    console.log("Exit in " + i);

    sum += result.length;

    console.log("Control Sum " + sum);

    process.exit();
  }
}

for(  var j = 0; j < counter; j++){
  client.get('OK', handleRequest, console.error);
}
