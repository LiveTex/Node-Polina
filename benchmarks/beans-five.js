var fivebeans = require('fivebeans');

var client = new fivebeans.client('127.0.0.1', 11300);

var count = 0;
var step = 1;


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

client.on('connect', function() {
  function exec() {
    client.put(0, 0, 0, ' ', callback);
  }

  function callback(err) {
    if (err !== null) {
      e += 1;
    }

    mem += process.memoryUsage().heapUsed/1024/1024;

    if ((r += 1) === count) {
      console.log('[FIVEBEANS] | R:', r, ' | E:', e, ' | T:', Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
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

}).connect();








