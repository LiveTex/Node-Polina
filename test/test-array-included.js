var polina = require('../bin');

var client = new polina.redis.Client(6379);

client.registerScript('ms','return {1,2,{3,\'Hello World!\',{\'\',{{1}},123}}}');

var i  = 0;
var counter = 30000;
console.time('1');

function handleRequest(result) {
  //console.log(result);
  //console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit");
    process.exit();
  }
}

for(  var j = 0; j < counter; j++){
  client.execArray('ms','0',handleRequest,handleRequest);
}
