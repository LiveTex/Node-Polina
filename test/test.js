var polina = require('../bin');

var client = new polina.redis.Client(6379);

var keys = 10;
var counter = 10;

var args = [];

//var script = 'return {';
var script = 'return ';


function getRandomString(ch){
  var l = Math.round(Math.random() * (1024) );
  return  (new Array(l)).join(ch);
}

function getRandomSubArray(){
  var randArr = '{';
  var l = Math.round(Math.random() * (10) + 1);
  while(l --){
    randArr += '\'' + getRandomString('$') + '\',';
  }
  randArr += '0},' ;
  return  randArr;
}

var s ='';
var k = 1;
while( k < keys){
//
//  args.push(getRandomString('+'));
//  script += 'KEYS['+ k +'],';
//  if (Math.round(Math.random() * (1024)) % 3 === 0){
//    script += getRandomSubArray();
//  }

  script += '\'' + getRandomString('$') + '\',';
  k++;

}
 script+='0';

//console.log(script);
//console.log(args);


client.registerScript('ms',script);


var i  = 0;

console.time('1');

function handleRequest(result) {
  console.log(result);
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
