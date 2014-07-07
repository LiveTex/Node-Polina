

var polina = require('../../bin/index.js');

var tube = new polina.beans.Tube('test_tube');
var client = new polina.beans.User(tube);
var ttr = 2;


function fillTube(complete, cancel) {
  var i = 0;
  var count = 100;

  function localComplete() {
    console.log(i + 1);
    if (i < count) {
      i += 1;
      client.put(1, 0, ttr, 'job1', localComplete, cancel);
    } else {
      client.put(1, 0, ttr, 'job1', complete, cancel);
    }
  }

  client.put(1, 0, ttr, 'job2', localComplete, cancel);
}


function testSTATS(complete, cancel) {
  client.statsTube(function(jid, body) {
    console.log('STATS:', jid, body);
    complete();
  }, cancel);
}


function testPEEKREADY(complete, cancel) {
  client.peekReady(function(jid, body) {
    console.log('PEEK READY:', jid, body);
    complete();
  }, cancel);
}


function testDELETE(complete, cancel) {
}


fillTube(function() {
  console.log('TUBE OK');
  testSTATS(console.info, console.error);
}, console.error);
