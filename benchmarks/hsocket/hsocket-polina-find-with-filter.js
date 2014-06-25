


// CREATE TABLE node_hsocket(id INT PRIMARY KEY, data VARCHAR(11000),
// KEY data (data));

var polina = require('../../bin/index.js');

var count = 0;
var step = 1;
var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

var client = new polina.hs.Client(9998, 9999, '192.168.48.14');
var index = new polina.hs.Index('test', 'node_hsocket', ['id', 'data'], ['id']);

var limit = polina.hs.LIMIT(100, 0);
var filter = polina.hs.FILTER(polina.hs.FilterType.WHILE, '0',
    polina.hs.OperationType.GREATER_THAN, '10');


function cancel() {
  e += 1;
  complete();
}


function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;
  if ((r += 1) === count) {
    console.log(r, '|', e, '|', Date.now() - t, '|', (Math.round(mem/r*10)/10));
    run();
  }
}


function exec() {
  client.find(polina.hs.OperationType.GREATER_THAN, '1', complete, cancel,
      limit, filter);
}


function run() {
  r = 0;
  e = 0;
  t = Date.now();
  mem = 0;
  count += step;

  if (count / step === 10) {
    step *= 10;
  }

  for (var i = 0; i < count; i += 1) {
    exec();
  }
}


client.openIndex(index, run, console.error);
