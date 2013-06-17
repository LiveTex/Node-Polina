var polina = require('../bin');

var count = 0;
var step = 1;


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var client = new polina.redis.Client(6379);
client.set('key', (new Array((1024*10)+1)).join(' '), console.info, console.error);

function exec() {
  client.get('key', complete, cancel);
}

function cancel() {
  e += 1;
  complete();
}

function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;

  if ((r += 1) === count) {
    console.log('[REDIS-POLINA] | R:', r, ' | E:', e, ' | T:', Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
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




