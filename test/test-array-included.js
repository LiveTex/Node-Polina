var polina = require('../bin');

var client = new polina.redis.Client(6379);

//client.registerScript('ms','return {}');
client.registerScript('ms','return {1,2,{3,\'Hello World!\',{}}}');
//client.registerScript('ms','return {}');

var i  = 0;
<<<<<<< HEAD
var counter = 300000;
=======
var counter = 1;
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950
console.time('1');

function handleRequest(result) {
  //console.log(result);
<<<<<<< HEAD
  //console.log(i + "^^");
=======
 // console.log(i + "^^");
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950
  i+=1;
  if (i == counter){

    console.timeEnd('1');
<<<<<<< HEAD
    console.log("Exit " + i);
=======
    console.log("Exit in" + i);
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950
    process.exit();
  }
}

for(  var j = 0; j < counter; j++){
  //client.execArray('ms','0',handleRequest);
  //client.scan('0',handleRequest);
  client.sscan('setKey','0',handleRequest,handleRequest,{'COUNT': '10240'});

}
