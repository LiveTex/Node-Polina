var polina = require('../bin');



var watcher = new polina.beans.Watcher('tube', 11300);

function reserve() {
  watcher.reserve(function(jobId, rawData) {
    console.log(jobId, rawData);

    watcher.delete(jobId, function() {
      console.log(jobId);

      reserve();
    });
  });
}

reserve();