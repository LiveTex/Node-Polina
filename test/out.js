var polina = require('../bin');

var PACKET_SIZE = 32;

var tube = new polina.beans.Tube('tube', 11300);
var payload = (new Array((1024)+1)).join('a'); // kb
var i = 0;
var t = Date.now();
var kb = 1024*1024*10;

function put() {
  for (var j = 0; j < PACKET_SIZE; j += 1) {
    polina.beans.put(tube, payload);
  }

  if ((i += PACKET_SIZE) < kb) {
    setImmediate(put);
  } else {
    polina.beans.put(tube, t.toString());
    console.log(Date.now() - t);
  }
}

put();


setInterval(function() {
  polina.beans.put(tube, Date.now().toString());
}, 1000);

