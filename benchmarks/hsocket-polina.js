

// CREATE TABLE node_hsocket(id INT PRIMARY KEY, time DECIMAL, KEY time (time));

var polina = require('../bin');

var count = 0;
var step = 1;
var id = 0;


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var client = new polina.hsocket.Client(9998, 9999);
var index = new polina.hsocket.Index('test', 'node_hsocket',
    ['id', 'time'], 'time');


function cancel() {
  e += 1;
  complete();
}


function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;
  if ((r += 1) === count) {
    console.log('[POLINA-HSOCKET] | R:', r, ' | E:', e, ' | T:',
        Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
    run();
  }
}


function exec() {
  client.insert([id, Date.now() - t], complete, cancel);
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


client.openIndex(index, run, function(error, code) {
  console.log('open_index error:', code, error);
});
