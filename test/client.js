var redis = require('redis');

var client = redis.createClient(6379);

//var s =(new Array(1024 * 10 + 1)).join('$');
//client.set('long', s, console.info, console.error);

//client.script('ms','return {1,2,{3,\'Hello World!\',{\'\',{{1}},123}}}');
//var sum = 0;

var i  = 0;
var counter = 30;
console.time('1');

function handleRequest(err,result) {
  //console.log(result);
  //console.log(i + "^^");
  i+=1;
  if (i == counter){

    console.timeEnd('1');
    console.log("Exit in " + i);
//
//    var len = result.length;
//    while(len--){
//      sum += result[len].length;
//    }
//    console.log("Control Sum " + sum);
    process.exit();
  }
}


for(  var j = 0; j < counter; j++){
  //client.get('OK', handleRequest);
   //client.sscan('setKey','0',handleRequest);
  client.smembers('setKey',handleRequest);

  //client.set('S',s, handleRequest); // Simple OK
 // client.get('S', handleRequest); //Bulk

}



