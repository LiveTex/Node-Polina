


var polina = require('../bin/index.js');

var tube = new polina.beans.Tube('my_tube', 11300);
var client = new polina.beans.User(tube);
//var watcher = new polina.beans.Watcher(tube);
var ttr = 2;


function putComplete(jid) {
  console.log('PUT job', jid);
}


client.put(1, 0, ttr, 'job1', putComplete);
client.put(1, 0, ttr, 'job2', putComplete);

client.peekReady(function(jid) {

  console.log('job', jid, 'PICKED');

  client.statsTube(function(result) {

    console.log('STATS:', result);

    client.delete(jid, function() {

      console.log('job', jid, 'DELETED');

      client.statsTube(function(result) {
        console.log('STATS:', result);
      });
    }, console.error);
  });
});







