var polina = require('../bin');

var count = 0;
var step = 1;


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var client = new polina.beans.User('hello', 11300);

function exec() {
  client.put(0, 0, 0, ' ', callback);
}

function callback(err) {
  if (err !== null) {
    e += 1;
  }

  mem += process.memoryUsage().heapUsed/1024/1024;

  if ((r += 1) === count) {
    console.log('[POLINA-BEANS] | R:', r, ' | E:', e, ' | T:', Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
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




