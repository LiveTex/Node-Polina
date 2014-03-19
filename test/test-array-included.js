var polina = require('../bin');

var client = new polina.redis.Client(6379);

//client.registerScript('ms','return {}');
client.registerScript('ms','return {1,2,{3,\'Hello World!\',{}}}');
//client.registerScript('ms','return {}');

var i  = 0;
var counter = 1;
console.time('1');

function handleRequest(result) {
  //console.log(result);
 // console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit in" + i);
    process.exit();
  }
}

for(  var j = 0; j < counter; j++){
  //client.execArray('ms','0',handleRequest);
  //client.scan('0',handleRequest);
  client.sscan('setKey','0',handleRequest,handleRequest,{'COUNT': '10240'});

}
