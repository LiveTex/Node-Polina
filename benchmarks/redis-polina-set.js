

var polina = require('../bin');

var count = 0;
var step = 1;
var id = 0;
var data = (new Array((1024*10)+1)).join(' ');


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var client = new polina.redis.Client(6379, '192.168.48.14');

function exec() {
  client.set(id.toString(), data, complete, cancel);
  id += 1;
}

function cancel() {
  e += 1;
  complete();
}

function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;

  if ((r += 1) === count) {
    console.log('[REDIS-POLINA] | R:', r, ' | E:', e, ' | T:', Date.now() - t,
        ' | M:', (Math.round(mem/r*10)/10));
    run();
  }
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


run();
