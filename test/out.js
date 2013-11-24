var polina = require('../bin');



var tube = new polina.beans.Tube('tube', 11300);
var payload = (new Array((1024)+1)).join('a'); // kb
var user = new polina.beans.User(tube);
var i = 0;
var t = Date.now();
var kb = 1024*1024;

function put() {
  user.put(0, 0, 30, payload);

  if ((i += 1) < kb) {
    process.nextTick(put);
  } else {
    user.put(0, 0, 30, t.toString());
    console.log(Date.now() - t);
  }
}

put();
