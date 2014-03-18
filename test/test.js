var polina = require('../bin');

var client = new polina.redis.Client(6379);

var keys = 1000;
var k = 1;
var args = [];
var counter = 100;
var l = 0;
var s = '';
var script = 'return {';
while( k < keys){
  l = Math.round(Math.random() * (1024) );
  s =(new Array(l)).join('*' + k);
  args.push(s);
  script += 'KEYS['+ k +']'+ ',';
  k++;
}
 script+='0}';

//console.log(script);
//console.log(args);
client.registerScript('ms',script);


var i  = 0;

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
  client.execArray('ms', args, handleRequest);
}
