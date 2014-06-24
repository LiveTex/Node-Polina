

// CREATE TABLE node_handlersocket(id INT PRIMARY KEY, data VARCHAR(11000), KEY data (data));

var hs = require('node-handlersocket');

var count = 0;
var step = 1;
var id = 0;
var data = (new Array((1024*10)+1)).join(' ');


var r = 0;
var e = 0;
var t = Date.now();
var mem = 0;


var con = hs.connect({
  port: 9999,
  host: '192.168.48.14'
});


function cancel(index) {
  e += 1;
  complete(index);
}


function complete(index) {
  mem += process.memoryUsage().heapUsed/1024/1024;
  if ((r += 1) === count) {
    console.log('[NODE-HANDLERSOCKET] | R:', r, ' | E:', e, ' | T:',
        Date.now() - t, ' | M:', (Math.round(mem/r*10)/10));
    run(index);
  }
}


function exec(index) {
  index.insert([id, data], function(err) {
    if (!err) {
      complete(index);
    } else {
      cancel(index);
    }
  });
  id += 1;
}


function run(index) {
  r = 0;
  e = 0;
  t = Date.now();
  mem = 0;
  count += step;

  if (count / step === 10) {
    step *= 10;
  }

  for (var i = 0; i < count; i += 1) {
    exec(index);
  }
}


con.on('connect', function() {
  con.openIndex('test', 'node_handlersocket', 'data', ['id', 'data'],
      function(err, index) {
        if (!err) {
          run(index);
        } else {
          console.log('open_index error:', err);
        }
      });
});
