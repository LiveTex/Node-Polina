


// CREATE TABLE node_handlersocket(id INT PRIMARY KEY, data VARCHAR(11000),
// KEY data (data));

var hs = require('node-handlersocket');

var count = 0;
var step = 1;
var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;

var index = null;
var options = {
  filters: [hs.while('id', '>', 10)],
  limit: 100
};


var con = hs.connect({
  port: 9998,
  host: '192.168.48.14'
});


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
  index.find('>', [1], options, function(error, records) {
    if (!error) {
      complete();
    } else {
      cancel();
    }
  });
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


con.on('connect', function() {
  con.openIndex('test', 'node_handlersocket', 'PRIMARY', ['id', 'data'], ['id'],
      function(err, ind) {
        index = ind;
        if (!err) {
          run();
        } else {
          console.log('open_index error:', err);
        }
      });
});
