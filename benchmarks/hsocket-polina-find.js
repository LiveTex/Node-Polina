



var polina = require('../bin');

var count = 0;
var step = 1;
var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

var id = 0;
var data = (new Array((1024*10)+1)).join('');

var client = new polina.hs.Client(9998, 9999, '192.168.48.14');
var index = new polina.hs.Index('test', 'node_hsocket', ['id', 'data'],
    'PRIMARY', '0', ['id']);


function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;
  if ((r += 1) === count) {
    console.log(r, ' |', e, ' |', Date.now() - t, ' |',
        (Math.round(mem/r*10)/10));
    run();
  }
}


function cancel(error) {
  e += 1;
  complete();
}


function exec() {
  var limit = polina.hs.LIMIT(100, 0);
  var filter = polina.hs.FILTER(polina.hs.FilterType.FILTER,
      polina.hs.OperationType.LESS_THAN, '0', '100');
  client.find(polina.hs.OperationType.GREATER_THAN, '5', complete, cancel,
      limit, filter);
  id += 1;
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


client.openIndex(index, function() {
  while (id < 1024) {
    id += 1;
    client.insert([id, data], function() {}, console.error);
  }
  run();
}, console.error);
