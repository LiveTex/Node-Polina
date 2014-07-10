


var polina = require('../bin/index.js');

var count = 0;
var step = 1;
var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var tube = new polina.beans.Tube('tube_name', 11300);
var client = new polina.beans.User(tube);
var data = '';


function complete() {
  mem += process.memoryUsage().heapUsed/1024/1024;
  if ((r += 1) === count) {
    console.log(r, '|', e, '|', Date.now() - t, '|', (Math.round(mem/r*10)/10));
    run();
  }
}


function cancel() {
  e += 1;
  complete();
}


function exec() {
  client.put(0, 0, 0, data, complete, cancel);
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