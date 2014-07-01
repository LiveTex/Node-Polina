


var polina = require('../bin/index.js');

var tube = new polina.beans.Tube('my_tube', 11300);
var client = new polina.beans.User(tube);
//var watcher = new polina.beans.Watcher(tube);
var ttr = 2;


function putComplete(jid) {
  console.log('PUT job', jid);
}


client.put(1, 0, ttr, 'job1', putComplete, console.error);
client.put(1, 0, ttr, 'job2', putComplete, console.error);

client.peekReady(function(jid, body) {
  console.log('job', jid, 'PICKED');
  client.statsTube(function(result) {
//    console.log('STATS:', result);
    console.log('STATS');
    client.delete(jid, function() {
      console.log('job', jid, 'DELETED');
      client.statsTube(function(result) {
//        console.log('STATS:', result);
        console.log('STATS');
      }, console.error);
    }, console.error);
  }, console.error);
}, console.error);







