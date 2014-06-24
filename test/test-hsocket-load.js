

var polina = require('../bin');

var e = 0;
var id = 0;
var data = (new Array((1024*10)+1)).join(' ');

var client = new polina.hs.Client(9998, 9999);
var index = new polina.hs.Index('test', 'node_hsocket', ['id', 'data'], 'data');


function cancel(error) {
  e += 1;
  console.log('ERROR', error);
}


function exec() {
  id += 1;
  client.insert([id, data], exec, cancel);
}


client.openIndex(index, function() {
  while (1) {
    exec();
  }
}, console.error);
