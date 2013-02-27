var polina = require('../bin');



var watcher = new polina.beans.Watcher('tube', 11300);

function reserve() {
  watcher.reserve(function(error, jobId, rawData) {
    console.log(jobId, rawData);


    watcher.delete(jobId, function(error) {
      console.log(jobId);

      reserve()
    });
  });
}

reserve();