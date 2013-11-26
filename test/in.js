var polina = require('../bin');


var tube = new polina.beans.Tube('tube', 11300);

function nop() {}

function reserve(watcher) {
  watcher.reserve(function(jobId, data) {
    watcher.delete(jobId, nop);

    if (data.length < 1024) {
      console.log(Date.now() - Number(data));
    }

    reserve(watcher);
  });
}

reserve(new polina.beans.Watcher(tube));
reserve(new polina.beans.Watcher(tube));
reserve(new polina.beans.Watcher(tube));
reserve(new polina.beans.Watcher(tube));
