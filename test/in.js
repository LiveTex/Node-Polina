var polina = require('../bin');


var tube = new polina.beans.Tube('tube', 11300);

function nop() {}

function reserve(watcher) {
  watcher.reserve(function(jobId, data) {
    if (data.length < 1024) {
      watcher.delete(jobId, nop);
      console.log(Date.now() - Number(data));
    } else {
      watcher.delete(jobId, nop);
      reserve(watcher);
    }
  });
}

reserve(new polina.beans.Watcher(tube));
