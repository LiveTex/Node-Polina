

var polina = require('../../bin');

var count = 0;
var step = 1;

var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

var client = new polina.redis.Client(6379);
var data = [];

var i = 0;
while (i < ((1024*10)+1)) {
  data.push(' ');
  i += 1;
}


function createKeys(complete) {

  var i = 0;
  var j = 0;

  function iComplete() {
    if (i < 10) {
      j = 0;
      jComplete();
    } else {
      complete();
    }
  }

  function jComplete() {
    if (j < 5) {
      j += 1;
      client.sadd(i.toString(), data, jComplete, console.error);
    } else {
      i += 1;
      iComplete();
    }
  }

  iComplete();

}


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
  client.sscan('2', '0', complete, cancel);
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


createKeys(run);

