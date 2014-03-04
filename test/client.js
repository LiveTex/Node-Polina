var redis = require('redis');

var client = redis.createClient(6379);

//var i = 0;
//var c = 100;
//
//function handleRequest(err, result) {
//  console.log(arguments);
//
//  if ((c -= 1) === 0) {
//    process.exit();
//  }
//
//  sda.adfg = 2;
//}
//
//while (i < c) {
//  process.nextTick(function() {
//    client.get('value', handleRequest);
//  });
//
//  i += 1;
//}
//
//
//process.on('uncaughtException', function(err) {
//  console.log('Caught exception: ' + err);
//});

//client.script('ms','return {1,2,{3,\'Hello World!\',{\'\',{{1}},123}}}');
var i  = 0;
var counter = 300000;
console.time('1');

function handleRequest(err,result) {
  //console.log(result);
  //console.log(i + "^^");
  i+=1;
  if (i == counter){
    console.timeEnd('1');
    console.log("Exit in " + i);
    process.exit();
  }
}
//for(  var j = 0; j < counter/3; j++){
//  client.hget('me','1', handleRequest,handleRequest); //ERROR
//  client.set('OK','It,s OK!', handleRequest,handleRequest); // Simple OK
//  client.llen('arr',handleRequest,handleRequest);//Integer
//}


for(  var j = 0; j < counter; j++){
  client.get('OK', handleRequest);
}


