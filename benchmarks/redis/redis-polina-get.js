

var polina = require('../../bin/index.js');

var count = 0;
var step = 1;

var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

var data = (new Array((1024*10)+1)).join(' ');
//var data = 'my_data';
var client = new polina.redis.Client(6379, '192.168.48.14');


function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;

  if ((r += 1) === count) {
    console.log(r.toString() + ' | ' + e.toString() +
        ' | ' + (Date.now() - t).toString() +
        ' | ' + (Math.round(mem/r*10)/10).toString());
    run();
  }
}


function cancel() {
  e += 1;
  complete();
}


function exec() {
  client.get('key', function(result) {
    if (result === data) {
      complete();
    } else {
      cancel();
    }
  }, cancel);
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


client.set('key', data, function() {
  console.log('[REDIS-POLINA]');
  console.log('   R   |   E   |   T    |   M  ');
  run();
}, console.error);




